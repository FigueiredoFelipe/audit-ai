# AuditAI – Intelligent Content Auditing and Analysis Platform

AuditAI is a fullstack project that performs smart analysis on documents, messages and URLs.
It integrates with Google Gemini LLM to detect fraud patterns, legal risks, offensive language, and contract inconsistencies.

## ✅ Current State

The project includes a fully functional Angular frontend and a NestJS backend with the following features implemented and tested:

### ✔️ Frontend (Angular 18)

- Angular Material UI and standalone components
- NGRX Store and Devtools (version 18)
- Form for text analysis using HTTPClient
- Routing configured with lazy-loaded `AnalyzeFormComponent`
- Working build using `ng build`
- Form dynamically calls backend routes (`/analysis/offensive`, `/clause`, `/confession`)
- CSS improved with scroll fix on result panel

### ✔️ Backend (NestJS)

- Gemini prompt execution service
- Endpoints:
  - `POST /analysis/offensive`
  - `POST /analysis/clause`
  - `POST /analysis/confession`
- Validated DTOs for each request type
- Works locally (`npm run start:dev`) with correct logging

## 🛠 Stack (100% Free Tier)

- **Frontend**: Angular + Tailwind CSS (Vercel or Netlify)
- **Backend**: NestJS (Vercel or Render)
- **Auth & DB**: Firebase Auth + Firestore + Storage
- **LLM**: Google Gemini Pro
- **Maps**: Mapbox (planned)
- **Tests**: Jest + Cypress (planned)
- **CI/CD**: GitHub Actions (planned)

## 🚀 How to Run

### 1. Clone & Install

```bash
git clone https://github.com/your-username/auditai.git
cd auditai
npm install
```

### 2. Environment Variables

Create a `.env` file in the root with the following content:

```
GEMINI_API_KEY=your_gemini_key
FIREBASE_API_KEY=your_firebase_key
...
```

### 3. Run Dev Mode

```bash
# Frontend
cd frontend
npm install
ng serve

# Backend
cd backend
npm install
npm run start:dev
```

## 📦 LLM Service (NestJS)

Integrates with Google Gemini using `HttpService`. Check `llm.service.ts` in `/src/analysis`.

## 🧪 Planned Features

- File upload (PDF, DOCX, etc.)
- Firebase Auth integration
- Storage and history of analyses
- Visual report generator with downloadable PDFs
- Semantic and syntactic text analysis

## 📄 License

MIT
