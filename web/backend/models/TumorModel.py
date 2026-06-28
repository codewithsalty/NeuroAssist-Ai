"""
PyTorch Model Definitions for NeuroAssist
Contains TumorClassification and GliomaStageModel classes
"""

import torch
import torch.nn as nn
import torch.nn.functional as F

class TumorClassification(nn.Module):
    """
    CNN model for brain tumor classification
    Classifies MRI images into: glioma, meningioma, notumor, pituitary
    """
    
    def __init__(self, num_classes=4):
        super(TumorClassification, self).__init__()
        
        # Convolutional layers
        self.conv1 = nn.Conv2d(1, 32, kernel_size=3, padding=1)
        self.conv2 = nn.Conv2d(32, 64, kernel_size=3, padding=1)
        self.conv3 = nn.Conv2d(64, 128, kernel_size=3, padding=1)
        self.conv4 = nn.Conv2d(128, 256, kernel_size=3, padding=1)
        
        # Pooling layer
        self.pool = nn.MaxPool2d(2, 2)
        
        # Dropout for regularization
        self.dropout = nn.Dropout(0.5)
        
        # Fully connected layers
        self.fc1 = nn.Linear(256 * 14 * 14, 512)  # Adjusted for 224x224 input
        self.fc2 = nn.Linear(512, 128)
        self.fc3 = nn.Linear(128, num_classes)
        
    def forward(self, x):
        # Convolutional layers with ReLU and pooling
        x = self.pool(F.relu(self.conv1(x)))  # 224x224 -> 112x112
        x = self.pool(F.relu(self.conv2(x)))  # 112x112 -> 56x56
        x = self.pool(F.relu(self.conv3(x)))  # 56x56 -> 28x28
        x = self.pool(F.relu(self.conv4(x)))  # 28x28 -> 14x14
        
        # Flatten for fully connected layers
        x = x.view(-1, 256 * 14 * 14)
        
        # Fully connected layers with dropout
        x = F.relu(self.fc1(x))
        x = self.dropout(x)
        x = F.relu(self.fc2(x))
        x = self.dropout(x)
        x = self.fc3(x)
        
        return x

class GliomaStageModel(nn.Module):
    """
    Neural network model for glioma staging
    Takes mutation data and patient info to predict glioma stage (1-4)
    """
    
    def __init__(self, input_size=9, num_classes=4):
        super(GliomaStageModel, self).__init__()
        
        # Input: [gender, age, idh1, tp53, atrx, pten, egfr, cic, pik3ca]
        self.fc1 = nn.Linear(input_size, 64)
        self.fc2 = nn.Linear(64, 32)
        self.fc3 = nn.Linear(32, 16)
        self.fc4 = nn.Linear(16, num_classes)
        
        # Dropout for regularization
        self.dropout = nn.Dropout(0.3)
        
        # Batch normalization
        self.bn1 = nn.BatchNorm1d(64)
        self.bn2 = nn.BatchNorm1d(32)
        
    def forward(self, x):
        # First layer with batch norm and dropout
        x = F.relu(self.bn1(self.fc1(x)))
        x = self.dropout(x)
        
        # Second layer with batch norm and dropout
        x = F.relu(self.bn2(self.fc2(x)))
        x = self.dropout(x)
        
        # Third layer
        x = F.relu(self.fc3(x))
        
        # Output layer
        x = self.fc4(x)
        
        return x

# Model factory functions
def create_tumor_model():
    """Create and return a TumorClassification model"""
    return TumorClassification(num_classes=4)

def create_glioma_model():
    """Create and return a GliomaStageModel"""
    return GliomaStageModel(input_size=9, num_classes=4)

# Model information
MODEL_INFO = {
    "tumor_model": {
        "name": "TumorClassification",
        "input_shape": (1, 224, 224),
        "output_classes": ["glioma", "meningioma", "notumor", "pituitary"],
        "description": "CNN for brain tumor classification from MRI images"
    },
    "glioma_model": {
        "name": "GliomaStageModel", 
        "input_features": ["gender", "age", "idh1", "tp53", "atrx", "pten", "egfr", "cic", "pik3ca"],
        "output_classes": ["Stage 1", "Stage 2", "Stage 3", "Stage 4"],
        "description": "Neural network for glioma staging based on mutation data"
    }
}
