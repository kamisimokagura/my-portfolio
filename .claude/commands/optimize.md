---
name: optimize
description: パフォーマンス最適化を実施する
---

# Optimize Command

アプリケーションのパフォーマンスを最適化します。

## 最適化領域

### 1. バンドルサイズ 📦

```typescript
// ✅ 動的インポート
const HeavyComponent = dynamic(() => import('./HeavyComponent'));

// ✅ ツリーシェイキング対応のインポート
import { specific } from 'library'; // Good
import * as library from 'library'; // Bad
```

### 2. React パフォーマンス ⚛️

```typescript
// useMemo: 計算結果のキャッシュ
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(input);
}, [input]);

// useCallback: 関数のメモ化
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);

// React.memo: コンポーネントのメモ化
const MemoizedComponent = React.memo(Component);
```

### 3. 画像最適化 🖼️

```typescript
// Next.js Image
import Image from 'next/image';
<Image
  src="/image.png"
  width={800}
  height={600}
  placeholder="blur"
  loading="lazy"
/>
```

### 4. データフェッチング 🔄

```typescript
// SWR / React Query
const { data, isLoading } = useSWR('/api/data', fetcher, {
  revalidateOnFocus: false,
  dedupingInterval: 60000,
});
```

### 5. Core Web Vitals

| 指標 | 目標 | 説明 |
|------|------|------|
| LCP | < 2.5s | Largest Contentful Paint |
| FID | < 100ms | First Input Delay |
| CLS | < 0.1 | Cumulative Layout Shift |

## 分析ツール

```bash
# バンドル分析
npm run build -- --analyze

# Lighthouse
npx lighthouse https://your-site.com

# Web Vitals
# → Chrome DevTools > Performance
```

## 使用方法

```
/optimize [bundle | react | images | fetch | vitals]
```
