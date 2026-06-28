from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import torch
from torchvision import transforms
from PIL import Image
import io
import logging
import os
import tempfile

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Import from main.py and utils
try:
    from main import load_models, predict_tumor_with_confidence, classify_glioma_stage_with_confidence
    from main import tumor_model, glioma_model
    from utils import get_precautions_from_gemini
    logger.info("✅ Successfully imported from main.py and utils")
except ImportError as e:
    logger.error(f"❌ Failed to import from main.py: {e}")
    # Fallback imports
    try:
        from models.TumorModel import TumorClassification, GliomaStageModel
        from utils import get_precautions_from_gemini
    except ImportError:
        # Create dummy functions
        def get_precautions_from_gemini(tumor_type):
            return f"Please consult with a medical professional regarding {tumor_type} treatment."

# Initialize FastAPI app
app = FastAPI(
    title="NeuroAssist API",
    description="Brain Tumor Detection and Staging API",
    version="1.0.0"
)

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load models on startup
try:
    from main import load_models
    load_models()
    logger.info("✅ Models loaded via main.py")
except:
    logger.warning("⚠️ Using fallback model loading")

# Transform for image preprocessing
transform = transforms.Compose([
    transforms.Grayscale(),
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.5], std=[0.5])
])

# Label list
labels = ['glioma', 'meningioma', 'notumor', 'pituitary']

@app.get("/")
def root():
    """Health check endpoint"""
    try:
        from main import tumor_model, glioma_model
        models_loaded = {
            "tumor_model": tumor_model is not None,
            "glioma_model": glioma_model is not None
        }
    except:
        models_loaded = {"tumor_model": False, "glioma_model": False}
    
    return {
        "message": "🧠 NeuroAssist Brain Tumor Detection API is running",
        "status": "healthy",
        "version": "1.0.0",
        "api_endpoints": {
            "image_prediction": "/predict-image",
            "glioma_staging": "/predict-glioma-stage",
            "health_check": "/",
            "test": "/test"
        },
        "models_loaded": models_loaded,
        "instructions": "Upload MRI images to /predict-image endpoint for tumor detection"
    }

@app.post("/predict-image")
async def predict_image(file: UploadFile = File(...)):
    """Predict tumor type from MRI image"""
    try:
        # Validate file
        if not file.content_type or not file.content_type.startswith('image/'):
            raise HTTPException(status_code=400, detail="File must be an image")
        
        logger.info(f"🖼️ Processing image: {file.filename}")
        
        # Save uploaded file temporarily
        with tempfile.NamedTemporaryFile(delete=False, suffix='.jpg') as tmp_file:
            content = await file.read()
            tmp_file.write(content)
            tmp_file_path = tmp_file.name
        
        try:
            # Use main.py function for prediction
            result = predict_tumor_with_confidence(tmp_file_path)
            
            tumor_type = result["tumor_type"]
            confidence = result["confidence"]
            all_probs = result["all_probabilities"]
            
            logger.info(f"🎯 Prediction: {tumor_type} (confidence: {confidence:.3f})")
            
            if tumor_type == "glioma":
                return {
                    "tumor_type": tumor_type,
                    "confidence": confidence,
                    "all_probabilities": all_probs,
                    "next": "submit_mutation_data",
                    "message": "Glioma detected. Please provide mutation data for staging analysis."
                }
            else:
                precaution = get_precautions_from_gemini(tumor_type)
                return {
                    "tumor_type": tumor_type,
                    "confidence": confidence,
                    "all_probabilities": all_probs,
                    "precaution": precaution,
                    "message": f"{tumor_type.title()} detected. Please follow the recommended precautions."
                }
        
        finally:
            # Clean up temporary file
            os.unlink(tmp_file_path)
            
    except Exception as e:
        logger.error(f"❌ Error in predict_image: {e}")
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")

class MutationInput(BaseModel):
    gender: str  # 'm' or 'f'
    age: float
    idh1: int
    tp53: int
    atrx: int
    pten: int
    egfr: int
    cic: int
    pik3ca: int

@app.post("/predict-glioma-stage")
def predict_glioma_stage(data: MutationInput):
    """Predict glioma stage based on mutation data"""
    try:
        # Validate input
        if data.gender.lower() not in ['m', 'f']:
            raise HTTPException(status_code=400, detail="Gender must be 'm' or 'f'")
        
        if data.age < 0 or data.age > 120:
            raise HTTPException(status_code=400, detail="Age must be between 0 and 120")
        
        # Validate mutation values
        mutation_fields = ['idh1', 'tp53', 'atrx', 'pten', 'egfr', 'cic', 'pik3ca']
        for field in mutation_fields:
            value = getattr(data, field)
            if value not in [0, 1]:
                raise HTTPException(status_code=400, detail=f"{field} must be 0 or 1")
        
        logger.info(f"🧬 Processing glioma stage prediction for: gender={data.gender}, age={data.age}")
        
        # Prepare input data (gender: m=0, f=1)
        gender = 0 if data.gender.lower() == 'm' else 1
        test_data = [
            gender, data.age, data.idh1, data.tp53, data.atrx,
            data.pten, data.egfr, data.cic, data.pik3ca
        ]
        
        # Use main.py function for staging
        result = classify_glioma_stage_with_confidence(test_data)
        
        stage_name = result["stage"]
        confidence = result["confidence"]
        all_stage_probs = result["all_probabilities"]
        
        logger.info(f"📊 Glioma stage prediction: {stage_name} (confidence: {confidence:.3f})")
        
        # Count positive mutations
        positive_mutations = [name for name, value in [
            ("IDH1", data.idh1), ("TP53", data.tp53), ("ATRX", data.atrx),
            ("PTEN", data.pten), ("EGFR", data.egfr), ("CIC", data.cic), ("PIK3CA", data.pik3ca)
        ] if value == 1]
        
        return {
            "glioma_stage": stage_name,
            "confidence": confidence,
            "all_stage_probabilities": all_stage_probs,
            "mutation_summary": {
                "total_mutations": len(positive_mutations),
                "positive_mutations": positive_mutations,
                "mutation_profile": {
                    "IDH1": bool(data.idh1),
                    "TP53": bool(data.tp53),
                    "ATRX": bool(data.atrx),
                    "PTEN": bool(data.pten),
                    "EGFR": bool(data.egfr),
                    "CIC": bool(data.cic),
                    "PIK3CA": bool(data.pik3ca)
                }
            },
            "recommendations": f"Based on {stage_name} glioma with {len(positive_mutations)} mutations detected."
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"❌ Error in predict_glioma_stage: {e}")
        raise HTTPException(status_code=500, detail=f"Stage prediction failed: {str(e)}")

@app.get("/test")
def test_endpoint():
    """Test endpoint for debugging"""
    try:
        from main import tumor_model, glioma_model
        models_status = {
            "tumor_model_loaded": tumor_model is not None,
            "glioma_model_loaded": glioma_model is not None
        }
    except:
        models_status = {"tumor_model_loaded": False, "glioma_model_loaded": False}
    
    return {
        "message": "🧪 Test endpoint working perfectly!",
        "status": "success",
        "current_directory": os.getcwd(),
        "models_status": models_status,
        "file_checks": {
            "BTD_model_exists": any(os.path.exists(p) for p in ['models/BTD_model.pth', 'BTD_model.pth']),
            "glioma_stages_exists": any(os.path.exists(p) for p in ['models/glioma_stages.pth', 'glioma_stages.pth']),
            "models_dir_exists": os.path.exists('models'),
            "main_py_exists": os.path.exists('main.py')
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
