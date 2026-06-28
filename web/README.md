# 🌐 NeuroAssist AI — Web Application

**Next.js frontend with FastAPI backend for brain tumor analysis**

📖 **[Main Project README](../README.md)**

---

## Overview

This folder contains the **full-stack web application** component of NeuroAssist AI — a production-grade **Next.js 15** frontend paired with a **FastAPI** backend that serves the deep learning models via REST endpoints.

---

## Structure

```
web/
├── app/                        # Next.js App Router pages
│   ├── detect-tumor/           #   Upload MRI → tumor classification
│   ├── predict-glioma/         #   Input mutations → glioma staging
│   ├── screening/              #   Initial health assessment
│   ├── diagnostic/             #   Detailed diagnostic report
│   ├── complete-analysis/      #   Combined tumor + staging analysis
│   ├── services/               #   Medical services overview
│   ├── about/                  #   Project info & team bios
│   ├── contact/                #   Contact form
│   └── api/mock/               #   Mock endpoints for dev/testing
├── components/                 # React component library
│   ├── ui/                     #   shadcn/ui primitives (50+ components)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   └── ...
│   └── ai-assistant/           # AI chat assistant
│       ├── floating-assistant.tsx
│       ├── chat-assistant.tsx
│       ├── enhanced-ai-service.tsx
│       └── ai-service.ts
├── backend/                    # FastAPI inference API
│   ├── main.py                 #   Model loading & prediction functions
│   ├── index.py                #   FastAPI app with REST routes
│   ├── models/                 #   PyTorch model definitions
│   │   ├── __init__.py
│   │   └── TumorModel.py
│   ├── utils.py                #   Precautions & data validation
│   ├── requirements.txt        #   Python dependencies
│   └── start_server.py         #   Startup script with auto-setup
├── lib/                        # API client & shared utilities
│   ├── api-client.ts           #   HTTP client for FastAPI backend
│   └── utils.ts                #   Helper functions
├── public/                     # Static assets
│   ├── images/                 #   Hero images & team photos
│   └── placeholder.svg
├── styles/                     # Global CSS
│   └── globals.css
├── hooks/                      # Custom React hooks
├── package.json
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── components.json             # shadcn/ui configuration
```

---

## Frontend Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page with hero, features, and calls to action |
| `/detect-tumor` | Upload MRI scan and run tumor classification |
| `/predict-glioma` | Enter patient & gene mutation data for glioma staging |
| `/screening` | Initial health screening questionnaire |
| `/diagnostic` | View detailed diagnostic results |
| `/complete-analysis` | Combined tumor detection + staging analysis |
| `/services` | Overview of medical AI services |
| `/about` | Project background and team member profiles |
| `/contact` | Contact form and information |

---

## Backend API

The FastAPI backend provides:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Health check & model status |
| `/predict-image` | POST | Upload MRI → tumor type + confidence scores |
| `/predict-glioma-stage` | POST | Gene mutations → glioma stage + probabilities |
| `/test` | GET | Debug endpoint with system info |

### Request formats

**`/predict-image`** — multipart form with `file` field (image/jpeg, image/png)

**`/predict-glioma-stage`** — JSON body:
```json
{
  "gender": "m",
  "age": 55,
  "idh1": 1,
  "tp53": 1,
  "atrx": 1,
  "pten": 0,
  "egfr": 1,
  "cic": 0,
  "pik3ca": 1
}
```

---

## Quick Start

### 1. Start the backend

```bash
cd web/backend
python -m venv .venv
.venv\Scripts\activate     # Windows
pip install -r requirements.txt
python start_server.py
```

The API runs on `http://localhost:8000` by default.

### 2. Start the frontend

```bash
cd web
npm install
npm run dev
```

The app runs on `http://localhost:3000`.

Set `NEXT_PUBLIC_API_URL` in `.env.local` to connect the frontend to your backend:

```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## Tech Stack

### Frontend

| Technology | Purpose |
|------------|---------|
| Next.js 15 | React framework with App Router |
| React 19 | UI library |
| TypeScript | Type safety |
| Tailwind CSS | Utility-first styling |
| shadcn/ui | Accessible component primitives |
| Framer Motion | Animations |
| Lucide React | Icons |

### Backend

| Technology | Purpose |
|------------|---------|
| FastAPI | REST API framework |
| Uvicorn | ASGI server |
| PyTorch | Deep learning inference |
| Pydantic | Request validation |
| python-multipart | File upload handling |

---

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | FastAPI backend URL | `http://localhost:8000` |
| `NEXT_PUBLIC_SITE_URL` | Frontend deployment URL | `http://localhost:3000` |

---

## Deployment

- **Frontend**: Deploy `web/` to Vercel
- **Backend**: Deploy `web/backend/` to Render, Railway, or any Python host
- Ensure `NEXT_PUBLIC_API_URL` points to the deployed backend URL
