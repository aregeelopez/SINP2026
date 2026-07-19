# Spanish Interpreter's Note Pad (SINP)

**Take better notes. Verify numbers instantly. Never lose a term mid-session.**

A distraction-free PWA built by an interpreter, for interpreters — covering medical, health insurance, auto insurance, financial, cultural nuance, and customer service domains.

[Get SINP — $49](https://raulopez7.gumroad.com/l/aregee-insights-SINP)
### by aregee insights

A professional bilingual workspace built specifically for Spanish medical interpreters. SINP runs in the browser as a Progressive Web App (PWA) — no installation required, works offline, and installs to your desktop in one click.


**Purchase:** [raulopez7.gumroad.com/l/aregee-insights-SINP](https://raulopez7.gumroad.com/l/aregee-insights-SINP)

---

## Features

- **📖 EN ↔ ES Glossary** — 6,000+ bilingual terms covering 20+ medical specialties - including Cardiology, OB/GYN, Oncology, Neurology, Mental Health, and Medications - plus glossaries for Health Insurance, Auto Insurance, Financial, Cultural Nuances, and Customer Service terminology. Search and filter by category.
- **🎧 Interpreter Protocol** — Full protocol cheat sheet covering all 13 sections: Opening, Core Rules, Intervention, Transparency, Flow Management, Role Boundaries, Note-Taking, Professional Delivery, Work Environment, Hold Time Policy, Special Scenarios, VRI Protocol, and Closing. Searchable accordion format.
- **🔢 Number Verification** — Automatically extracts numbers from your notes including alphanumeric IDs for quick side-by-side verification.
- **💊 Pain Assessment** — 10-point pain scale with bilingual labels plus 36 pain descriptors in English and Spanish. Click any descriptor to append directly to your notes.
- **📝 Notes Editor** — Clean, distraction-free notepad built for fast note-taking during live sessions.
- **🔥 Shred Session** — Instantly wipes all notes at the end of a session. HIPAA-aligned.
- **PWA** — Installs to desktop or home screen, works offline.

---

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Hosting:** Vercel
- **Styling:** Tailwind CSS + CSS custom properties
- **Language:** TypeScript
- **Distribution:** Gumroad

---

## Project Structure

```
app/
├── components/
│   ├── GlossarySidebar.tsx        # EN→ES glossary with search + category filter
│   ├── NotesEditor.tsx            # Main notes workspace
│   ├── NumberVerification.tsx     # Auto-extracts and verifies numbers from notes
│   ├── PainAssessment.tsx         # Pain scale + descriptors
│   ├── ProtocolCheatSheet.tsx     # 13-section interpreter protocol reference
│   ├── ServiceWorkerRegistration.tsx
│   └── ShredModal.tsx             # Immediately shreds notes from the SINP 
├──── data/
│     ├── MedicalData.ts
│     ├── HealthInsuranceData.ts
│     ├── AutoInsuranceData.ts
│     ├── FinancialData.ts
│     ├── CulturalData.ts
│     └── CustomerServiceData.ts
├── lib/
|   └── extractVerificationTokens.ts
├── global.css
├── layout.tsx
└── page.tsx
public/
├── manifest.json
├── sw.js
├── icon-192.png
└── icon-512.png
```

---

## License & Ownership

Copyright © 2024 Raul Lopez / aregee insights. All rights reserved.

This software is proprietary and confidential. Unauthorized copying, distribution, or use of this software, in whole or in part, is strictly prohibited without express written permission from the copyright owner.
