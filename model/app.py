import os, streamlit as st, torch, gdown
from torchvision import transforms
from PIL import Image
from TumorModel import TumorClassification, GliomaStageModel

st.set_page_config(page_title="Brain Tumor Predictor", layout="centered")

# ── Download models via gdown if not present ────────────────────────────────
TUMOR_URL = "https://drive.google.com/uc?id=1juQk4AhIi7u7I41uttCUpJYsvtsPyZUy"
STAGE_URL = "https://drive.google.com/uc?id=19MrhHVQbSlVmaV-bP_FIpcY5t9wjKMSX"

if not os.path.exists("BTD_model.pth"):
    gdown.download(TUMOR_URL, "BTD_model.pth", quiet=False)
if not os.path.exists("glioma_stages.pth"):
    gdown.download(STAGE_URL, "glioma_stages.pth", quiet=False)

# ── Load models with strict=False and display missing/unexpected keys ─────────
@st.cache_resource
def load_models():
    tm = TumorClassification()
    sm = GliomaStageModel()

    ckpt1 = torch.load("BTD_model.pth", map_location="cpu")
    missing1, unexpected1 = tm.load_state_dict(ckpt1, strict=False)
    st.sidebar.markdown("### TumorModel load status")
    st.sidebar.write("Missing keys:", missing1)
    st.sidebar.write("Unexpected keys:", unexpected1)

    ckpt2 = torch.load("glioma_stages.pth", map_location="cpu")
    missing2, unexpected2 = sm.load_state_dict(ckpt2, strict=False)
    st.sidebar.markdown("### GliomaStageModel load status")
    st.sidebar.write("Missing keys:", missing2)
    st.sidebar.write("Unexpected keys:", unexpected2)

    tm.eval(); sm.eval()
    return tm, sm

tumor_model, glioma_model = load_models()

# ── Labels & Transforms ──────────────────────────────────────────────────────
tumor_labels = ['glioma','meningioma','notumor','pituitary']
stage_labels = ['Stage 1','Stage 2','Stage 3','Stage 4']

transform = transforms.Compose([
    transforms.Grayscale(),
    transforms.Resize((224,224)),
    transforms.ToTensor(),
    transforms.Normalize([0.5],[0.5])
])

# ── Streamlit UI ─────────────────────────────────────────────────────────────
st.title("🧠 Brain Tumor Detector & Glioma Stage Predictor")

tab1, tab2 = st.tabs(["Tumor Detection","Glioma Stage"])

with tab1:
    st.header("Upload MRI Image")
    img_file = st.file_uploader("", type=["jpg","png","jpeg"])
    if img_file:
        img = Image.open(img_file).convert("L")
        st.image(img, use_column_width=True)
        x = transform(img).unsqueeze(0)
        with torch.no_grad():
            out = tumor_model(x)
            pred = tumor_labels[int(torch.argmax(out))]
        st.success(f"**Tumor Type:** {pred.upper()}")

with tab2:
    st.header("Patient & Genetic Info")
    gender = st.radio("Gender", ["Male","Female"])
    age    = st.slider("Age",1,100,25)
    genes  = {g: st.radio(g, [0,1], horizontal=True)
              for g in ["IDH1","TP53","ATRX","PTEN","EGFR","CIC","PIK3CA"]}
    if st.button("Predict Stage"):
        vals = [0 if gender=="Male" else 1, age] + list(genes.values())
        x = torch.tensor([vals], dtype=torch.float32)
        with torch.no_grad():
            out = glioma_model(x)
            pred = stage_labels[int(torch.argmax(out))]
        st.success(f"**Glioma Stage:** {pred}")
