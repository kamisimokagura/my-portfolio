<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/temp/1

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## デプロイ（Vercel）

1. [Vercel](https://vercel.com) にログイン（GitHub アカウントで連携可能）
2. **Add New** → **Project** でこのリポジトリをインポート
3. 設定はそのままで **Deploy**（`vercel.json` でビルド設定済み）
4. 完了後、表示された URL でポートフォリオにアクセス可能

**media-editor-platform も公開する場合:**  
`public/media-editor-platform` を別プロジェクトとして Vercel にデプロイし、発行された URL を `index.tsx` の media-editor-platform の `link` に設定してください。
