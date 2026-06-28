# 🧠 NeuroAssist AI — Model Component

**Standalone Streamlit demo for brain tumor detection & glioma stage prediction**

📖 **[Main Project README](../README.md)**

---

## Overview

This folder contains the **ML model** component of NeuroAssist AI — a standalone **Streamlit** application that loads pretrained PyTorch models and provides an interactive interface for brain tumor analysis.

### Capabilities

- **Tumor Type Detection** — Upload an MRI scan and classify it as Glioma, Meningioma, Pituitary, or No Tumor
- **Glioma Stage Prediction** — Input 7 gene mutation markers (IDH1, TP53, ATRX, PTEN, EGFR, CIC, PIK3CA) plus age and gender to predict glioma stage (I–IV)

---

## Files

| File | Description |
|------|-------------|
| `app.py` | Streamlit application with two-tab UI |
| `TumorModel.py` | PyTorch model definitions (CNN + ANN) |
| `requirements.txt` | Python dependencies (streamlit, torch, torchvision, Pillow, gdown) |

---

## Model Architecture

### CNN — Tumor Type Detection

| Layer         | Details                                        |
| ------------- | ---------------------------------------------- |
| **Input**     | 1×224×224 grayscale MRI                        |
| Conv Block ×3 | Conv2D → ReLU → MaxPool2D                      |
| FC Layers     | Flatten → Dense(512) → Dense(256) → Softmax(4) |
| **Output**    | 4‑class probability                            |

### ANN — Glioma Stage Classification

| Layer        | Details                                 |
| ------------ | --------------------------------------- |
| **Input**    | 9 numerical features (gene mutations)   |
| Dense Layers | 100 → 50 → 30 neurons, ReLU activations |
| **Output**   | Softmax(4) → Stage I–IV                 |

---

## Pretrained Models

Download and place in this directory:

| Model | Download Link | Size |
|-------|--------------|------|
| TumorClassification (CNN) | [BTD_model.pth](https://drive.google.com/uc?export=download&id=1juQk4AhIi7u7I41uttCUpJYsvtsPyZUy) | ~85 MB |
| GliomaStageModel (ANN) | [glioma_stages.pth](https://drive.google.com/uc?export=download&id=19MrhHVQbSlVmaV-bP_FIpcY5t9wjKMSX) | ~2 MB |

The app will auto-download missing models via `gdown` on first run.

---

## Quick Start

```bash
cd model
python -m venv .venv
source .venv/bin/activate    # macOS/Linux
.venv\Scripts\activate       # Windows
pip install -r requirements.txt
streamlit run app.py
```

---

## Tech Stack

| Category       | Tools                                    |
| -------------- | ---------------------------------------- |
| Language       | Python 3.10+                             |
| Deep Learning  | PyTorch, torchvision                     |
| UI             | Streamlit                                |
| Data Science   | Pillow, NumPy                            |
| Model Storage  | Google Drive (auto-download via gdown)   |
