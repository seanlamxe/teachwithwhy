# TeachWithWhy · 教得有據

A desktop-first, bilingual teaching-design tool for Hong Kong primary and secondary educators. Explore evidence, adapt an activity, and return with classroom observations.

**Status:** working bilingual UI, built-in and downloadable user guides, rule-based samples, browser storage and backup restore, and server-side DeepSeek/OpenAI integration code. Real paid-provider calls require the owner’s API key and credit. Do not describe an unconfigured deployment as a live AI service.

## Brand and migration

**TeachWithWhy · 教得有據** connects education research, a small classroom trial and teacher reflection. The interface uses Hong Kong Traditional Chinese and natural Cantonese classroom prompts. Existing records and language preferences in this browser, and backups exported under the previous product name, remain readable. Changing the website domain creates a new browser storage origin: export records from the old address and import them at the new address.

## Routes

- `/`: one shared website URL with in-place Traditional Chinese / English switching. The URL does not change and the browser remembers the language.
- `/zh/` and `/en/` remain compatibility entry points and normalise to `/`.
- User guide: choose **User guide / 使用說明** in the sidebar; Markdown downloads are under `/docs/`.
- `/api/status`: safe configuration status.
- `/api/ai`: authenticated planning / reflection endpoint.

## Run locally

Use Node.js 22. The project has no external runtime dependencies.

```sh
cp .env.example .env.local
# Fill private values in .env.local using your own editor.
npm run build
npm run dev
```

Open `http://127.0.0.1:4173/` and switch language in the header. Without keys, sample mode remains available and the AI status accurately says it is not configured.

```sh
npm test
```

## Configure real AI

Set private server-side environment variables:

```text
AI_PROVIDER=deepseek
DEEPSEEK_API_KEY=<your private key>
DEEPSEEK_MODEL=deepseek-flash
APP_ACCESS_CODE=<a private pilot code of at least 12 characters>
AI_LIVE_SEARCH=true
AI_MAX_REQUESTS_PER_HOUR=20
```

The default alias was verified in official docs on 2026-11-03 as DeepSeek-V4.1-Flash-1017. To use the documented Pro alternative, set `DEEPSEEK_MODEL=deepseek-v4-pro`. Availability and billing depend on the provider account; recheck official docs before changing the model.

DeepSeek makes one Search API request and one model request for a successful planning operation. Search results are restricted to selected educational / official domains before use. Search failure stops the operation instead of masquerading as a successful live search. Returned sources indicate whether content is a reviewed summary, page excerpt, search summary, or metadata. Citation membership checks do not prove that every claim is entailed by a source; teacher review is required.

Optional GPT alternative: set `AI_PROVIDER=openai`, `OPENAI_API_KEY`, and `OPENAI_MODEL=gpt-6.1-sol`. It uses Responses API web search followed by JSON generation. Title-only web discoveries cannot be cited as evidence findings; the curated reviewed summaries remain available. No automatic cross-provider failover sends user data to a second provider.

## Publish

See [deployment instructions](docs/deployment.md). Publish source to a public GitHub repository, then import that repository into Vercel. This is the standard GitHub → Vercel workflow. The private Sites prototype is a separate preview; static Sites hosting alone does not run the Vercel API function.

## Product boundaries

- Focus: classroom participation and discussion, not all teaching problems.
- Four age bands; teacher judgement is needed for individual learners.
- Browser-local records, not cloud accounts or cross-device sync.
- Saved original content is not automatically translated by changing the UI language.
- The curated library contains two EEF reviews. Source age, population, outcome measures and limitations are visible.
- Activities are proposals, not validated interventions or official curriculum certification.
- A local reflection does not establish learning gains or causality.

## Privacy and operations

Do not submit pupil-identifying details. AI submissions send classroom descriptions or explicitly confirmed reflections to the configured provider. Third-party data terms apply. Provider keys remain server-side. The teacher pilot code is stored for the browser session, not the model API key.

An owner-set pilot code is required before billable calls. A bounded in-memory limiter reduces accidental repeated requests **per running instance**; it is not a distributed quota or hard spend cap. For a wider public service, use platform-level rate limits, provider spend controls, proper accounts, and a durable distributed quota before opening paid access broadly. Do not publish a live API key without access control.

Do not log request bodies or secrets. `.env*`, `.vercel`, and local artifacts are excluded from Git. When publishing to GitHub, also exclude the private Sites `.openai` identity directory and `.git` history; use a clean source export.

## Evidence and documentation

- [EEF collaborative learning review](https://educationendowmentfoundation.org.uk/education-evidence/teaching-learning-toolkit/collaborative-learning-approaches)
- [EEF oral language review](https://educationendowmentfoundation.org.uk/education-evidence/teaching-learning-toolkit/oral-language-interventions)
- [DeepSeek models and API](https://api-docs.deepseek.com/)
- [DeepSeek Search & Fetch](https://api-docs.deepseek.com/guides/search/)
- [OpenAI web search](https://developers.openai.com/api/docs/guides/tools-web-search)
- [Vercel Node.js functions](https://vercel.com/docs/functions/runtimes/node-js)

This project is independent and has no endorsement from these organisations. No open-source licence has been selected yet; public visibility alone does not grant a software licence. Review licensing before distributing derivative works.
