# NeuroAssist AI

Advanced Brain Tumor Detection and Glioma Stages Prediction

[Main Site](https://neuroassistai.vercel.app/) ?? [Try it on Streamlit](https://neuroassist.streamlit.app/) ?? [FastAPI Backend](https://neuroassist-api.onrender.com/docs) ?? [GitHub Repo](https://github.com/codewithsalty/NeuroAssist-Ai)

---

<br/>
<div align="center">
  <img src="resources/Neuroassist (1).png" alt="NeuroAssist AI landing page showing the main interface with upload option" width="100%" style="max-width: 800px; border-radius: 12px;"/>
</div>
<br/>

## Contents

1. [Overview](#overview)
2. [End-to-End Pipeline](#end-to-end-pipeline)
3. [Why NeuroAssist AI](#why-neuroassist-ai)
4. [Research Basis](#research-basis)
5. [Dataset](#dataset)
6. [Model Architectures](#model-architectures)
7. [Features Walkthrough](#features-walkthrough)
8. [Download Pretrained Models](#download-pretrained-models)
9. [Tech Stack](#tech-stack)
10. [Project Structure](#project-structure)
11. [Installation and Local Run](#installation-and-local-run)
12. [API Endpoints](#api-endpoints)
13. [Embedding](#embedding)
14. [Contributing](#contributing)
15. [License](#license)
16. [Contact](#contact)

---

## Overview

NeuroAssist AI is a full-stack AI-powered diagnostic pipeline that brings brain tumor analysis to your browser, combining deep learning models with a modern web interface.

The system operates in two stages:

1. **Tumor Type Detection** - A custom CNN classifies grayscale MRI scans into Glioma, Meningioma, Pituitary, or No Tumor.
2. **Glioma Stage Prediction** - A compact ANN predicts glioma stage (I-IV) from gene-mutation inputs.

Built in PyTorch, served via Streamlit (interactive demo) and FastAPI (production API), with a Next.js frontend for a complete end-to-end user experience.

<div align="center">
  <img src="resources/Neuroassist (2).png" alt="Tumor detection interface showing MRI upload with analysis results" width="80%" style="border-radius: 8px; margin: 16px 0;"/>
</div>

---

## End-to-End Pipeline

```
Upload MRI Image -> CNN Model -> Tumor Type -> Display Prediction

Input Gene Mutations -> ANN Model -> Stage I-IV -> Display Stage
```

Available on Streamlit Cloud for interactive demos and Vercel for the full web experience.

<div align="center">
  <img src="resources/Neuroassist (4).png" alt="Diagnostic results display with confidence scores" width="80%" style="border-radius: 8px; margin: 16px 0;"/>
</div>

---

## Why NeuroAssist AI

- Clinically Inspired: Mirrors real diagnostic workflows.
- Zero-Install: Models auto-download from Google Drive at first run.
- Triple Deployment: Interactive Streamlit demo, full Next.js web app, and production FastAPI API.
- Extensible: Easy to swap models or front-ends.

---

## Research Basis

Inspired by the study Brain Tumor Classification and Glioma Stage Prediction Using Deep Learning, implemented from scratch with public MRI datasets and gene mutation data.

---

## Dataset

- Source: Kaggle Brain Tumor Dataset
- Classes: Glioma, Meningioma, Pituitary, No Tumor
- Format: Grayscale .jpg in class-named folders

---

## Model Architectures

### CNN - Tumor Type Detection

| Layer | Details |
| ------------- | ---------------------------------------------- |
| Input | 1x224x224 grayscale MRI |
| Conv Block x3 | Conv2D -> ReLU -> MaxPool2D |
| FC Layers | Flatten -> Dense(512) -> Dense(256) -> Softmax(4) |
| Output | 4-class probability |

<div align="center">
  <img src="resources/Neuroassist (3).png" alt="Glioma staging form with gene mutation inputs" width="80%" style="border-radius: 8px; margin: 16px 0;"/>
</div>

### ANN - Glioma Stage Classification

| Layer | Details |
| ------------ | --------------------------------------- |
| Input | 9 numerical features (gene mutations) |
| Dense Layers | 100 -> 50 -> 30 neurons, ReLU activations |
| Output | Softmax(4) -> Stage I-IV |

<div align="center">
  <img src="resources/Neuroassist (6).png" alt="Complete analysis view combining detection and staging" width="80%" style="border-radius: 8px; margin: 16px 0;"/>
</div>

---

## Features Walkthrough

<div align="center">
  <img src="resources/Neuroassist (5).png" alt="Patient screening questionnaire interface" width="80%" style="border-radius: 8px; margin: 12px 0;"/>
</div>

<br/>

<div align="center">
  <img src="resources/Neuroassist (7).png" alt="AI assistant chat interface for medical guidance" width="80%" style="border-radius: 8px; margin: 12px 0;"/>
</div>

<br/>

<div align="center">
  <img src="resources/Neuroassist (8).png" alt="Services overview page" width="80%" style="border-radius: 8px; margin: 12px 0;"/>
</div>

<br/>

<div align="center">
  <img src="resources/Neuroassist (9).png" alt="About page with team information" width="80%" style="border-radius: 8px; margin: 12px 0;"/>
</div>

<br/>

<div align="center">
  <img src="resources/Neuroassist (10).png" alt="Contact page with form" width="80%" style="border-radius: 8px; margin: 12px 0;"/>
</div>

<br/>

<div align="center">
  <img src="resources/Neuroassist (11).png" alt="Detailed diagnostic report view" width="80%" style="border-radius: 8px; margin: 12px 0;"/>
</div>

<br/>

<div align="center">
  <img src="resources/Neuroassist (12).png" alt="Healthcare services listing" width="80%" style="border-radius: 8px; margin: 12px 0;"/>
</div>

<br/>

<div align="center">
  <img src="resources/Neuroassist (13).png" alt="Medical team profiles" width="80%" style="border-radius: 8px; margin: 12px 0;"/>
</div>

<br/>

<div align="center">
  <img src="resources/Neuroassist (14).png" alt="Platform features and capabilities overview" width="80%" style="border-radius: 8px; margin: 12px 0;"/>
</div>

<br/>

<div align="center">
  <img src="resources/Neuroassist (15).png" alt="Mobile responsive view of the application" width="80%" style="border-radius: 8px; margin: 12px 0;"/>
</div>

<br/>

<div align="center">
  <img src="resources/Neuroassist (16).png" alt="Application settings and configuration" width="80%" style="border-radius: 8px; margin: 12px 0;"/>
</div>

---

## Download Pretrained Models

Due to GitHub's 100 MB limit, download the models externally:

- TumorClassification (CNN) - [Download BTD_model.pth](https://drive.google.com/uc?export=download&id=1juQk4AhIi7u7I41uttCUpJYsvtsPyZUy)
- GliomaStageModel (ANN) - [Download glioma_stages.pth](https://drive.google.com/uc?export=download&id=19MrhHVQbSlVmaV-bP_FIpcY5t9wjKMSX)

After downloading, place them in:

```
model/              - for the Streamlit demo
web/backend/models/ - for the FastAPI backend
```

The apps will auto-fetch these if missing.

---

## Tech Stack

| Category | Tools / Libraries |
| ---------------- | ---------------------------------------------------- |
| Language | Python 3.10+, TypeScript |
| Deep Learning | PyTorch, torchvision |
| Backend API | FastAPI, Uvicorn, Pydantic |
| Frontend | Next.js 15, React 19, Tailwind CSS, shadcn/ui |
| Model Demo | Streamlit |
| Data Science | Pillow, NumPy |
| Hosting | Vercel, Streamlit Community Cloud, Render |
| Model Storage | Google Drive (public download links) |

---

## Project Structure

```
NeuroAssist-Ai/
????????? web/                  Next.js web application
???   ????????? app/              App Router pages and API mock routes
???   ????????? components/       React components and UI library
???   ????????? backend/          FastAPI inference API
???   ???   ????????? main.py       Model loading and prediction logic
???   ???   ????????? index.py      FastAPI REST endpoints
???   ???   ????????? models/       PyTorch model definitions
???   ???   ????????? utils.py      Helper functions
???   ???   ????????? requirements.txt
???   ???   ????????? start_server.py
???   ????????? lib/              API client and utilities
???   ????????? public/           Static assets and team photos
???   ????????? styles/           Global CSS
???   ????????? package.json
???   ????????? next.config.mjs
????????? model/                Standalone Streamlit ML demo
???   ????????? app.py            Streamlit UI
???   ????????? TumorModel.py     CNN and ANN model definitions
???   ????????? requirements.txt
????????? resources/            Project screenshots
????????? README.md
????????? .gitignore
????????? LICENSE
```

---

## Installation and Local Run

### Run the Streamlit model demo

```bash
cd model
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
streamlit run app.py
```

### Run the FastAPI backend

```bash
cd web/backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python start_server.py
```

### Run the Next.js frontend

```bash
cd web
npm install
npm run dev
```

Set NEXT_PUBLIC_API_URL in .env.local to point to your backend.

---

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| / | GET | Health check and model status |
| /predict-image | POST | Upload MRI image for tumor classification |
| /predict-glioma-stage | POST | Submit mutation data for glioma staging |
| /test | GET | Debug endpoint with system info |

### Predict tumor from MRI

```bash
curl -X POST https://neuroassist-api.onrender.com/predict-image \
  -F "file=@brain_scan.jpg"
```

### Predict glioma stage

```bash
curl -X POST https://neuroassist-api.onrender.com/predict-glioma-stage \
  -H "Content-Type: application/json" \
  -d '{"gender":"m","age":55,"idh1":1,"tp53":1,"atrx":1,"pten":0,"egfr":1,"cic":0,"pik3ca":1}'
```

---

## Embedding

Embed the Streamlit demo in your site via:

```html
<iframe
  src="https://neuroassist.streamlit.app/"
  width="100%" height="800" frameborder="0"
  aria-label="NeuroAssistAI Models">
</iframe>
```

Or embed the full web app:

```html
<iframe
  src="https://neuroassistai.vercel.app/"
  width="100%" height="800" frameborder="0"
  aria-label="NeuroAssistAI Web App">
</iframe>
```

---

## Contributing

1. Fork and clone
2. Create a branch: `git checkout -b feat/YourFeature`
3. Commit and push: `git commit -m "Add YourFeature"`
4. Open a Pull Request

---

## License

This project is licensed under MIT. See LICENSE for details.

---

## Contact

- Instagram: [@codewithsalty](https://www.instagram.com/codewithsalty/)
- LinkedIn: [s4lmankhan](https://www.linkedin.com/in/s4lmankhan/)
- GitHub: [codewithsalty](https://github.com/codewithsalty)
- Email: codewithsalty@gmail.com
