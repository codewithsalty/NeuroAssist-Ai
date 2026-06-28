"""
NeuroAssist Models Package
Contains PyTorch model definitions for brain tumor classification and glioma staging
"""

__version__ = "1.0.0"
__author__ = "NeuroAssist Team"

# Make models available at package level
try:
    from .TumorModel import TumorClassification, GliomaStageModel
    __all__ = ['TumorClassification', 'GliomaStageModel']
except ImportError:
    # Models not available, will be handled gracefully
    __all__ = []
