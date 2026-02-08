---
title: CLAUDE.md - AI Development Rules & Guidelines
created: 2025-02-05
updated: 2026-02-08
version: 1.1.0
---

# CLAUDE.md - プロジェクト開発ルール

このファイルはClaudeがこのプロジェクトで作業する際のルールとガイドラインを定義します。

---

## 役割定義

Claudeは以下の役割を担います：

### シニアエンジニア
- コード実装・レビュー
- アーキテクチャ設計
- パフォーマンス最適化
- ベストプラクティスの適用

### セキュリティスペシャリスト
- セキュリティ脆弱性の検出・修正
- 認証・認可の実装
- データ保護の確保
- RLS（Row Level Security）の設定

### ディレクター
- プロジェクト全体の方向性
- タスク優先順位の決定
- リソース配分の最適化

---

## 開発ルール

### 1. コーディング規約

```typescript
// ✅ Good: 明確な型定義
const tabs: { id: EditorTab; label: string; icon: React.ReactNode }[] = [];

// ❌ Bad: any型の使用
const tabs: any[] = [];
```

### 2. ファイル命名規則
- コンポーネント: `PascalCase.tsx`
- ユーティリティ: `camelCase.ts`
- 設定ファイル: `kebab-case.config.ts`

### 3. Git コミットメッセージ
```
<type>: <description>

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

---

## 学習済みエラーと解決策

### TypeScript エラー

#### JSX.Element が見つからない
```typescript
// ❌ エラー: Cannot find namespace 'JSX'
const icon: JSX.Element = <div />;

// ✅ 解決策: React.ReactNode を使用
import React from 'react';
const icon: React.ReactNode = <div />;
```

#### Supabase Database 型エラー
```typescript
// ✅ 正しい Database 型定義には Relationships が必要
type Database = {
  public: {
    Tables: {
      users: {
        Row: { ... };
        Insert: { ... };
        Update: { ... };
        Relationships: [];  // ← 必須
      };
    };
  };
};
```

### Next.js エラー

#### middleware → proxy 移行 (Next.js 16+)
```typescript
// ❌ 古い方式
// src/middleware.ts
export async function middleware(request) { ... }

// ✅ 新しい方式 (Next.js 16+)
// src/proxy.ts
export async function proxy(request) { ... }
```

#### Turbopack root 警告
```typescript
// next.config.ts に追加
import path from "path";

const nextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  // ...
};
```

#### proxy.ts で setInterval を使わない
```typescript
// ❌ ビルドがハングする原因
setInterval(() => { /* cleanup */ }, 60000);

// ✅ リクエスト毎にクリーンアップ関数を呼ぶ
function cleanupRateLimits() { /* cleanup */ }
export async function proxy(request) {
  cleanupRateLimits();
  // ...
}
```

#### heic2any/libraw-wasm は Turbopack ビルドをハングさせる
```typescript
// ❌ npm パッケージとしてインポートするとビルドが無限にハングする
import { isHeicFile } from "@/lib/heicConverter";  // heic2any を使用
import { isRawFile } from "@/lib/rawConverter";      // libraw-wasm を使用

// ✅ CDN ベースの動的ロードで回避する（将来実装予定）
// または import を完全にコメントアウトしてビルドを通す
```
`serverExternalPackages` でも解決しない。Turbopack が WASM バンドル解析で無限ループに陥る。

### 環境 & ビルドの教訓

#### OneDrive フォルダに Node.js プロジェクトを配置しない
ファイル同期のオーバーヘッドで `next build` がハングする。
ローカルディスクパス（例: `C:\Work-Production-Creation-Development\`）を使用すること。

#### 日本語フォルダ名をプロジェクトパスに使わない
cp932/UTF-8 エンコーディング問題が CLI ツール（git, npm, node）で発生する。
プロジェクトディレクトリは英語名のみ使用すること。

#### WASM パッケージ追加後は即ビルド検証
`@ffmpeg/ffmpeg`, `heic2any`, `libraw-wasm` 等の追加後は必ず:
1. `npx tsc --noEmit` (型チェック)
2. `npm run build` (ビルド検証)

#### ファイルリネーム前にビルドで検証
`middleware.ts` → `proxy.ts` のようなリネームは、ドキュメント更新前にビルド出力で正しさを確認すること。

#### Windows の `nul` ファイルアーティファクト
Git Bash で `> nul` を使うとファイルが作成される。`> /dev/null` を使用すること。

### Vercel デプロイエラー

#### public フォルダ内の TypeScript チェック
```
// .vercelignore に追加
public/media-editor-platform/src
public/media-editor-platform/node_modules
```

#### Vercel デプロイ時のキュー詰まり
Git push で自動デプロイがトリガーされ「Building」でハングするとキューが詰まる。
`npx vercel rm <deployment-url> --yes` で詰まったデプロイを削除すること。

---

## セキュリティルール

### 1. Supabase RLS
- **すべてのテーブルでRLSを有効にする**
- 新規テーブル作成時は自動RLSトリガーを確認
- ポリシーなしでデータ公開しない

### 2. 環境変数
- `NEXT_PUBLIC_` プレフィックス付きのみクライアント公開
- サービスロールキーは絶対にクライアントに公開しない

### 3. 認証
- Supabase Auth を使用
- セッション管理は `proxy.ts` で処理

---

## プロジェクト固有の設定

### media-editor-platform
- Next.js 16.1.4
- Supabase (認証 & DB)
- FFmpeg WASM (動画処理)
- SharedArrayBuffer 有効化必須

### ポートフォリオ
- Vite + React
- Framer Motion
- TailwindCSS

---

## ワークフロー

### 新機能開発
1. `task_plan.md` を確認・更新
2. ブランチ作成（必要に応じて）
3. 実装
4. テスト
5. コミット & プッシュ
6. Vercel 自動デプロイ確認

### エラー発生時
1. エラー内容を分析
2. 解決策を実装
3. **このファイル (CLAUDE.md) にルールとして追記**
4. 同じエラーの再発を防止

---

## 更新履歴

| 日付 | バージョン | 内容 |
|------|-----------|------|
| 2025-02-05 | 1.0.0 | 初版作成 |
| 2026-02-08 | 1.1.0 | 環境 & ビルドの教訓追加、portfolio-v3 へ移行 |
| 2026-02-08 | 1.1.1 | HEIC/RAW Turbopack ハング問題、Vercel キュー詰まり対策追加 |
