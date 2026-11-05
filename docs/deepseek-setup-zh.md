# DeepSeek 官方開通與網站接入

最後核對：2026-11-05。登入、付款、建立及貼入密鑰由帳戶持有人親自操作。

## 1. 到官方平台登入或註冊

開啟 [DeepSeek 開放平台 API Keys](https://platform.deepseek.com/api_keys)。如尚未登入，會先顯示登入頁。這是網站呼叫模型的開放平台。

## 2. 建立自己的 API Key

在「API keys／API 密鑰」建立新密鑰，可命名為 TeachWithWhy。把它保存在自己的密碼管理工具，或直接填入下述 Vercel 私密欄位。不要貼到聊天、教學網頁或 GitHub。

## 3. 為 API 帳戶充值

在平台的餘額／充值頁選擇合適金額。先按官方充值頁提供的小額選項測試，再按實際用量決定是否增加。Key 用來驗證身分；調用費用按模型用量扣除，搜尋與抓取亦有獨立計費。

不需要先購買另一個聊天應用程式的會員方案來接入這個網站。

## 4. 填入 Vercel 的私密設定

開啟 [TeachWithWhy 環境變量](https://vercel.com/sean-2e37/teachwithwhy/settings/environment-variables)，新增：

- Key：`DEEPSEEK_API_KEY`
- Value：自己的密鑰
- Type：Secret
- Environment：Production

非機密設定可使用 `AI_PROVIDER=deepseek`、`DEEPSEEK_MODEL=deepseek-flash`。新版不需要 `APP_ACCESS_CODE`。

不要把示例中的變量名稱誤當成密鑰，也不要把真正密鑰寫進原始碼。

## 5. 發佈新版，再測試一次

儲存變量後，需部署新版才會套用。用虛構課堂資料測試一次，核對真實模型、生成時間及活動內容。只有成功回傳後，才算接通 AI；單純顯示「已設定」不足以證明可調用。

老師日後打開網址即可使用，毋須自行設定 Key。網站可繼續免費供教師使用，模型調用則消耗管理員帳戶額度。

## 官方來源

- [建立 API Key 的官方說明](https://api-docs.deepseek.com/api/deepseek-api/)
- [模型與最新價格](https://api-docs.deepseek.com/quick_start/pricing/)
- [餘額不足等錯誤說明](https://api-docs.deepseek.com/quick_start/error_codes/)
