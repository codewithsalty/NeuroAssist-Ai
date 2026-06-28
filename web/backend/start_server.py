#!/usr/bin/env python3
"""
NeuroAssist FastAPI Server Startup Script
This script ensures all dependencies are met before starting the server
"""

import os
import sys
import logging
import subprocess

# Set up logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

def check_dependencies():
    """Check if all required packages are installed"""
    required_packages = [
        'fastapi',
        'uvicorn',
        'torch',
        'torchvision', 
        'PIL',
        'pydantic'
    ]
    
    missing_packages = []
    
    for package in required_packages:
        try:
            if package == 'PIL':
                import PIL
            else:
                __import__(package)
            logger.info(f"✅ {package} is installed")
        except ImportError:
            missing_packages.append(package)
            logger.error(f"❌ {package} is missing")
    
    return missing_packages

def check_files():
    """Check if all required files exist"""
    required_files = [
        'index.py',
        'main.py',
        'utils.py',
        'models/__init__.py',
        'models/TumorModel.py'
    ]
    
    missing_files = []
    
    for file_path in required_files:
        if os.path.exists(file_path):
            logger.info(f"✅ {file_path} exists")
        else:
            missing_files.append(file_path)
            logger.error(f"❌ {file_path} is missing")
    
    # Check for model files (optional)
    model_files = ['models/BTD_model.pth', 'models/glioma_stages.pth']
    for model_file in model_files:
        if os.path.exists(model_file):
            logger.info(f"✅ {model_file} found")
        else:
            logger.warning(f"⚠️ {model_file} not found (will use mock model)")
    
    return missing_files

def install_missing_packages(packages):
    """Install missing packages"""
    if not packages:
        return True
    
    logger.info(f"Installing missing packages: {packages}")
    
    # Map package names to pip install names
    pip_names = {
        'PIL': 'Pillow',
        'torch': 'torch',
        'torchvision': 'torchvision',
        'fastapi': 'fastapi',
        'uvicorn': 'uvicorn[standard]',
        'pydantic': 'pydantic'
    }
    
    for package in packages:
        pip_name = pip_names.get(package, package)
        try:
            subprocess.check_call([sys.executable, '-m', 'pip', 'install', pip_name])
            logger.info(f"✅ Successfully installed {pip_name}")
        except subprocess.CalledProcessError:
            logger.error(f"❌ Failed to install {pip_name}")
            return False
    
    return True

def start_server():
    """Start the FastAPI server"""
    logger.info("🚀 Starting NeuroAssist FastAPI server...")
    
    try:
        # Start uvicorn server
        os.system("uvicorn index:app --host 0.0.0.0 --port 8000 --reload")
    except KeyboardInterrupt:
        logger.info("🛑 Server stopped by user")
    except Exception as e:
        logger.error(f"❌ Failed to start server: {e}")

def main():
    """Main startup function"""
    logger.info("🧠 NeuroAssist FastAPI Server Setup")
    logger.info("=" * 50)
    
    # Check current directory
    current_dir = os.getcwd()
    logger.info(f"📁 Current directory: {current_dir}")
    
    # Check dependencies
    logger.info("🔍 Checking dependencies...")
    missing_packages = check_dependencies()
    
    if missing_packages:
        logger.info("📦 Installing missing packages...")
        if not install_missing_packages(missing_packages):
            logger.error("❌ Failed to install some packages. Please install manually:")
            for package in missing_packages:
                print(f"  pip install {package}")
            return False
    
    # Check files
    logger.info("📋 Checking required files...")
    missing_files = check_files()
    
    if missing_files:
        logger.error("❌ Missing required files:")
        for file_path in missing_files:
            print(f"  {file_path}")
        logger.error("Please create the missing files before starting the server.")
        return False
    
    # Test imports
    logger.info("🧪 Testing imports...")
    try:
        from index import app
        logger.info("✅ FastAPI app imported successfully")
    except Exception as e:
        logger.error(f"❌ Failed to import FastAPI app: {e}")
        return False
    
    # Start server
    logger.info("✅ All checks passed! Starting server...")
    start_server()
    
    return True

if __name__ == "__main__":
    main()
