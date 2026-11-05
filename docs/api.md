# Server-side AI contract

Teachers use the same browser workflow regardless of the configured provider. The owner supplies credentials once through private server environment variables. No key is accepted from the browser.

| Provider | AI_PROVIDER | Private variable | Model override |
| --- | --- | --- | --- |
| DeepSeek direct | deepseek | DEEPSEEK_API_KEY | DEEPSEEK_MODEL |
| OpenAI direct | openai | OPENAI_API_KEY | OPENAI_MODEL |
| Vercel AI Gateway | gateway | AI_GATEWAY_API_KEY, or platform runtime identity | AI_GATEWAY_MODEL |
| Configured selection | auto | Selects DeepSeek key, then OpenAI key, otherwise Gateway | Corresponding override above |

Do not put these variables in client bundles, localStorage, query strings, documentation screenshots or public Git. Use `.env.local` only for local development. Owner credentials are never returned by an endpoint.

## GET /api/status

Returns configuration booleans and non-secret model metadata, including `configured`, `provider`, `model`, `liveSearch`, `retrievalMode`, `freeAccess: true` and `accessCodeRequired: false`. `configured` means authentication is available, not that a real model call passed. No live inference occurs for a status check.

## POST /api/ai

Use `Content-Type: application/json`. No model key, teacher code or payment field is accepted. The classroom form collects consent before calling this endpoint.

```json
{
  "action": "plan",
  "lang": "zh",
  "consent": true,
  "draft": {
    "level": "upper",
    "subject": "中國語文",
    "students": 30,
    "minutes": 12,
    "topic": "故事人物的選擇",
    "problem": "只有幾位同學回答。",
    "goal": "每位同學提出一個想法及理由。",
    "strategy": "auto",
    "constraints": ["seats"]
  }
}
```

`lang` supports `zh` and `en`. Levels: `lower`, `upper`, `junior`, `senior`. Strategies: `auto`, `think`, `joint`, `reason`. Topic, prior-learning/problem context and the teacher’s goal are required. The returned goal preserves the teacher’s exact stated goal. Student count is 2–60; duration is 5–30 minutes. `consent: true` is required. Do not include identifying pupil data.

Successful plans contain `origin: ai`, `provider`, `model`, `generatedAt`, goal, learningRationale, prerequisiteCheck, evaluation, steps, teacherPrompts, studentTask, exitCheck, observations, evidence and source metadata. Each evidence entry separates the supported finding, the proposed classroom application and the limitation. Gateway requests may fall back from blocked live research pages to reviewed summaries, with `search.completed: false`, `search.mode: curated-summary` and an explicit warning. The model still generates the activity; this is not a rule-based sample.

`evaluation` requires `lookFor`, `recordHow`, `continueWhen`, `adjustWhen`, and `tryDifferentWhen`; missing pedagogical checks reject the model response instead of inventing a replacement. Structural validation does not guarantee educational quality; teacher review is required.

For `action: reflect`, include the same draft plus `reflection` with `observation`, `difficulty`, `next` and `participation`. The UI also includes `planContext` (goal, exitCheck, evaluation) and asks for separate confirmation before sending reflection notes. These fields are treated as untrusted data.

Typical errors: missing authentication or disabled AI (503), invalid input/consent (400), usage limit (429), provider authentication/credit/network or invalid output (502). Samples run in the browser and remain available without AI. Rate counters are per instance, not durable global budgets.
