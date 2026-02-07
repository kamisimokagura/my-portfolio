---
name: deploy
description: プロジェクトをビルドしてデプロイ準備を行う
---

# Deploy Command

プロジェクトのデプロイ準備を行います。

## 実行内容

1. **ビルドチェック**
   - TypeScriptエラーがないか確認
   - ビルドが成功するか確認

2. **Git操作**
   - 変更をステージング
   - コミットメッセージを生成
   - リモートにプッシュ

3. **デプロイ確認**
   - Vercelの自動デプロイを待機

## 手順

```bash
# 1. ビルドテスト
npm run build

# 2. 変更確認
git status
git diff

# 3. コミット & プッシュ
git add .
git commit -m "feat: <変更内容>"
git push origin main
```

## 注意事項

- コミット前にビルドが成功することを確認
- 機密情報（.env）がコミットされていないか確認
- media-editor-platform は別リポジトリなので個別にデプロイ
