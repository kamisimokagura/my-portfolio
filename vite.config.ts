import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

// ESM環境で __dirname を再現するための設定
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
  // ローカル開発サーバーの設定
  server: {
    port: 3000,
    host: true, // 外部からのアクセスを許可する場合（スマホ実機確認など）
  },
});