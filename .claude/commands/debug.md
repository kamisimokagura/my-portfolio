---
name: debug
description: エラーやバグの調査・修正を行う
---

# Debug Command

エラーやバグを調査し、解決策を提案・実装します。

## デバッグプロセス

### 1. エラー分析
- エラーメッセージの解析
- スタックトレースの確認
- 関連ファイルの特定

### 2. 原因調査
- コードの読み取り
- 依存関係の確認
- 環境設定の確認

### 3. 解決策の実装
- 修正コードの作成
- テストの実行
- 動作確認

### 4. 再発防止
- CLAUDE.md にルールを追記
- 類似箇所の確認

## よくあるエラーパターン

### TypeScript
```
Cannot find namespace 'JSX'
→ React.ReactNode を使用

Property 'X' does not exist on type 'never'
→ 型定義を確認、Relationships プロパティを追加
```

### Next.js
```
middleware deprecated
→ proxy.ts にリネーム、関数名も proxy に変更

turbopack root warning
→ next.config.ts に turbopack.root を追加
```

### Vercel
```
Build failed - TypeScript error
→ .vercelignore で不要なファイルを除外
→ tsconfig.json の exclude を確認
```

## 使用方法

```
/debug [エラーメッセージをペースト]
```
