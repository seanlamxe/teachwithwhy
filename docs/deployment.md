# TeachWithWhy 0.5 — GitHub → Vercel

## Publish the prepared revision

The existing project is `teachwithwhy` in Vercel team `sean-2e37`, connected to `seanlamxe/teachwithwhy` on GitHub. Publishing to its connected `main` branch triggers an automatic production deployment.

Use the clean source archive or review the branch before pushing. Include `.env.example`, `.gitignore`, `api`, `lib`, `dist`, `docs`, `scripts`, `tests`, `package.json` and `vercel.json`. Exclude private keys, user backups, `.git`, `.openai`, `.vercel` and `.env.local`.

Keep the Vercel build settings: Other framework; Node.js 22; build command `npm run build`; output directory `dist`. `api/index.js` handles `/api/*` through the existing rewrite.

## Connect AI without teacher setup

Recommended configuration:

```text
AI_PROVIDER=auto
AI_ENABLED=true
AI_GATEWAY_MODEL=deepseek/deepseek-v4.1-flash-1017
AI_LIVE_SEARCH=true
AI_MAX_REQUESTS_PER_HOUR=5
AI_MAX_TOTAL_REQUESTS_PER_HOUR=60
```

Vercel AI Gateway can authenticate with the project's runtime OIDC identity, avoiding a separate provider key. Confirm that this is available for the actual project. If it is not, the owner can configure `AI_GATEWAY_API_KEY` privately. A direct DeepSeek or OpenAI key is also supported. Do not send credentials in chat or commit them to GitHub.

Remove the old forced `AI_PROVIDER=deepseek` if there is no valid DeepSeek key and you want Gateway. No teacher trial code is required; `APP_ACCESS_CODE` is ignored since v0.4.

Gateway mode reads the fixed reviewed EEF pages live before generating. It does not search the whole web. Direct-provider modes retain web search. `AI_LIVE_SEARCH=false` explicitly selects curated summaries only; the UI and results reflect that.

## Check the account credit first

Teachers use all current features free of charge. AI consumes provider credit. Check Gateway free-tier eligibility, remaining credit and model access in the Vercel account. Do not buy credits, change plan or enable automatic top-up unless the owner chooses to. If the account already has top-ups or paid usage enabled, the app cannot independently guarantee a zero bill.

The code's counters are per instance and are not durable site-wide spend caps. Set provider budgets before public use. `AI_ENABLED=false` disables AI while leaving the rest of the site usable.

## Verify after deployment

1. Confirm Vercel shows Ready for the intended commit.
2. Open the production URL without signing in, and switch language in place.
3. The homepage should directly show the activity form. Enter a topic and use an optional quick-fill need; there should be no library or mandatory comparison page.
4. Open `/api/status`: `accessCodeRequired` is false. `configured` only means authentication is present, not that a real model request passed.
5. Use a fictional classroom example, consent, and generate once. Check actual provider success, model, timestamp and live-source mode. A learning goal, teacher prompts, pupil task and quick check must be present. No teacher code should be requested.
6. Check credit and usage-limit errors. Blocked source pages must be labelled as unsuccessful live retrieval while AI uses reviewed summaries; samples remain available.
7. Edit the prompts, copy the activity, save, export/import an old backup and print in all three languages. Research notes should be collapsed until requested.

The local automated checks use mock model responses. A live call has not been verified until the deployed request succeeds.

## 香港中文簡明步驟

1. 由你把新版原始碼更新到 GitHub，再讓現有 Vercel 項目部署。
2. 選用 `AI_PROVIDER=auto`，優先確認 Vercel 項目身分認證及 AI Gateway 免費額度。
3. 教師毋須註冊、密鑰或試用碼。若身分認證不可用，只需網站管理員一次設定伺服器端密鑰。
4. 先用虛構課堂資料實測一次 AI，再分享網址。
5. 免費供教師使用不代表無限 AI。額度用盡時暫停生成，其他功能照常使用。

## API Key route / 使用 API Key

For the simplest owner-configured route, set `AI_PROVIDER=deepseek` and `DEEPSEEK_API_KEY` in Vercel’s private production environment variables, then deploy. Keep the value secret. Visitors do not supply a key or a code. A valid provider balance is still required. OpenAI uses `AI_PROVIDER=openai` plus `OPENAI_API_KEY`; Gateway uses `AI_PROVIDER=gateway` plus `AI_GATEWAY_API_KEY`. See [API contract](api.md).

最直接的方式是在 Vercel 私密環境變量設定 `AI_PROVIDER=deepseek` 及 `DEEPSEEK_API_KEY`，再部署。管理員設定一次，教師便可直接使用；不在前台收集密鑰。模型帳戶仍須有可用額度。

## v0.5 build and release

Install pinned dependencies with the package manager declared in package.json (pnpm). `pnpm install --frozen-lockfile`, `pnpm test`, then `pnpm run build`. The build copies pinned OpenCC/fflate browser modules and licence notices into `dist/vendor`; they are generated and are not committed. No third-party CDN is needed at runtime. The Word worker reads only the bounded main document XML; text is previewed in the browser before consented AI analysis.

Smoke-check all three interface languages, curriculum/stage subjects, a real `.docx` containing body/table text, favorite filtering, prompt reuse, multiple reflection snapshots and backup import/export. Use fictional data for live AI parse/generation checks. Do not upload real pupil data or disclose credentials.

## Complete previews rather than partial uploads

Work on an `internal-*` branch. The tracked `git.deploymentEnabled` rule prevents automatic deployments for those staging branches while files are being synchronised. Once the complete source passes checks, create a `release-*` branch from that exact commit for a single complete preview. Merge that release branch to `main` after preview checks. Production auto-deployment is retained. This avoids failed previews caused by partially uploaded files; it does not suppress error reporting for actual releases.

## Phone Home Screen support

The mobile help strip is the first visible control at widths up to 720px. The guide starts with iPhone Safari and Android Chrome instructions in all three languages. The build generates 180/192/512 PNG icons and the app links a same-origin web manifest with standalone display. No service worker or offline AI is provided. Home Screen installation still requires a browser/device check; responsive desktop QA does not verify a native phone install.

On mobile, all editable controls (including plan text and shortcut names) use at least 16px text to reduce iOS focus-triggered zoom. The viewport keeps user zoom enabled. Verify actual Safari keyboard behaviour on a phone; responsive desktop testing can verify computed sizes but cannot reproduce native iOS keyboard zoom.
