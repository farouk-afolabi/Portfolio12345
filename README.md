# Farouk Afolabi — Developer Portfolio

Live site: [faroukafolabi.com](https://faroukafolabi.com)

A full-stack developer portfolio built with React and a Node.js/Express backend, featuring an AI-powered chatbot, a working contact form, and a downloadable resume.

---

## Tech Stack

### Frontend
| Tool | Purpose |
|---|---|
| React 19 + Vite | UI framework and build tool |
| Emotion (CSS-in-JS) | Component-scoped styling with theme tokens |
| Framer Motion | Page and section animations |
| React Router v7 | Client-side routing |
| React Icons | Icon library (Feather icons) |
| ESLint | Code linting |

### Backend
| Tool | Purpose |
|---|---|
| Node.js + Express | REST API server |
| OpenAI SDK (gpt-4o-mini) | AI chatbot responses |
| Resend | Transactional email delivery for contact form |
| express-rate-limit | Rate limiting (10 requests / 15 minutes) |
| CORS | Origin whitelist (faroukafolabi.com + localhost) |
| dotenv | Environment variable management |

---

## Sections

| Section | Description |
|---|---|
| **Hero** | Name, title, animated code terminal visual, Download Resume + View Projects CTAs, social links |
| **About** | Background story, achievement cards (Academic Excellence, Engineering Foundation, Community Impact, AI-Integrated Applications) |
| **Experience** | Timeline of work history — IT Support, Technology Tutor, Security Guard |
| **Skills** | Categorised skill grid — Frontend, Backend, Databases, DevOps, Tools |
| **Projects** | 5 deployed full-stack projects with tech tags, GitHub links, and live demo links |
| **Contact** | Contact form (powered by Resend) + direct contact details |
| **Footer** | Nav links, social icons, copyright |
| **AI Chatbot** | Floating chatbot powered by OpenAI gpt-4o-mini, trained on Farouk's full background |

---

## Features

**Frontend**
- Fully responsive — mobile, tablet, desktop
- Consistent dark/light theme via Emotion theme tokens
- Smooth scroll navigation with animated section reveals
- Animated mobile menu
- Resume download button in Hero and Navbar (`/resume.pdf`)
- Hero right column: animated code terminal visual

**Backend — `/api/chat`**
- POST endpoint receives a user message
- Sends message + detailed system prompt (Farouk's full profile) to OpenAI gpt-4o-mini
- Returns AI-generated response
- Rate limited to prevent abuse

**Backend — `/api/contact`**
- POST endpoint validates name, email, message fields
- Sends formatted HTML email to `afolabifarouk99@gmail.com` via Resend
- Sets `reply_to` to the sender's email so replies go directly to them
- Returns success/error JSON

---

## Project Structure

```
Portfolio12345/
├── public/
│   ├── images/          # Project screenshots
│   └── resume.pdf       # Downloadable resume
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Experience.jsx
│   │   ├── Skills.jsx
│   │   ├── Projects.jsx
│   │   ├── Contact.jsx
│   │   ├── Footer.jsx
│   │   └── Chatbot.jsx
│   ├── styles/
│   │   ├── theme.js       # Design tokens (colours, spacing, fonts)
│   │   └── GlobalStyles.js
│   └── App.jsx
├── server/
│   ├── index.js           # Express server (chat + contact endpoints)
│   ├── package.json
│   └── .env               # RESEND_API_KEY, OPENAI_API_KEY, PORT
├── resume_src.html        # Resume source — edit and regenerate PDF with Chrome headless
└── package.json
```

---

## Environment Variables

### Server (`server/.env`)
```
OPENAI_API_KEY=your_openai_api_key
RESEND_API_KEY=your_resend_api_key
PORT=5000
```

### Render (production)
Set the same variables in your Render service → Environment tab.

---

## Regenerating the Resume PDF

Edit `resume_src.html` then run:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --disable-gpu --no-sandbox \
  --print-to-pdf="public/resume.pdf" \
  --print-to-pdf-no-header --no-pdf-header-footer \
  "file://$(pwd)/resume_src.html"
```

---

## Deployment

**Frontend**
- Hosted at [faroukafolabi.com](https://faroukafolabi.com)
- Deployed via GitHub Actions to GitHub Pages on push to `master`

**Backend**
- Hosted on [Render.com](https://render.com)
- Auto-deploys from GitHub on push to `master`
- Backend URL: `https://portfolio12345-backend.onrender.com`

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Health check |
| POST | `/api/chat` | AI chatbot — body: `{ message }` |
| POST | `/api/contact` | Contact form — body: `{ name, email, subject, message }` |

---

## Contact

- Email: [afolabifarouk99@gmail.com](mailto:afolabifarouk99@gmail.com)
- LinkedIn: [linkedin.com/in/farouk-afolabi](https://www.linkedin.com/in/farouk-afolabi/)
- GitHub: [github.com/farouk-afolabi](https://github.com/farouk-afolabi)
- Portfolio: [faroukafolabi.com](https://faroukafolabi.com)
