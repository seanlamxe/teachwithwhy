# TeachWithWhy · 教得有據

A free teaching-design workspace in Hong Kong Traditional Chinese, Simplified Chinese and English for primary and secondary teachers across Hong Kong, mainland and international curriculum contexts. Describe your class and learning goal, generate an aligned activity and formative check, and use observations to decide what to retain or change.

## Version 0.6.0

- Mobile text-entry controls use at least 16px text while preserving pinch zoom.
- Mobile User guide and Home Screen instructions stay at the top. iPhone/Android setup is included in all three guides.
- A same-origin web manifest and generated app icons support Home Screen launch; AI still requires connectivity.
- Internal staging branches no longer trigger incomplete preview deployments. Release branches and main still deploy.


- Import `.docx` body/table text locally (5 MB / 20,000 characters), review and consent, then let AI suggest classroom fields before applying. No original file upload or OCR.
- Hong Kong, mainland and international subject starting points with stage-specific choices and custom school subjects.
- Favorite saved activities, filter them, and preserve changed reflection snapshots with earlier AI suggestions.
- Select up to three past reflections to inform a new plan; contextual follow-up is explicit and does not train a model.
- Save up to 30 custom prompt shortcuts. Version 4 backups include teaching setups, prompts, favorites and feedback, with older-backup support.
- Three-language in-page and downloadable guides are updated together.


- The homepage is the working form: year group, subject, topic, time, class size, prior learning/difficulties, goal and support. Original context questions remain in expandable settings. Generate directly without a mandatory strategy-comparison step.
- A draft preserves the teacher’s goal and contains its alignment rationale, a readiness check, timed sequence, teacher prompts, a pupil task, a goal-aligned formative check, a recording method and editable keep/adapt/change criteria. Teachers can edit, copy, print and save it.
- Only Design an activity and Saved activities are in the main navigation. Research findings, their classroom adaptation and limitations are expandable inside each output; there is no standalone static library.
- Free teacher access without accounts, subscriptions, API keys or pilot codes. The owner configures a provider once.
- DeepSeek through Vercel AI Gateway, with project identity authentication where available; direct DeepSeek and OpenAI integrations remain supported.
- Gateway mode retrieves the fixed reviewed EEF pages live. Direct-provider modes use web search. Source type, limitations and actual AI generation metadata are explicit.
- Browser-local records, PDF printing, three-language guides and old-backup compatibility.

**Verification:** provider contracts, consent, limits, error handling and retrieval are covered by tests with mock model responses. Production smoke check on 2026-11-05 successfully generated a Chinese-language, P5, 30-pupil, 12-minute activity using DeepSeek Flash and live search (one accepted source), with fictional class data. This verifies connectivity and output handling, not classroom effectiveness or general model quality. Account credit is still required.

## Run and check

Node.js 22. Pinned OpenCC and fflate browser dependencies are installed at build time; no external CDN is used.

```sh
cp .env.example .env.local
pnpm install --frozen-lockfile
pnpm run build
pnpm test
pnpm run dev
```

Open `http://127.0.0.1:4173/`. The interface switches between Hong Kong Traditional Chinese, Simplified Chinese and English at one URL. `/zh/`, `/zh-CN/` and `/en/` are compatibility entry points. Without usable server authentication, samples still work.

## AI configuration

The default `AI_PROVIDER=auto` chooses a configured DeepSeek key, then OpenAI key, otherwise Vercel AI Gateway. This is selection at configuration time, not automatic failover after a provider error.

On Vercel, the function can use the platform-injected runtime OIDC identity. Runtime header identity is only accepted when the host marks itself as Vercel; an arbitrary client header on a local host cannot configure AI. An owner can alternatively set `AI_GATEWAY_API_KEY` privately. Default model: `deepseek/deepseek-v4.1-flash-1017`, verified against the official model catalog on 2026-11-03. Do not put keys or OIDC tokens in browser code or public GitHub.

```text
AI_PROVIDER=auto
AI_ENABLED=true
AI_GATEWAY_MODEL=deepseek/deepseek-v4.1-flash-1017
AI_LIVE_SEARCH=true
AI_MAX_REQUESTS_PER_HOUR=5
AI_MAX_TOTAL_REQUESTS_PER_HOUR=60
```

For direct DeepSeek set `AI_PROVIDER=deepseek` and `DEEPSEEK_API_KEY`. For direct OpenAI set `AI_PROVIDER=openai` and `OPENAI_API_KEY`. Model keys stay server-side. See [official DeepSeek setup steps](docs/deepseek-setup-zh.md). `APP_ACCESS_CODE` is no longer used; teachers do not need a code. `AI_ENABLED=false` is the owner’s off switch.

## Free access and operating costs

Teachers are not charged. Inference may consume the owner's provider credit. Vercel documents limited recurring credits for eligible free-tier accounts; eligibility and balances must be checked on the actual account. Buying credit changes free-tier eligibility. No code in this project purchases credits or configures automatic top-ups.

Before enabling public use, check provider budgets and disable any unwanted automatic top-up. The IP and shared counters are in memory **per running instance**, not durable global quotas or hard spend caps. Multi-instance deployment can exceed these counters in aggregate. Larger usage needs durable quota enforcement and platform controls. Do not promise unlimited free AI.

## Research and privacy

Gateway retrieval only fetches the two fixed HTTPS URLs in the curated library, rejects redirects, caps response size, strips scripts and markup, and labels returned text as an excerpt. It is live page retrieval, not a whole-web literature search. If both source pages block retrieval, real AI generation uses the reviewed summaries and explicitly marks live retrieval as unsuccessful; it never fabricates search success. Direct providers keep their documented search routes. Sources and drafts still require teacher review.

Classroom descriptions, page text and observations are untrusted model input. No pupil-identifying details are needed. Consent is required before generation, with separate confirmation for reflection analysis. Local observations do not establish causality or learning gains. Existing browser records and old-name backups remain readable; moving domains requires backup import.

## Deployment and links

Follow [deployment instructions](docs/deployment.md). The clean source export excludes `.git`, `.openai`, `.env.local`, credentials and user records.

## Primary references

- [Vercel Gateway authentication](https://vercel.com/docs/ai-gateway/authentication-and-byok)
- [Vercel runtime OIDC](https://vercel.com/docs/oidc)
- [Gateway credit and pricing](https://vercel.com/docs/ai-gateway/pricing)
- [DeepSeek V4.1 Flash on Gateway](https://vercel.com/changelog/deepseek-v4-1-flash-now-available-on-ai-gateway)
- [EDB Assessment for Learning](https://www.edb.gov.hk/en/curriculum-development/assessment/about-assessment/assessment-for-learning.html)
- [EEF collaborative learning](https://educationendowmentfoundation.org.uk/education-evidence/teaching-learning-toolkit/collaborative-learning-approaches)
- [EEF oral language interventions](https://educationendowmentfoundation.org.uk/education-evidence/teaching-learning-toolkit/oral-language-interventions)

Independent prototype, without official endorsement. Public visibility alone does not grant an open-source licence.

## v0.6 · Reusable classroom planning

Browser-local named class/textbook setups retain common context without lesson content or consent. New AI output includes a knowledge progression and stage-level concept/task/bridge/check. The default view, copy and print are concise; full editable pedagogy and evidence remain in details. Reuse & improve clones a saved activity, offers its latest reflection for explicit selection, preserves the source and returns concrete revision notes. Backup v4 includes setups and accepts older backups. No cross-device sync or automatic model training.
