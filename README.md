# AuditAI – Intelligent Content Auditing and Analysis Platform

AuditAI is a fullstack project that performs smart analysis on documents, messages and URLs. It integrates with Google Gemini LLM to detect fraud patterns, legal risks, offensive language, and contract inconsistencies.

## 🛠 Stack (100% Free Tier)

- **Frontend**: Angular + Tailwind CSS (Vercel or Netlify)
- **Backend**: NestJS (Vercel or Render)
- **Auth & DB**: Firebase Auth + Firestore + Storage
- **LLM**: Google Gemini Pro
- **Maps**: Mapbox
- **Tests**: Jest + Cypress
- **CI/CD**: GitHub Actions

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

### 3. Run Dev
```bash
# Frontend
cd frontend && npm start

# Backend
cd backend && npm run start:dev
```

## 📦 LLM Service (NestJS)
Integrates with Google Gemini using `HttpService`. Check `llm.service.ts` in `/src/analysis`.

## ✅ Tests
```bash
# Unit tests
npm run test

# e2e tests
npm run test:e2e
```

## 📄 License
MIT
