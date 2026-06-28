"""
Utility functions for NeuroAssist
Contains helper functions for data processing and external API calls
"""

import logging

logger = logging.getLogger(__name__)

def get_user_test_data():
    """
    Get mutation test data from user input
    Returns a list of values for glioma staging model
    """
    try:
        print("\n🧬 Please provide mutation test data:")
        print("Enter 1 for positive, 0 for negative")
        
        # Get gender
        while True:
            gender_input = input("Gender (m/f): ").lower().strip()
            if gender_input in ['m', 'f']:
                gender = 0 if gender_input == 'm' else 1
                break
            print("Please enter 'm' for male or 'f' for female")
        
        # Get age
        while True:
            try:
                age = float(input("Age: "))
                if 0 <= age <= 120:
                    break
                print("Please enter a valid age between 0 and 120")
            except ValueError:
                print("Please enter a valid number for age")
        
        # Get mutation data
        mutations = {}
        mutation_names = ['IDH1', 'TP53', 'ATRX', 'PTEN', 'EGFR', 'CIC', 'PIK3CA']
        
        for mutation in mutation_names:
            while True:
                try:
                    value = int(input(f"{mutation} mutation (0/1): "))
                    if value in [0, 1]:
                        mutations[mutation.lower()] = value
                        break
                    print("Please enter 0 or 1")
                except ValueError:
                    print("Please enter 0 or 1")
        
        # Return in the format expected by the model
        test_data = [
            gender, age,
            mutations['idh1'], mutations['tp53'], mutations['atrx'],
            mutations['pten'], mutations['egfr'], mutations['cic'], mutations['pik3ca']
        ]
        
        logger.info(f"Collected mutation data: {test_data}")
        return test_data
        
    except KeyboardInterrupt:
        print("\n❌ Input cancelled by user")
        return None
    except Exception as e:
        logger.error(f"Error collecting user data: {e}")
        # Return sample data as fallback
        return [0, 45.0, 1, 0, 1, 0, 1, 0, 0]

def get_precautions_from_gemini(tumor_type):
    """
    Get precautions and recommendations for different tumor types
    In a real implementation, this would call Google's Gemini API
    """
    
    precautions = {
        "glioma": """
        🧠 Glioma Precautions:
        • Consult with a neuro-oncologist immediately
        • Consider genetic testing for treatment planning
        • Monitor for neurological symptoms
        • Discuss treatment options: surgery, radiation, chemotherapy
        • Join support groups for patients and families
        • Regular MRI follow-ups as recommended
        """,
        
        "meningioma": """
        🧠 Meningioma Precautions:
        • Consult with a neurosurgeon for evaluation
        • Most meningiomas are benign but require monitoring
        • Regular imaging to track growth
        • Watch for symptoms: headaches, vision changes, seizures
        • Surgical removal may be recommended depending on size/location
        • Generally good prognosis with proper treatment
        """,
        
        "pituitary": """
        🧠 Pituitary Tumor Precautions:
        • Consult with an endocrinologist and neurosurgeon
        • Monitor hormone levels regularly
        • Watch for vision changes (especially peripheral vision)
        • Check for symptoms of hormone imbalance
        • Treatment options include medication, surgery, or radiation
        • Most pituitary tumors are treatable
        """,
        
        "notumor": """
        ✅ No Tumor Detected:
        • Great news! No tumor was detected in the scan
        • Continue regular health check-ups
        • Maintain a healthy lifestyle
        • If you have persistent symptoms, consult your doctor
        • Consider follow-up imaging if symptoms persist
        • Stay informed about brain health
        """
    }
    
    try:
        # In a real implementation, you would call Gemini API here
        # For now, return predefined precautions
        precaution = precautions.get(tumor_type.lower(), 
            f"Please consult with a medical professional regarding {tumor_type} for proper guidance.")
        
        logger.info(f"Generated precautions for {tumor_type}")
        return precaution.strip()
        
    except Exception as e:
        logger.error(f"Error generating precautions: {e}")
        return f"Please consult with a medical professional regarding {tumor_type} treatment options."

def validate_image_file(file_path):
    """
    Validate if the file is a valid image
    """
    import os
    from PIL import Image
    
    if not os.path.exists(file_path):
        return False, "File does not exist"
    
    try:
        with Image.open(file_path) as img:
            img.verify()
        return True, "Valid image file"
    except Exception as e:
        return False, f"Invalid image file: {e}"

def format_confidence_score(confidence):
    """
    Format confidence score for display
    """
    percentage = confidence * 100
    if percentage >= 90:
        return f"{percentage:.1f}% (Very High Confidence)"
    elif percentage >= 75:
        return f"{percentage:.1f}% (High Confidence)"
    elif percentage >= 60:
        return f"{percentage:.1f}% (Moderate Confidence)"
    else:
        return f"{percentage:.1f}% (Low Confidence)"

# Sample data for testing
SAMPLE_MUTATION_DATA = {
    "high_grade_glioma": [0, 55.0, 1, 1, 1, 1, 1, 0, 1],  # Multiple mutations
    "low_grade_glioma": [1, 35.0, 1, 0, 0, 0, 0, 0, 0],   # IDH1 only
    "normal_case": [0, 45.0, 0, 0, 0, 0, 0, 0, 0]         # No mutations
}
