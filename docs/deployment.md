# GitHub → Vercel deployment

## 1. Publish the clean project source to GitHub

Create a public repository named `teachwithwhy` (or another available name) in your own GitHub account. Upload the clean source export, including `api`, `lib`, `dist`, `docs`, `scripts`, `tests`, `package.json`, `vercel.json`, `.gitignore`, and `.env.example`.

Exclude `.git`, `.openai`, `.vercel`, `.env.local`, actual credentials, test downloads, user backups, archives and local runtime state. The clean export contains no real API key and does not include the private Sites repository identity.

Do not commit a model key and later delete it: Git history can retain it. Configure secrets only through Vercel’s environment-variable settings.

## 2. Import the repository into Vercel

Use **Add New → Project → Import Git Repository** and select the GitHub repository. Keep:

- Framework preset: Other.
- Node.js: 22.x.
- Build command: `npm run build`.
- Output directory: `dist`.
- API function: `api/index.js` with rewrites from `vercel.json`.

Only proceed with a free plan or an existing authorised plan. Do not accept unrequested paid upgrades.

## 3. Configure private environment variables

```text
AI_PROVIDER=deepseek
DEEPSEEK_API_KEY=<a funded DeepSeek API key>
DEEPSEEK_MODEL=deepseek-flash
APP_ACCESS_CODE=<a unique private pilot code, at least 12 characters>
AI_LIVE_SEARCH=true
AI_MAX_REQUESTS_PER_HOUR=20
```

Apply secrets to the intended environment (Production, and Preview only if desired). Use the platform’s sensitive-value settings where available. Do not print keys in logs or screenshots. Redeploy after changing environment variables.

Without an API key, credit and pilot code, the site can still demonstrate samples and documentation but cannot truthfully be described as operational live AI.

## 4. Verify the deployment

1. Open the actual returned Vercel domain, and switch language in the header at the same URL.
2. Check English labels, user guide and error states, not just page headings.
3. Open `/api/status`; expect `configured: true` only when the server key and sufficiently long pilot code are present. This status does not test the key’s validity.
4. Enter the pilot code in About & connection.
5. Use a fictional classroom example, enable consent and generate an activity.
6. Verify actual provider success, generation time, retrieved sources, and citation handling.
7. Test save, print, export and restore in both locales.
8. Check provider spend controls before sharing paid access more widely.

In-memory request limiting is not a distributed spend cap. Keep the paid endpoint pilot-code-protected until durable access controls and quotas are in place.

## 5. Public portfolio links

Share the actual public GitHub repository URL and the single verified Vercel URL, which supports both interface languages. Do not substitute a private Sites link for a Vercel deployment, and do not invent URLs before they have been created.

## 中文簡明步驟

1. 在自己的 GitHub 建立公開儲存庫，上傳乾淨原始碼。
2. 在 Vercel 匯入該儲存庫，套用專案內的 `vercel.json`。
3. 在私密環境變量填入 DeepSeek API 密鑰及試用碼；不要在聊天或 GitHub 貼密鑰。
4. 重新部署，使用虛構課堂資料實測 AI 與聯網來源。
5. 分享已驗證的單一 Vercel 網址（站內切換中英文）及 GitHub 網址。

GitHub／Vercel 登入授權、模型帳戶與有效密鑰必須由帳戶持有人提供。API 開放權重不代表託管服務免費。
