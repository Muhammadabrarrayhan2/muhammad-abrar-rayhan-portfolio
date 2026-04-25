# Muhammad Abrar Rayhan — Research Portfolio

Personal portfolio website showcasing research, projects, experience, publications, and an AI-assisted multilingual chatbot interface.

🔗 **Live:** [muhammad-abrar-rayhan-portfolio.vercel.app](https://muhammad-abrar-rayhan-portfolio.vercel.app)

---

## Overview

A single-page academic portfolio built for presenting research interests, selected publications, professional experience, and technical projects. Features an embedded AI chatbot that answers visitor questions about my background in real time — with automatic language detection and multilingual replies.

## Features

- **Responsive Design** — Clean, paper-textured aesthetic with scroll animations; optimized for desktop and mobile
- **AI Chatbot Assistant** — "Ask about me" chatbot powered by Google Gemini 2.0 Flash via a secure Vercel Serverless Function
- **Multilingual Support** — Auto-detects visitor language (English, Bahasa Indonesia, Japanese, Chinese, Spanish, French, etc.) and responds accordingly
- **Publications Section** — 5+ research papers in ML, medical AI, cloud security, and model robustness
- **Interactive Timeline** — Professional experience displayed with a visual timeline
- **Project Showcase** — Curalyta (Clinical AI), ArtFrame (Media Forensics), COVID-19 ML Analysis, Geospatial Healthcare Indonesia

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Typography | Fraunces, Newsreader, JetBrains Mono (Google Fonts) |
| AI Backend | Google Gemini 2.0 Flash API |
| Serverless | Vercel Serverless Functions (Node.js) |
| Hosting | Vercel |

## Project Structure

```
├── index.html          # Main portfolio page (single-page app)
├── vercel.json         # Vercel routing & function configuration
├── README.md
└── api/
    └── chat.js         # Serverless proxy — routes chat to Gemini API
```

## Setup & Deployment

### 1. Clone the repository

```bash
git clone https://github.com/Muhammadabrarrayhan2/muhammad-abrar-rayhan-portfolio.git
cd muhammad-abrar-rayhan-portfolio
```

### 2. Get a Gemini API Key

- Go to [Google AI Studio](https://aistudio.google.com/apikey)
- Click **Create API Key**
- Copy the key

### 3. Deploy to Vercel

- Import this repo on [vercel.com](https://vercel.com)
- Go to **Settings → Environment Variables**
- Add:
  - Name: `GEMINI_API_KEY`
  - Value: *(your API key)*
- Deploy — the chatbot will work automatically

### 4. Local Development (optional)

To test the serverless function locally, install the Vercel CLI:

```bash
npm i -g vercel
vercel env pull        # pulls environment variables
vercel dev             # runs local dev server with serverless functions
```

## How the Chatbot Works

```
Visitor sends message
        │
        ▼
  Frontend (index.html)
  POST /api/chat { messages, system }
        │
        ▼
  Vercel Serverless Function (api/chat.js)
  - Converts message format to Gemini API format
  - Sends request to Google Gemini 2.0 Flash
  - Converts response back to frontend format
        │
        ▼
  Chatbot displays reply
```

The system prompt contains all portfolio data (bio, publications, experience, skills, awards). The API key is securely stored in Vercel environment variables and never exposed to the client.

## Research Interests

- Machine Learning
- Robust & Reliable AI Systems
- Secure ML & Adversarial Robustness
- AI Systems & Scalable ML Infrastructure
- Data Science & Geospatial Analytics

## Contact

- **Email:** abrarrayhan8@gmail.com
- **LinkedIn:** [muhammad-abrar-rayhan](https://www.linkedin.com/in/muhammad-abrar-rayhan)
- **GitHub:** [Muhammadabrarrayhan2](https://github.com/Muhammadabrarrayhan2)

---

© 2026 Muhammad Abrar Rayhan · Built with care in Jakarta, Indonesia
