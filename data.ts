// Portfolio content. Edit here; index.tsx only renders it.
// Work done for clients is written so that the client cannot be identified.

export type Kind = 'work' | 'personal' | 'oss' | 'web' | 'practice';
export type Scope = 'fullstack' | 'frontend' | 'backend' | 'tooling' | 'cms' | 'media' | 'prototype' | 'enablement';

export type StackGroup = { label: string; items: string[] };

export type Project = {
  id: string;
  title: string;
  kind: Kind;
  scope: Scope;
  period: string;
  summary: string;
  role: string;
  scopeNote: string;
  highlights: string[];
  stack: StackGroup[];
  links: { label: string; href: string }[];
  privateNote?: string;
  image?: string;
};

export const KIND_LABEL: Record<Kind, { en: string; jp: string }> = {
  work: { en: 'Client Work', jp: '業務' },
  personal: { en: 'Personal', jp: '個人開発' },
  oss: { en: 'Open Source', jp: 'OSS' },
  web: { en: 'Web Production', jp: 'Web制作' },
  practice: { en: 'Practice', jp: '模写・練習' },
};

export const SCOPE_LABEL: Record<Scope, { en: string; jp: string; hint: string }> = {
  fullstack: { en: 'Full-stack', jp: 'フルスタック', hint: '画面・サーバー・データ・公開まで全部を担当' },
  frontend: { en: 'Frontend', jp: 'フロントエンド', hint: '画面だけを作成。データは固定で、サーバーはありません' },
  backend: { en: 'Backend', jp: 'バックエンド', hint: 'サーバー側の処理だけを担当' },
  tooling: { en: 'Tooling / MCP', jp: 'ツール・MCP', hint: '画面のない開発ツール。CLI や AI から呼び出して使います' },
  cms: { en: 'CMS', jp: 'CMS構築', hint: 'WordPress などの CMS で構築・運用' },
  media: { en: 'Media Pipeline', jp: '制作の自動化', hint: '動画・音声の制作工程をコードで自動化' },
  prototype: { en: 'Prototype', jp: '試作', hint: '技術検証のための試作。本番運用はしていません' },
  enablement: { en: 'AI Enablement', jp: '社内推進', hint: 'コードではなく、社内にAIを広める仕事' },
};

