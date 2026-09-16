# Mezbani ☕

A full-stack cafe ordering app. Customers browse the menu, add items to cart, and place orders. The owner receives a WhatsApp notification for every new order.

**Stack:** FastAPI · SQLite · React · Vite

---

## Local Development

### Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
pip install -r requirements.txt
python database.py           # initialise DB
uvicorn main:app --reload
```
Runs at `http://127.0.0.1:8000`

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Runs at `http://localhost:5173`

---

## Deployment

### Backend → Render (free tier)

1. Push your repo to GitHub (the `.gitignore` already excludes `.env` and `venv/`)
2. Go to [render.com](https://render.com) → **New Web Service** → connect your repo
3. Set these fields:
   - **Root Directory:** `backend`
   - **Build Command:** `pip install -r requirements.txt && python database.py`
   - **Start Command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`
4. Add **Environment Variables** in the Render dashboard:
   | Key | Value |
   |-----|-------|
   | `WHATSAPP_TOKEN` | your Meta access token |
   | `PHONE_NUMBER_ID` | `1371047999422998` |
   | `OWNER_PHONE` | `918556899621` |
   | `ALLOWED_ORIGINS` | your Netlify/Vercel URL e.g. `https://mezbani.netlify.app` |
5. Deploy — note the URL e.g. `https://mezbani-api.onrender.com`

### Frontend → Netlify

1. Go to [netlify.com](https://netlify.com) → **Add new site** → Import from Git
2. Set these fields:
   - **Base directory:** `frontend`
   - **Build command:** `npm run build`
   - **Publish directory:** `frontend/dist`
3. Add **Environment Variable:**
   | Key | Value |
   |-----|-------|
   | `VITE_API_URL` | your Render backend URL |
4. Deploy

### Frontend → Vercel (alternative)

1. Go to [vercel.com](https://vercel.com) → **New Project** → Import repo
2. Set **Root Directory** to `frontend`
3. Add Environment Variable `VITE_API_URL` = your Render backend URL
4. Deploy

---

## Environment Variables

### backend/.env (local only, never commit)
```
WHATSAPP_TOKEN=your_meta_token
PHONE_NUMBER_ID=1371047999422998
OWNER_PHONE=918556899621
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:5174
```

### frontend/.env.development (local only, never commit)
```
VITE_API_URL=http://127.0.0.1:8000
```

---

## Admin Panel

Visit `/admin` → login with your credentials → manage orders at `/admin/dashboard`

> ⚠️ Meta temporary tokens expire every 24 hours. For production use a permanent token from your Meta Business account.
