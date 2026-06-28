import torch
from torchvision import transforms
from PIL import Image
import os
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Import functions - these will be used by both main.py and index.py
try:
    from utils import get_user_test_data, get_precautions_from_gemini
    from models.TumorModel import TumorClassification, GliomaStageModel
    logger.info("✅ Successfully imported models and utils")
except ImportError as e:
    logger.error(f"❌ Failed to import models: {e}")
    # Create dummy functions for testing
    def get_user_test_data():
        return [0, 45.0, 1, 0, 1, 0, 1, 0, 0]  # Mock data
    
    def get_precautions_from_gemini(tumor_type):
        return f"Please consult with a medical professional regarding {tumor_type} treatment."
    
    class TumorClassification:
        def __init__(self): pass
        def eval(self): pass
        def load_state_dict(self, state_dict): pass
        def __call__(self, x): return torch.randn(1, 4)
    
    class GliomaStageModel:
        def __init__(self): pass
        def eval(self): pass
        def load_state_dict(self, state_dict): pass
        def __call__(self, x): return torch.randn(1, 4)

# Global variables for models (shared with FastAPI)
tumor_model = None
glioma_model = None

def load_models():
    """Load both tumor classification and glioma stage models"""
    global tumor_model, glioma_model
    
    try:
        logger.info("🔄 Loading tumor classification model...")
        tumor_model = TumorClassification()
        
        # Try different paths for BTD model
        model_paths = ['models/BTD_model.pth', 'BTD_model.pth', '../BTD_model.pth']
        model_loaded = False
        
        for path in model_paths:
            if os.path.exists(path):
                logger.info(f"📁 Found BTD model at: {path}")
                tumor_model.load_state_dict(torch.load(path, map_location=torch.device('cpu')))
                tumor_model.eval()
                model_loaded = True
                logger.info("✅ Tumor classification model loaded successfully")
                break
        
        if not model_loaded:
            logger.warning("⚠️ BTD_model.pth not found - using mock model")
        
        logger.info("🔄 Loading glioma stage model...")
        glioma_model = GliomaStageModel()
        
        # Try different paths for glioma model
        glioma_paths = ['models/glioma_stages.pth', 'glioma_stages.pth', '../glioma_stages.pth']
        glioma_loaded = False
        
        for path in glioma_paths:
            if os.path.exists(path):
                logger.info(f"📁 Found glioma model at: {path}")
                glioma_model.load_state_dict(torch.load(path, map_location=torch.device('cpu')))
                glioma_model.eval()
                glioma_loaded = True
                logger.info("✅ Glioma stage model loaded successfully")
                break
        
        if not glioma_loaded:
            logger.warning("⚠️ glioma_stages.pth not found - using mock model")
            
    except Exception as e:
        logger.error(f"❌ Failed to load models: {e}")
        tumor_model = None
        glioma_model = None

def predict_tumor(image_path):
    """Predict tumor type from image path"""
    if tumor_model is None:
        logger.error("❌ Tumor model not loaded!")
        return "error"
    
    try:
        # Image preprocessing
        transform = transforms.Compose([
            transforms.Grayscale(),
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.5], std=[0.5])
        ])
        
        # Load and process image
        image = Image.open(image_path)
        if image.mode != 'RGB':
            image = image.convert('RGB')
        
        image_tensor = transform(image).unsqueeze(0)
        
        # Make prediction
        with torch.no_grad():
            outputs = tumor_model(image_tensor)
            predicted = torch.argmax(outputs, dim=1).item()
            labels = ['glioma', 'meningioma', 'notumor', 'pituitary']
            
            # Get confidence scores
            probabilities = torch.softmax(outputs, dim=1)
            confidence = probabilities[0][predicted].item()
            
            logger.info(f"🎯 Prediction: {labels[predicted]} (confidence: {confidence:.3f})")
            return labels[predicted]
            
    except Exception as e:
        logger.error(f"❌ Error in predict_tumor: {e}")
        return "error"

def predict_tumor_with_confidence(image_path):
    """Predict tumor type with confidence scores - used by FastAPI"""
    if tumor_model is None:
        raise Exception("Tumor model not loaded")
    
    transform = transforms.Compose([
        transforms.Grayscale(),
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.5], std=[0.5])
    ])
    
    image = Image.open(image_path)
    if image.mode != 'RGB':
        image = image.convert('RGB')
    
    image_tensor = transform(image).unsqueeze(0)
    
    with torch.no_grad():
        outputs = tumor_model(image_tensor)
        predicted = torch.argmax(outputs, dim=1).item()
        labels = ['glioma', 'meningioma', 'notumor', 'pituitary']
        
        probabilities = torch.softmax(outputs, dim=1)
        confidence = probabilities[0][predicted].item()
        all_probs = {labels[i]: probabilities[0][i].item() for i in range(len(labels))}
        
        return {
            "tumor_type": labels[predicted],
            "confidence": confidence,
            "all_probabilities": all_probs
        }

