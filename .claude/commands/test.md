---
name: test
description: テストの作成・実行を行う
---

# Test Command

テストの作成と実行を行います。

## テストの種類

### 1. 単体テスト (Unit Tests)
- 個々の関数・コンポーネントのテスト
- モックを使用した独立したテスト

### 2. 統合テスト (Integration Tests)
- 複数のコンポーネントの連携テスト
- API との連携テスト

### 3. E2E テスト (End-to-End Tests)
- ユーザーシナリオ全体のテスト
- ブラウザでの実際の動作テスト

## テストフレームワーク

### React Testing Library
```typescript
import { render, screen, fireEvent } from '@testing-library/react';

test('ボタンクリックでカウントが増加', () => {
  render(<Counter />);
  const button = screen.getByRole('button');
  fireEvent.click(button);
  expect(screen.getByText('1')).toBeInTheDocument();
});
```

### Jest
```typescript
describe('calculateTotal', () => {
  it('正しい合計を返す', () => {
    expect(calculateTotal([1, 2, 3])).toBe(6);
  });

  it('空配列で0を返す', () => {
    expect(calculateTotal([])).toBe(0);
  });
});
```

### Playwright (E2E)
```typescript
test('ログインフロー', async ({ page }) => {
  await page.goto('/login');
  await page.fill('[name="email"]', 'test@example.com');
  await page.fill('[name="password"]', 'password');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('/dashboard');
});
```

## テストカバレッジ目標

| 種類 | 目標 |
|------|------|
| ユーティリティ関数 | 90%+ |
| ビジネスロジック | 80%+ |
| UI コンポーネント | 70%+ |
| 全体 | 75%+ |

## 使用方法

```
/test [create | run | coverage] [ファイルパス]
```
