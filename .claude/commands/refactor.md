---
name: refactor
description: コードのリファクタリングを実施する
---

# Refactor Command

コードの品質を向上させるリファクタリングを実施します。

## リファクタリング原則

### SOLID原則
- **S**: 単一責任の原則
- **O**: 開放閉鎖の原則
- **L**: リスコフの置換原則
- **I**: インターフェース分離の原則
- **D**: 依存性逆転の原則

### DRY (Don't Repeat Yourself)
- 重複コードの抽出
- 共通関数・コンポーネントの作成

### KISS (Keep It Simple, Stupid)
- 複雑なロジックの簡素化
- 理解しやすいコード構造

## リファクタリング手法

### 1. 抽出
```typescript
// Before: 長い関数
function handleSubmit() {
  // 30行のコード...
}

// After: 責務分離
function validateForm() { ... }
function submitData() { ... }
function handleSubmit() {
  if (validateForm()) {
    submitData();
  }
}
```

### 2. コンポーネント分割
```typescript
// Before: 巨大コンポーネント
function Page() {
  return (
    <div>
      {/* 300行のJSX */}
    </div>
  );
}

// After: 分割
function Header() { ... }
function Content() { ... }
function Footer() { ... }
function Page() {
  return (
    <div>
      <Header />
      <Content />
      <Footer />
    </div>
  );
}
```

### 3. カスタムフック
```typescript
// Before: コンポーネント内のロジック
function Component() {
  const [data, setData] = useState();
  useEffect(() => { fetch... }, []);
  // ...
}

// After: カスタムフック
function useData() {
  const [data, setData] = useState();
  useEffect(() => { fetch... }, []);
  return { data };
}
```

## 使用方法

```
/refactor [ファイルパス or 機能名]
```