export const projects: Project[] = [
  // ---- 業務（IT企業から業務委託。社名・製品名は伏せています） ----
  {
    id: 'w-vote',
    title: '社員向け 店舗検索・投票アプリ',
    kind: 'work',
    scope: 'fullstack',
    period: '2026.09',
    summary: '社員が地図でお店を探し、投票で行き先を決める社内向けWebアプリ。',
    role: '企画・設計・実装・テスト・公開・運用まで一人で担当',
    scopeNote: 'フルスタックで作りました。画面、ログイン、投票データの保存、本番公開まで全部を担当しています。',
    highlights: [
      'Googleアカウントでのログインを社内のアカウントだけに絞る仕組み（OAuth）',
      '同時に投票しても票が消えたり二重に入ったりしない仕組み（Redis）',
      '利用者の要望をその日のうちに直し、5日間で初版から9版まで公開',
    ],
    stack: [
      { label: 'Frontend', items: ['Next.js', 'React', 'TypeScript'] },
      { label: 'Backend / Data', items: ['Next.js Route Handlers', 'Upstash Redis', 'Google OAuth'] },
      { label: 'Infra', items: ['Vercel'] },
      { label: 'Test', items: ['Vitest'] },
    ],
    links: [],
    privateNote: '業務のため、画面とソースは非公開です。',
  },
  {
    id: 'w-meeting',
    title: '商談を支援するリアルタイムAIツール（試作）',
    kind: 'work',
    scope: 'prototype',
    period: '2026.09',
    summary: '商談中の会話をその場で文字にし、営業担当の画面に次に話す内容の候補を出す試作。',
    role: '技術検証と試作を担当',
    scopeNote: '試作です。音声をAIに送る部分と、候補を表示する画面の両方を作りました。本番運用はしていません。',
    highlights: ['会話をリアルタイムで文字起こし', '会話の流れから次の話題の候補を表示'],
    stack: [
      { label: 'AI', items: ['Gemini Live API'] },
      { label: 'Frontend', items: ['TypeScript', 'Web Audio'] },
    ],
    links: [],
    privateNote: '業務のため非公開です。',
  },
  {
    id: 'w-media',
    title: '社内向け音声・動画コンテンツの制作支援',
    kind: 'work',
    scope: 'media',
    period: '2026.06 —',
    summary: '社内向けの学習コンテンツ（音声番組と動画）の制作と、番組ページの構築。',
    role: '番組ページの制作、テーマの企画、制作工程の自動化',
    scopeNote: 'ページは WordPress で構築しました。動画づくりは、文字起こし・カット・字幕・書き出しをコードで自動化しています。',
    highlights: [
      '文字起こし → 無音のカット → 字幕 → 書き出しを1本のコマンドに',
      'AIの声とAIで作った画像で作る別バージョンの動画も試作',
      '手作業だった音量調整などを手順にまとめて効率化',
    ],
    stack: [
      { label: 'CMS', items: ['WordPress'] },
      { label: 'Media', items: ['ffmpeg', 'whisper.cpp', 'Node.js'] },
      { label: 'AI', items: ['ElevenLabs', '画像生成AI'] },
    ],
    links: [],
    privateNote: '社内向けのため非公開です。',
  },
  {
    id: 'w-ai-adoption',
    title: '社内の生成AI活用推進',
    kind: 'work',
    scope: 'enablement',
    period: '2026.03 —',
    summary: '社員がAIを使えるようになるための資料づくりと、最新情報の社内発信。',
    role: '一次情報の調査、資料・図解の作成、社内への発信',
    scopeNote: 'コードではなく、社内にAIを広める仕事です。公式の発表や一次情報を確かめてから、分かりやすい形にして共有しています。',
    highlights: [
      '新しいモデルやツールの公式情報を、できるだけ公開当日に確かめて共有',
      '初めての人でも分かる図解と手順書を作成',
      'アイデア出しを助けるAI用の手順（プロンプト）を作り、他部署へ配布',
    ],
    stack: [
      { label: 'AI', items: ['Claude', 'ChatGPT', 'Gemini'] },
      { label: 'Tools', items: ['Google Workspace', 'Canva', 'Notion'] },
    ],
    links: [],
    privateNote: '社内向けのため非公開です。',
  },

  // ---- 個人開発 ----
  {
    id: 'p-yggdrasil',
    title: 'YGGDRASIL',
    kind: 'personal',
    scope: 'fullstack',
    period: '2026.08',
    summary: '自分のスキルをRPGのスキルツリーのように見られるWebアプリ兼MCPサーバー。AIと話しながら樹を育てられます。',
    role: '企画・設計・実装・公開。ハッカソンで発表',
    scopeNote: 'フルスタックです。画面、データの保存、AIから操作するためのMCPサーバー、本番公開まで担当しました。',
    highlights: [
      '約820のスキルを載せた図鑑と、自分の樹を見比べて足りないスキルを見つける機能',
      'Claude などのAIから MCP 経由で樹を読み書きできる（書き込みは認証つき）',
      '遠くを表示したときの重い処理を 408ms → 約95ms に改善',
    ],
    stack: [
      { label: 'Frontend', items: ['Next.js', 'React', 'TypeScript'] },
      { label: 'Backend', items: ['MCP SDK', 'mcp-handler', 'zod'] },
      { label: 'Data / Infra', items: ['Vercel Blob', 'Vercel'] },
    ],
    links: [{ label: 'サイトを開く', href: 'https://yggdrasil-genesis.vercel.app' }],
    image: 'images/L.jpg',
  },
  {
    id: 'p-mediedi',
    title: 'MediEdi!',
    kind: 'personal',
    scope: 'fullstack',
    period: '2026.03 — 05',
    summary: 'ブラウザだけで画像の編集と、画像・動画の形式変換ができるWebアプリ。',
    role: '企画・設計・実装・デザイン・公開',
    scopeNote: 'フルスタックです。編集画面、ログイン、決済、本番公開まで担当しました。変換はブラウザの中で動くので、ファイルをサーバーに送りません。',
    highlights: [
      'ログイン（Supabase Auth）と決済（Stripe）を組み込み',
      'ブラウザ内で動く変換（FFmpeg の WebAssembly 版）。スマホでも動くように調整',
      'レビューで見つかったセキュリティの不具合（Cookie の設定が消える）を修正',
    ],
    stack: [
      { label: 'Frontend', items: ['Next.js', 'React', 'TypeScript', 'Radix UI'] },
      { label: 'Backend', items: ['Supabase Auth', 'Stripe'] },
      { label: 'Media', items: ['FFmpeg (WebAssembly)'] },
      { label: 'Infra', items: ['Vercel', 'GitHub Actions'] },
    ],
    links: [{ label: 'サイトを開く', href: 'https://media-editor-platform.vercel.app' }],
    image: 'images/K.png',
  },
  {
    id: 'p-kintai',
    title: '勤怠・日報の自動記録アプリ',
    kind: 'personal',
    scope: 'fullstack',
    period: '2026.08 —',
    summary: '自分の作業記録から30分ごとの日報の下書きを作り、確認してからスプレッドシートに書き込むアプリ。',
    role: '企画・設計・実装・運用',
    scopeNote: 'フルスタックです。画面、ログイン、Google スプレッドシートへの読み書き、自動収集の仕組みまで作りました。',
    highlights: [
      '作業の記録を30分ごとにまとめ、日報の下書きにする（書き込む前に自分で確認）',
      'Google スプレッドシートを読み書きするAPI連携',
      '数百本の自動テストで、書き込みの誤りを防ぐ',
    ],
    stack: [
      { label: 'Frontend', items: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'] },
      { label: 'Backend', items: ['NextAuth', 'Google Sheets API'] },
      { label: 'Test', items: ['Vitest'] },
    ],
    links: [],
    privateNote: '個人用のため非公開です。',
  },
  {
    id: 'p-agent-env',
    title: '複数のAIが分担して開発する環境',
    kind: 'personal',
    scope: 'tooling',
    period: '2026 —',
    summary: 'Claude・Codex など複数のAIに役割を分けて開発させ、AIの「できました」を実際の実行記録と照らし合わせる自作の仕組み。',
    role: '設計・実装・毎日の運用',
    scopeNote: '画面のない開発ツールです。AIの動きを見張るフック、作業手順（スキル）、役割ごとのエージェントを自分で書いています。',
    highlights: [
      '自作のフック 80本超・スキル 27・エージェント 11',
      'AIが実行していない作業を「完了」と報告したら、実行記録との食い違いで止める',
      '削除や外部への送信など、取り消せない操作の前に確認を挟む',
    ],
    stack: [
      { label: 'AI', items: ['Claude Code', 'Codex', 'Cursor', 'OpenCode', 'Devin'] },
      { label: 'Runtime', items: ['Node.js', 'TypeScript', 'MCP'] },
    ],
    links: [],
    privateNote: '個人の作業環境のため非公開です。',
  },
  {
    id: 'p-browser-agent',
    title: 'browser-agent',
    kind: 'personal',
    scope: 'tooling',
    period: '2026',
    summary: 'AIがブラウザの画面を見て、クリックや入力をしながら作業を進めるためのMCPサーバーとChrome拡張。',
    role: '設計・実装',
    scopeNote: '画面のない開発ツールです。AIから呼び出されるサーバーと、ブラウザ側の拡張機能を作りました。',
    highlights: ['ブラウザの開発者向け通信（CDP）を直接使って操作', 'MCP で Claude などから呼び出せる'],
    stack: [
      { label: 'Backend', items: ['TypeScript', 'MCP SDK', 'Playwright', 'WebSocket'] },
      { label: 'Extension', items: ['Chrome Extension', 'Vite'] },
      { label: 'Test', items: ['Vitest'] },
    ],
    links: [],
    privateNote: '非公開です。',
  },

  // ---- OSS ----
  {
    id: 'o-kagura',
    title: 'Kagura Search',
    kind: 'oss',
    scope: 'tooling',
    period: '2026.03 — 04',
    summary: '複数の検索エンジンの結果を照らし合わせ、一致した情報に印を付ける検索ツール。',
    role: '設計・実装・公開（MITライセンス）',
    scopeNote: '画面のないツールです。AIから使う MCP サーバーと、ターミナルから使う CLI の2つの入口があります。',
    highlights: ['core / mcp / cli の3つに分けたモノレポ構成', 'テスト167本', 'セキュリティの見直しを16回重ねて公開'],
    stack: [
      { label: 'Language', items: ['TypeScript'] },
      { label: 'Interface', items: ['MCP Server', 'CLI'] },
      { label: 'Test', items: ['Vitest'] },
    ],
    links: [{ label: 'GitHub', href: 'https://github.com/kamisimokagura/kagura-search' }],
    image: 'images/M.png',
  },
  {
    id: 'o-lucifer',
    title: 'lucifer-research',
    kind: 'oss',
    scope: 'tooling',
    period: '2026.04 — 05',
    summary: 'YouTube や GitHub などから、AIが読みやすい形で情報を取り出すツール。',
    role: '設計・実装・公開',
    scopeNote: '画面のないツールです。AIから呼び出す MCP サーバーとして動きます。',
    highlights: [
      '取り出しに失敗したら別の方法に切り替える、段階的な仕組み',
      'ブラウザを使った取り出しにも対応し、保存する情報は対象のサイトの分だけに絞る',
    ],
    stack: [
      { label: 'Language', items: ['TypeScript'] },
      { label: 'Backend', items: ['MCP Server', 'Playwright'] },
      { label: 'Build', items: ['Turborepo', 'npm workspaces'] },
    ],
    links: [{ label: 'GitHub', href: 'https://github.com/kamisimokagura/lucifer-research' }],
    image: 'images/N.png',
  },

  // ---- Web制作 ----
  {
    id: 'web-jiwa',
    title: 'jiwa nusantara',
    kind: 'web',
    scope: 'frontend',
    period: '2025',
    summary: 'インドネシアの工芸品を紹介する、ECサイト風のサイト。',
    role: 'デザイン・実装',
    scopeNote: 'フロントエンドだけで作りました。商品データは固定で、カートや決済のサーバーはありません。',
    highlights: ['商品一覧と商品ごとのページ', '静的サイトとして書き出して公開'],
    stack: [{ label: 'Frontend', items: ['Next.js (Static Export)', 'React', 'TypeScript'] }],
    links: [{ label: 'サイトを開く', href: '/jiwa-nusantara/index.html' }],
    image: 'images/I.png',
  },
  {
    id: 'web-writing',
    title: 'web-writing-final',
    kind: 'web',
    scope: 'frontend',
    period: '2026',
    summary: '20代の転職・就職をテーマにした、SEO向けの記事2本をまとめたページ。',
    role: '記事の執筆・ページの実装',
    scopeNote: 'フロントエンドだけです。1枚のHTMLページです。',
    highlights: ['検索する人の悩みから組み立てた見出しと構成', '書き方の方針（Writing Policy）も掲載'],
    stack: [{ label: 'Frontend', items: ['HTML', 'CSS'] }],
    links: [{ label: 'ページを開く', href: 'web-writing-final/web-writing-final 1.html' }],
    image: 'images/J.png',
  },
  {
    id: 'web-culinary',
    title: 'Culinary Journal',
    kind: 'web',
    scope: 'frontend',
    period: '2024',
    summary: '和食・洋食・スイーツのレシピを載せた料理ブログ。',
    role: 'デザイン・実装',
    scopeNote: 'フロントエンドだけで作りました。記事は HTML に直接書いています。',
    highlights: ['カテゴリ別の一覧とレシピの個別ページ', 'お問い合わせページ'],
    stack: [{ label: 'Frontend', items: ['HTML', 'CSS', 'JavaScript'] }],
    links: [{ label: 'サイトを開く', href: 'Cooking Blog/index.html' }],
    image: 'images/F.png',
  },
  {
    id: 'web-tourism',
    title: 'Tourism LP',
    kind: 'web',
    scope: 'frontend',
    period: '2024',
    summary: '香川県の観光を紹介するランディングページ「きらめく、かがわ」。',
    role: 'デザイン・実装',
    scopeNote: 'フロントエンドだけで作りました。',
    highlights: ['エリア・体験・グルメの3つの切り口で紹介', 'スライドするメイン画像'],
    stack: [{ label: 'Frontend', items: ['HTML', 'CSS', 'JavaScript'] }],
    links: [{ label: 'サイトを開く', href: 'Tourism LP/index.html' }],
    image: 'images/G.png',
  },
  {
    id: 'web-gaming',
    title: 'Gaming Gadgets',
    kind: 'web',
    scope: 'frontend',
    period: '2024',
    summary: 'ゲーミングデバイスを紹介する製品サイト。動画つき。',
    role: 'デザイン・実装',
    scopeNote: 'フロントエンドだけで作りました。',
    highlights: ['製品ごとの紹介動画を埋め込み'],
    stack: [{ label: 'Frontend', items: ['HTML', 'CSS', 'JavaScript'] }],
    links: [{ label: 'サイトを開く', href: 'Version with gaming-gadgets-site file structure removed/index.html' }],
    image: 'images/H.png',
  },

  // ---- 模写・練習 ----
  {
    id: 'pr-apple',
    title: 'Apple Clone',
    kind: 'practice',
    scope: 'frontend',
    period: '2023',
    summary: 'Apple の製品ページを見本にしたクローン。',
    role: '実装',
    scopeNote: 'フロントエンドだけです。見た目を再現する練習です。',
    highlights: ['Sass で書いたスタイル'],
    stack: [{ label: 'Frontend', items: ['HTML', 'Sass (SCSS)'] }],
    links: [{ label: 'ページを開く', href: 'APPLE/index.html' }],
    image: 'images/B.png',
  },
  {
    id: 'pr-tech-blog',
    title: 'Tech Blog',
    kind: 'practice',
    scope: 'frontend',
    period: '2024',
    summary: 'メディアサイトのデザインを見本にした模写。',
    role: '実装',
    scopeNote: 'フロントエンドだけです。デザインを見本どおりに組む練習です。',
    highlights: ['ピックアップ・ランキングなどのメディア向けレイアウト'],
    stack: [{ label: 'Frontend', items: ['HTML', 'CSS'] }],
    links: [{ label: 'ページを開く', href: 'Coating Advanced Arrangement/index.html' }],
    image: 'images/E.png',
  },
  {
    id: 'pr-furniture',
    title: 'Modern Furniture',
    kind: 'practice',
    scope: 'frontend',
    period: '2023',
    summary: '家具のECサイトのデザインを見本にした模写。',
    role: '実装',
    scopeNote: 'フロントエンドだけです。',
    highlights: ['商品一覧・商品ページ・会社概要など複数ページ'],
    stack: [{ label: 'Frontend', items: ['HTML', 'CSS', 'JavaScript'] }],
    links: [{ label: 'ページを開く', href: 'Coating Intermediate Arrangement/index.html' }],
    image: 'images/D.png',
  },
  {
    id: 'pr-photographer',
    title: 'Photographer Portfolio',
    kind: 'practice',
    scope: 'frontend',
    period: '2023',
    summary: '写真家のポートフォリオサイトの模写。',
    role: '実装',
    scopeNote: 'フロントエンドだけです。',
    highlights: ['PC とスマホで画像を出し分け'],
    stack: [{ label: 'Frontend', items: ['HTML', 'CSS'] }],
    links: [{ label: 'ページを開く', href: 'Coating Elementary Arrangement/index.html' }],
    image: 'images/C.png',
  },
  {
    id: 'pr-bike',
    title: 'Coating Bike',
    kind: 'practice',
    scope: 'frontend',
    period: '2023',
    summary: '自転車ショップのサイトの模写。',
    role: '実装',
    scopeNote: 'フロントエンドだけです。',
    highlights: ['商品紹介と店舗紹介の1ページ構成'],
    stack: [{ label: 'Frontend', items: ['HTML', 'CSS'] }],
    links: [{ label: 'ページを開く', href: 'Coating Introductory Arrangement/index.html' }],
    image: 'images/A.png',
  },
];

// ---- AI ----

export const aiStats = [
  { value: '約3年', label: '生成AIを使ってきた期間' },
  { value: '2024〜', label: 'AIを業務に活用' },
  { value: '80+', label: '自作のフック（AIの見張り役）' },
  { value: '10+', label: '使い分けているAIサービス' },
];

export const aiTimeline = [
  { when: '2023', text: '生成AIを使い始める。答えの精度がまだ低かった頃から、学習に取り入れる' },
  { when: '2024', text: 'AIを業務に活用し始める' },
  { when: '2024.12', text: 'AI×エンジニアのオンラインスクールを修了' },
  { when: '2025.05', text: 'X でAI開発・OSS・最新情報の発信を始める' },
  { when: '2026.03', text: 'IT企業と業務委託契約。社内ツールの開発と生成AIの活用推進を担当' },
  { when: '2026.08', text: 'ハッカソンで YGGDRASIL を発表' },
];

export const aiServices = [
  { name: 'Claude / Claude Code', note: 'Max プラン。開発の中心' },
  { name: 'ChatGPT / Codex', note: 'コードレビューと画像生成' },
  { name: 'Cursor', note: '別のモデルでのレビュー' },
  { name: 'Devin', note: '別系統の確認役' },
  { name: 'OpenCode', note: '軽い作業を安いモデルで' },
  { name: 'Gemini', note: 'リアルタイム音声（Live API）' },
  { name: 'ElevenLabs', note: 'AIの声' },
  { name: 'Kimi / DeepSeek / Grok', note: '新しいモデルが出たらすぐ試す' },
];

export const aiPractices = [
  {
    title: '役割を分けて任せる',
    text: '作る役、確かめる役、調べる役をAIごとに分けます。同じAIに自分の作ったものを確かめさせないのが基本です。',
  },
  {
    title: 'AIの「できました」を確かめる',
    text: 'AIが実際には実行していない作業を「完了」と報告したことがありました。それ以来、報告を実行記録と照らし合わせる仕組みを毎日使っています。',
  },
  {
    title: '一次情報を、その日のうちに',
    text: '新しいモデルやツールが出たら、公式の発表とリリースノートをできるだけその日のうちに読み、試して、社内に共有します。',
  },
];
