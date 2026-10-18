# CiviLens — Smart Civic Issue & RTI Assistant

CiviLens uses a React/TypeScript/Vite frontend and a local FastAPI + SQLite backend. Gemini API integration is included for professional complaint/RTI drafting when a key is configured; a rule-based fallback remains available if no key is set or Gemini is unavailable. It does not automatically submit applications to government portals.

## Requirements
- Node.js 20+ (Node 22 LTS is fine)
- Python 3.10+

## Configure Gemini drafting (recommended)
1. Create a Gemini API key in Google AI Studio.
2. In `backend`, copy `.env.example` to `.env` and replace `your_gemini_api_key_here` with your key.
3. Keep the key in the backend only. Never put it in `frontend/.env`, React code, screenshots, or GitHub.
4. Install backend dependencies, then run the server as below. The backend loads `backend/.env` automatically if `python-dotenv` is installed; otherwise set `GEMINI_API_KEY` in your terminal environment before starting the server.

## Run the backend (Terminal 1)
Open a terminal at the project root (`CiviLens`) and run on Windows PowerShell. These commands need no repository or Git setup:

```powershell
cd backend
py -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

If PowerShell blocks activation, you can skip activation and use the Python executable directly after installing dependencies with your chosen Python environment. The backend creates `backend/civilens.db` automatically. API docs are at http://127.0.0.1:8000/docs and health check is http://127.0.0.1:8000/api/health.

## Run the frontend (Terminal 2)
From the project root (not the `backend` folder):

```powershell
npm install
npm run dev
```

Open the local URL Vite prints, normally http://localhost:5173.

The frontend defaults to `http://127.0.0.1:8000/api`. To change it, copy `.env.example` to `.env` and update `VITE_API_BASE_URL`.

## Included backend features
- Rule-based department recommendations using the curated dataset in `backend/data/department_dataset.json`.
- Integrated readiness checklist for clarity, location, dates/duration and a specific request.
- Gemini-assisted formal RTI and civic complaint drafting (API key configured on backend); local rule-based fallback if unavailable. Applicant contact details are inserted locally and are not sent to Gemini.
- SQLite draft create/list/search/update/delete.
- SQLite RTI tracker create/list/search/update/delete, Ready to submit / filed statuses, filing/reference/follow-up details, notes and reply tracking.
- Upload, list and download supporting PDF, image, text and document files for RTI records (10 MB per file).
- Save an editable RTI draft as a tracker record; manual civic location entry works without a map provider or API key.
- Dashboard, transparency explainer and department directory/insights are separate views; transparency indicators are labelled illustrative, not official statistics.
- Rule-based RTI reply signal analyzer.
- RTI guidance and dashboard activity counts.

## Data and privacy
- The department dataset is a curated keyword taxonomy, not an empirical performance dataset. It does not guarantee local responsibility. Confirm the responsible authority in your state/locality.
- All draft and tracker data is stored in the local SQLite file `backend/civilens.db` by default.
- Do not commit the SQLite database or real personal information to source control.
- Sources and dataset limitations are documented in `backend/data/sources.md`.
- No information is automatically submitted to a government portal.

## Troubleshooting
- `Cannot reach the CiviLens backend`: confirm Terminal 1 is still running on port 8000.
- `Address already in use`: stop the existing backend process or run it on another port and set `VITE_API_BASE_URL` accordingly.
- If the backend dependency install fails, confirm Python and pip work with `py --version` and `py -m pip --version`.
