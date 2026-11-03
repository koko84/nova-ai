# NOVA AI

A responsive AI workspace starter built with Next.js App Router. It includes:
- AI assistant chat interface
- Writing, translation, business, idea and image-prompt tools
- Responsive desktop/mobile layout
- PWA manifest for installable web-app behavior
- Server-side AI API route (API key stays on the server)
- Local recent-prompt history
- Privacy, Terms, About, How to Use, Contact and Plans pages
- NOVA AI support contact: karim071984@gmail.com

## Requirements
- Node.js 20.9+
- npm

## Run locally
1. Extract the ZIP.
2. Open a terminal in the project folder.
3. Run `npm install`.
4. Copy `.env.example` to `.env.local`.
5. Add your AI provider API key to `OPENAI_API_KEY` in `.env.local`.
6. Run `npm run dev`.
7. Open http://localhost:3000.

Without an API key, the interface runs and the chat route returns a setup message rather than a live model response.

## Production checklist
This source package is a working application foundation, not a deployed commercial SaaS. Before public launch, configure:
- AI provider billing, rate limits, abuse protection and usage monitoring
- Real user authentication and database persistence
- Subscription checkout, invoices, refunds and webhook verification
- Image-generation provider integration (the current Image Studio creates prompts)
- File upload/storage, privacy policy, terms, cookie/consent requirements
- Email verification, password reset, account deletion and support
- Monitoring, backups, security review, accessibility and load testing
- HTTPS hosting and production domain

Do not expose secret API keys in browser code or commit `.env.local`.

## Mobile
The app includes a web manifest and responsive UI. Once deployed over HTTPS, supported browsers can install it to a home screen. This is a PWA, not a signed Play Store or App Store binary.


## Important launch notes

The informational pages are starter drafts, not legal advice. Review and adapt the Privacy Policy and Terms to the exact deployed services, data flows, retention periods, age rules, advertising SDKs and payment providers before launch. The Plans page is informational only: subscription billing is not implemented.

Google AdMob is not included in this Next.js/PWA starter. AdMob is intended for supported native mobile app integrations; a production Android app needs a native Android layer or suitable supported integration, real AdMob app/ad unit IDs, consent and privacy disclosures, test ads during development, and policy review. Do not use placeholder IDs in a release. The project is not yet a signed Android App Bundle/APK and Play Store approval cannot be guaranteed.

See `docs/PLAY_STORE_ADMOB_SETUP.md` for the remaining release checklist.