def classify_glioma_stage(test_data):
    """Classify glioma stage from mutation data"""
    if glioma_model is None:
        logger.error("❌ Glioma model not loaded!")
        return "error"
    
    try:
        input_tensor = torch.tensor(test_data).float().unsqueeze(0)
        
        with torch.no_grad():
            output = glioma_model(input_tensor)
            probabilities = torch.softmax(output, dim=1)
            _, predicted = torch.max(output, 1)
            stages = ['Stage 1', 'Stage 2', 'Stage 3', 'Stage 4']
            
            stage = predicted.item()
            stage_name = stages[stage]
            confidence = probabilities[0][stage].item()
            
            logger.info(f"📊 Glioma stage: {stage_name} (confidence: {confidence:.3f})")
            return stage_name
            
    except Exception as e:
        logger.error(f"❌ Error in classify_glioma_stage: {e}")
        return "error"

def classify_glioma_stage_with_confidence(test_data):
    """Classify glioma stage with confidence scores - used by FastAPI"""
    if glioma_model is None:
        raise Exception("Glioma model not loaded")
    
    input_tensor = torch.tensor(test_data).float().unsqueeze(0)
    
    with torch.no_grad():
        output = glioma_model(input_tensor)
        probabilities = torch.softmax(output, dim=1)
        _, predicted = torch.max(output, 1)
        stages = ['Stage 1', 'Stage 2', 'Stage 3', 'Stage 4']
        
        stage = predicted.item()
        stage_name = stages[stage]
        confidence = probabilities[0][stage].item()
        all_stage_probs = {stages[i]: probabilities[0][i].item() for i in range(len(stages))}
        
        return {
            "stage": stage_name,
            "confidence": confidence,
            "all_probabilities": all_stage_probs
        }

def main_pipeline(image_path):
    """Main pipeline for command-line usage"""
    logger.info("🚀 Starting NeuroAssist Brain Tumor Analysis Pipeline")
    
    # Load models if not already loaded
    if tumor_model is None or glioma_model is None:
        load_models()
    
    # Check if image file exists
    if not os.path.exists(image_path):
        logger.error(f"❌ Image file not found: {image_path}")
        return
    
    # Step 1: Predict tumor type
    logger.info(f"🖼️ Analyzing image: {image_path}")
    tumor_type = predict_tumor(image_path)
    
    if tumor_type == "error":
        logger.error("❌ Failed to predict tumor type")
        return
    
    print(f"\n🎯 Predicted Tumor Type: {tumor_type.upper()}")
    print("=" * 50)
    
    # Step 2: If glioma, get staging
    if tumor_type == "glioma":
        print("🧬 Glioma detected! Please provide mutation data for staging analysis.")
        print("\nCollecting mutation data...")
        
        try:
            test_data = get_user_test_data()
            stage = classify_glioma_stage(test_data)
            
            if stage != "error":
                print(f"\n📊 Glioma Stage: {stage}")
                print(f"🧬 Mutation Data: {test_data}")
            else:
                print("❌ Failed to determine glioma stage")
                
        except Exception as e:
            logger.error(f"❌ Error in glioma staging: {e}")
            print("❌ Failed to collect mutation data or determine stage")
    
    else:
        # Step 3: Get precautions for other tumor types
        print(f"📋 Getting precautions for {tumor_type}...")
        try:
            precaution = get_precautions_from_gemini(tumor_type)
            print(f"\n💡 Precautions for {tumor_type}:")
            print(f"   {precaution}")
        except Exception as e:
            logger.error(f"❌ Error getting precautions: {e}")
            print("❌ Failed to get precautions")
    
    print("\n✅ Analysis complete!")

def test_models():
    """Test if models are working correctly"""
    logger.info("🧪 Testing model functionality...")
    
    # Test with a sample image if available
    test_images = ["images/glioma.jpg", "images/test.jpg", "test.jpg"]
    test_image = None
    
    for img_path in test_images:
        if os.path.exists(img_path):
            test_image = img_path
            break
    
    if test_image:
        logger.info(f"📸 Testing with image: {test_image}")
        result = predict_tumor(test_image)
        print(f"Test prediction: {result}")
    else:
        logger.warning("⚠️ No test images found")
    
    # Test glioma staging with sample data
    sample_data = [0, 45.0, 1, 0, 1, 0, 1, 0, 0]  # Sample mutation data
    stage_result = classify_glioma_stage(sample_data)
    print(f"Test glioma staging: {stage_result}")

if __name__ == "__main__":
    # Load models first
    load_models()
    
    # Check if models loaded successfully
    if tumor_model is None and glioma_model is None:
        logger.error("❌ No models loaded successfully!")
        print("Please ensure model files are available:")
        print("  - models/BTD_model.pth")
        print("  - models/glioma_stages.pth")
        exit(1)
    
    # Test with default image or run test
    import sys
    
    if len(sys.argv) > 1:
        # Use provided image path
        image_path = sys.argv[1]
        main_pipeline(image_path)
    else:
        # Try default images
        default_images = ["images/glioma.jpg", "images/me1.jpg", "test.jpg"]
        image_found = False
        
        for img_path in default_images:
            if os.path.exists(img_path):
                main_pipeline(img_path)
                image_found = True
                break
        
        if not image_found:
            logger.warning("⚠️ No default images found. Running model tests instead...")
            test_models()
            print("\nUsage: python main.py <image_path>")
            print("Example: python main.py images/brain_scan.jpg")
