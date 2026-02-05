# 🎮 ゲームガジェットサイト

最新のゲーミングデバイスを紹介する現代的なWebサイトです。

## ✨ 特徴

- 📱 **レスポンシブデザイン**: スマホ・タブレット・PC対応
- 🎬 **動画・画像対応**: 各ガジェットの詳細メディア表示
- 🚀 **スムーズアニメーション**: 美しい画面遷移
- 🔍 **詳細検索**: カテゴリー別・価格別検索
- 💫 **モダンUI**: 2025年最新デザイントレンド

## 📁 ファイル構成

## 🚀 使用方法

### 1. ファイルの準備
```bash
# プロジェクトフォルダを作成
mkdir gaming-gadgets-site
cd gaming-gadgets-site

# ファイルをダウンロード・配置
# index.html, styles.css, script.js を同じフォルダに配置
# 方法1: ブラウザで直接開く
# index.htmlをダブルクリック

# 方法2: ローカルサーバーで実行（推奨）
# Python 3の場合
python -m http.server 8000

# Node.jsの場合
npx http-server
http://localhost:8000
/* styles.css の :root セクションを編集 */
:root {
  --primary-color: #ff6b6b;    /* メインカラー */
  --secondary-color: #4ecdc4;  /* サブカラー */
  --accent-color: #45b7d1;     /* アクセントカラー */
}
// script.js の gadgets配列に追加
const gadgets = [
  {
    id: 'new-mouse',
    name: '新しいゲーミングマウス',
    category: 'mouse',
    price: '¥12,000',
    image: 'path/to/image.jpg',
    video: 'https://youtube.com/watch?v=xxx'
  }
];
