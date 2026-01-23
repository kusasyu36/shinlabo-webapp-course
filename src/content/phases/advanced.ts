import { Phase } from "../types"
import { phases as standardPhases } from "./index"

// Phase 1-4 is the same as standard, but lessons are skippable
const basePhasesWithSkippable: Phase[] = standardPhases.slice(0, 4).map(phase => ({
  ...phase,
  lessons: phase.lessons.map(lesson => ({
    ...lesson,
    skippable: phase.id <= 2 // Phase 1-2 are skippable for advanced users
  }))
}))

// Phase 5: Advanced - React/Next.js Development
const advancedPhase5: Phase = {
  id: 5,
  title: "React/Next.jsで本格開発",
  description: "モダンなフレームワークを使った本格的なWebアプリ開発を学ぶ",
  duration: "1時間30分",
  lessons: [
    {
      id: "advanced-phase5-lesson17",
      number: 17,
      title: "React入門：コンポーネント思考を理解する",
      description: "Reactの基本概念とコンポーネント思考を学ぶ",
      duration: "20分",
      objectives: [
        "Reactとは何かを理解する",
        "コンポーネント思考を理解する",
        "JSXの基本を理解する"
      ],
      sections: [
        {
          id: "section1",
          title: "Reactとは",
          content: `## Reactとは

### Reactの概要

**React**はFacebook（現Meta）が開発した、UI構築のためのJavaScriptライブラリです。

### なぜReactを学ぶのか

| 理由 | 説明 |
|------|------|
| 業界標準 | 世界で最も使われているフレームワーク |
| 再利用性 | コンポーネントを組み合わせて効率的に開発 |
| AIとの相性 | v0, Claude ArtifactsがReactを出力 |
| 求人数 | Web開発の求人で最も需要が高い |

### コンポーネント思考とは

Reactでは、UIを「コンポーネント」という部品に分けて考えます。

\`\`\`
【従来の考え方】
ページ全体を1つのHTMLとして作る

【コンポーネント思考】
ページを部品に分解して組み合わせる

例: ブログサイト
├── Header（ヘッダー）
├── Sidebar（サイドバー）
├── ArticleList（記事一覧）
│   ├── ArticleCard（記事カード）
│   ├── ArticleCard
│   └── ArticleCard
└── Footer（フッター）
\`\`\`

### コンポーネントのメリット

1. **再利用**: 同じ部品を何度も使える
2. **保守性**: 修正が1箇所で済む
3. **分業**: チームで分担しやすい
4. **テスト**: 部品ごとにテスト可能`
        },
        {
          id: "section2",
          title: "JSXの基礎",
          content: `## JSXの基礎

### JSXとは

**JSX**（JavaScript XML）は、JavaScript内でHTMLのような記法でUIを書ける構文です。

\`\`\`jsx
// JSXの例
function Button() {
  return (
    <button className="btn-primary">
      クリック
    </button>
  );
}
\`\`\`

### HTMLとの違い

| HTML | JSX |
|------|-----|
| \`class\` | \`className\` |
| \`for\` | \`htmlFor\` |
| 閉じタグ必須でない | 全て閉じる必要あり |
| ケバブケース | キャメルケース |

### JSXの基本ルール

\`\`\`jsx
// 1. 単一のルート要素が必要
function Good() {
  return (
    <div>
      <h1>タイトル</h1>
      <p>本文</p>
    </div>
  );
}

// 2. 変数の埋め込みは{}
function Greeting({ name }) {
  return <h1>こんにちは、{name}さん</h1>;
}

// 3. 条件分岐
function Status({ isOnline }) {
  return (
    <span>
      {isOnline ? "オンライン" : "オフライン"}
    </span>
  );
}

// 4. 繰り返し
function List({ items }) {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
\`\`\`

### AIへの依頼時のコツ

\`\`\`
プロンプト：
「Reactで○○コンポーネントを作って。
TypeScriptで、propsの型定義も含めて」
\`\`\``,
          quiz: {
            question: "Reactのコンポーネント思考の最大のメリットは何ですか？",
            options: [
              "コードが長くなる",
              "UIを再利用可能な部品に分けて効率的に開発できる",
              "HTMLを使わなくて済む",
              "JavaScriptを使わなくて済む"
            ],
            correctIndex: 1,
            explanation: "コンポーネント思考の最大のメリットは、UIを再利用可能な部品に分けることで、効率的な開発、保守性の向上、チーム開発のしやすさが得られることです。"
          }
        }
      ]
    },
    {
      id: "advanced-phase5-lesson18",
      number: 18,
      title: "Next.js入門：最強のReactフレームワーク",
      description: "Next.jsの特徴と開発環境のセットアップを学ぶ",
      duration: "20分",
      objectives: [
        "Next.jsの特徴を理解する",
        "開発環境をセットアップできる",
        "プロジェクト構造を理解する"
      ],
      sections: [
        {
          id: "section1",
          title: "Next.jsとは",
          content: `## Next.jsとは

### Next.jsの概要

**Next.js**はVercel社が開発した、Reactベースのフレームワークです。

### ReactとNext.jsの違い

| 項目 | React単体 | Next.js |
|------|-----------|---------|
| ルーティング | 自分で設定 | 自動（ファイルベース） |
| SSR/SSG | 自分で実装 | 組み込み |
| 画像最適化 | 自分で設定 | 自動 |
| API作成 | 別途サーバー | 組み込み |
| 学習コスト | 低め | やや高め |

### Next.jsの主な機能

1. **ファイルベースルーティング**
   \`app/about/page.tsx\` → \`/about\`

2. **Server Components**
   サーバーでレンダリング、高速化

3. **API Routes**
   バックエンドAPIも同じプロジェクトで

4. **Image最適化**
   自動でWebP変換、遅延読み込み

### プロジェクト作成

\`\`\`bash
# Next.jsプロジェクトを作成
npx create-next-app@latest my-app

# 質問に答える
✔ Would you like to use TypeScript? Yes
✔ Would you like to use ESLint? Yes
✔ Would you like to use Tailwind CSS? Yes
✔ Would you like to use \`src/\` directory? Yes
✔ Would you like to use App Router? Yes

# 起動
cd my-app
npm run dev
\`\`\`

http://localhost:3000 でアプリが起動！`
        },
        {
          id: "section2",
          title: "プロジェクト構造",
          content: `## Next.jsプロジェクト構造

### 基本構造

\`\`\`
my-app/
├── src/
│   ├── app/                 # ページ・ルーティング
│   │   ├── page.tsx         # トップページ (/)
│   │   ├── layout.tsx       # 共通レイアウト
│   │   ├── about/
│   │   │   └── page.tsx     # /about
│   │   └── api/             # APIエンドポイント
│   │       └── hello/
│   │           └── route.ts # /api/hello
│   └── components/          # 再利用コンポーネント
│       ├── Header.tsx
│       └── Footer.tsx
├── public/                  # 静的ファイル
├── package.json
└── tailwind.config.ts
\`\`\`

### ページの作成

\`\`\`tsx
// src/app/about/page.tsx
export default function AboutPage() {
  return (
    <div>
      <h1>About</h1>
      <p>このサイトについて</p>
    </div>
  );
}
\`\`\`

### レイアウトの共有

\`\`\`tsx
// src/app/layout.tsx
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
\`\`\`

### AIへの依頼方法

\`\`\`
プロンプト：
「Next.js 14 (App Router) で
ブログサイトを作って。

- トップページに記事一覧
- 記事詳細ページ
- TypeScript + Tailwind CSS
- shadcn/uiコンポーネント使用」
\`\`\``,
          quiz: {
            question: "Next.jsのファイルベースルーティングで、/products ページを作るには？",
            options: [
              "routes.tsにルートを追加する",
              "src/app/products/page.tsx を作成する",
              "package.jsonに設定を追加する",
              "next.config.jsで設定する"
            ],
            correctIndex: 1,
            explanation: "Next.jsのApp Routerでは、src/app/products/page.tsx を作成するだけで自動的に /products ルートが作成されます。これがファイルベースルーティングです。"
          }
        }
      ]
    },
    {
      id: "advanced-phase5-lesson19",
      number: 19,
      title: "Tailwind CSS + shadcn/ui で高速UI開発",
      description: "モダンなUIを素早く構築する方法を学ぶ",
      duration: "20分",
      objectives: [
        "Tailwind CSSの基本を理解する",
        "shadcn/uiの使い方を理解する",
        "美しいUIを素早く構築できる"
      ],
      sections: [
        {
          id: "section1",
          title: "Tailwind CSSとは",
          content: `## Tailwind CSSとは

### Tailwind CSSの概要

**Tailwind CSS**は、ユーティリティファーストのCSSフレームワークです。

### 従来のCSSとの違い

\`\`\`html
<!-- 従来のCSS -->
<button class="btn-primary">ボタン</button>

<style>
.btn-primary {
  background-color: blue;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
}
</style>

<!-- Tailwind CSS -->
<button class="bg-blue-500 text-white px-4 py-2 rounded">
  ボタン
</button>
\`\`\`

### よく使うクラス

| カテゴリ | クラス例 | 意味 |
|----------|----------|------|
| 背景色 | \`bg-blue-500\` | 青背景 |
| 文字色 | \`text-white\` | 白文字 |
| パディング | \`p-4\`, \`px-2\`, \`py-4\` | 余白 |
| マージン | \`m-4\`, \`mx-auto\` | 外側余白 |
| 角丸 | \`rounded\`, \`rounded-lg\` | 角を丸く |
| 影 | \`shadow\`, \`shadow-lg\` | 影をつける |
| フレックス | \`flex\`, \`items-center\` | 配置 |
| グリッド | \`grid\`, \`grid-cols-3\` | グリッド |

### レスポンシブ対応

\`\`\`html
<!-- モバイル: 1列、タブレット: 2列、PC: 3列 -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div>カード1</div>
  <div>カード2</div>
  <div>カード3</div>
</div>
\`\`\`

プレフィックス: \`sm:\`(640px), \`md:\`(768px), \`lg:\`(1024px), \`xl:\`(1280px)`
        },
        {
          id: "section2",
          title: "shadcn/uiの活用",
          content: `## shadcn/uiとは

### shadcn/uiの概要

**shadcn/ui**は、美しくカスタマイズ可能なUIコンポーネント集です。

### インストール方法

\`\`\`bash
# 初期化
npx shadcn@latest init

# コンポーネントを追加
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
npx shadcn@latest add dialog
\`\`\`

### 使用例

\`\`\`tsx
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function LoginForm() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>ログイン</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input placeholder="メールアドレス" type="email" />
        <Input placeholder="パスワード" type="password" />
        <Button className="w-full">ログイン</Button>
      </CardContent>
    </Card>
  );
}
\`\`\`

### 利用可能なコンポーネント

- Button, Input, Textarea
- Card, Dialog, Sheet
- Table, Tabs, Accordion
- Select, Checkbox, Switch
- Toast, Alert, Badge
- など50以上

### AIへの依頼方法

\`\`\`
プロンプト：
「Next.js + shadcn/ui で
ユーザー管理画面を作って。

- ユーザー一覧テーブル
- 追加/編集ダイアログ
- 検索フィルター
- ページネーション

必要なshadcn/uiコンポーネントのインストールコマンドも教えて」
\`\`\``,
          quiz: {
            question: "Tailwind CSSのユーティリティファーストアプローチのメリットは？",
            options: [
              "CSSファイルを別途作成する必要がある",
              "HTMLから直接スタイルを指定でき、開発速度が向上する",
              "クラス名を考える必要がある",
              "レスポンシブ対応が難しい"
            ],
            correctIndex: 1,
            explanation: "ユーティリティファーストアプローチでは、HTMLに直接スタイルを指定できるため、CSSファイルを行き来する必要がなく、開発速度が大幅に向上します。"
          }
        }
      ]
    },
    {
      id: "advanced-phase5-lesson20",
      number: 20,
      title: "API連携：外部サービスとの接続",
      description: "REST APIやSupabaseとの連携方法を学ぶ",
      duration: "20分",
      objectives: [
        "REST APIの基本を理解する",
        "fetch APIの使い方を理解する",
        "Supabaseとの連携を理解する"
      ],
      sections: [
        {
          id: "section1",
          title: "REST APIの基礎",
          content: `## REST APIの基礎

### APIとは

**API**（Application Programming Interface）は、
アプリ同士がデータをやり取りする仕組みです。

### REST APIのHTTPメソッド

| メソッド | 用途 | 例 |
|----------|------|-----|
| GET | データ取得 | ユーザー一覧を取得 |
| POST | データ作成 | 新規ユーザーを作成 |
| PUT/PATCH | データ更新 | ユーザー情報を更新 |
| DELETE | データ削除 | ユーザーを削除 |

### fetch APIの基本

\`\`\`typescript
// GET: データ取得
async function getUsers() {
  const response = await fetch('/api/users');
  const data = await response.json();
  return data;
}

// POST: データ作成
async function createUser(userData: User) {
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  return response.json();
}

// DELETE: データ削除
async function deleteUser(id: string) {
  await fetch(\`/api/users/\${id}\`, {
    method: 'DELETE',
  });
}
\`\`\`

### Next.js API Routes

\`\`\`typescript
// src/app/api/users/route.ts
import { NextResponse } from 'next/server';

// GET /api/users
export async function GET() {
  const users = await db.users.findMany();
  return NextResponse.json(users);
}

// POST /api/users
export async function POST(request: Request) {
  const body = await request.json();
  const user = await db.users.create({ data: body });
  return NextResponse.json(user);
}
\`\`\``
        },
        {
          id: "section2",
          title: "Supabaseとの連携",
          content: `## Supabaseとは

### Supabaseの概要

**Supabase**は、オープンソースのFirebase代替です。
PostgreSQLデータベースと認証機能を無料で使えます。

### セットアップ

\`\`\`bash
npm install @supabase/supabase-js
\`\`\`

\`\`\`typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);
\`\`\`

### CRUD操作

\`\`\`typescript
// 取得
const { data: users } = await supabase
  .from('users')
  .select('*');

// 作成
const { data: newUser } = await supabase
  .from('users')
  .insert({ name: '田中太郎', email: 'tanaka@example.com' })
  .select()
  .single();

// 更新
await supabase
  .from('users')
  .update({ name: '田中次郎' })
  .eq('id', 1);

// 削除
await supabase
  .from('users')
  .delete()
  .eq('id', 1);
\`\`\`

### AIへの依頼方法

\`\`\`
プロンプト：
「Next.js + Supabase で
ToDoアプリを作って。

- Supabaseでデータ永続化
- リアルタイム同期
- ユーザー認証（Supabase Auth）
- TypeScript型定義も含めて」
\`\`\``,
          quiz: {
            question: "REST APIでデータを新規作成する際に使用するHTTPメソッドは？",
            options: [
              "GET",
              "POST",
              "PUT",
              "DELETE"
            ],
            correctIndex: 1,
            explanation: "REST APIでは、新規データの作成にはPOSTメソッドを使用します。GETは取得、PUT/PATCHは更新、DELETEは削除に使用します。"
          }
        }
      ]
    }
  ]
}

// Phase 6: Advanced - Production Development
const advancedPhase6: Phase = {
  id: 6,
  title: "本番環境とデプロイ",
  description: "アプリを本番環境にデプロイし、運用する方法を学ぶ",
  duration: "1時間",
  lessons: [
    {
      id: "advanced-phase6-lesson21",
      number: 21,
      title: "Vercelでデプロイする",
      description: "Next.jsアプリをVercelにデプロイする方法を学ぶ",
      duration: "15分",
      objectives: [
        "Vercelの特徴を理解する",
        "GitHubと連携してデプロイできる",
        "環境変数の設定を理解する"
      ],
      sections: [
        {
          id: "section1",
          title: "Vercelデプロイ",
          content: `## Vercelでデプロイ

### Vercelとは

**Vercel**は、Next.jsを作った会社が提供するホスティングサービスです。

### デプロイ手順

1. **GitHubにプッシュ**
\`\`\`bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/username/my-app.git
git push -u origin main
\`\`\`

2. **Vercelに接続**
   - https://vercel.com にアクセス
   - GitHubでログイン
   - 「New Project」→ リポジトリを選択
   - 「Deploy」をクリック

3. **自動デプロイ**
   以降はGitHubにプッシュするたびに自動デプロイ！

### 環境変数の設定

\`\`\`
Vercelダッシュボード
→ Settings
→ Environment Variables

NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
\`\`\`

### ドメイン設定

- デフォルト: \`my-app.vercel.app\`
- カスタムドメイン: \`my-app.com\` も設定可能`
        },
        {
          id: "section2",
          title: "運用のベストプラクティス",
          content: `## 運用のベストプラクティス

### ブランチ戦略

\`\`\`
main ─────────────────────→ 本番環境
  └── develop ────────────→ ステージング環境
        └── feature/xxx ──→ プレビュー環境
\`\`\`

### 環境の使い分け

| 環境 | 用途 | URL |
|------|------|-----|
| Production | 本番 | my-app.com |
| Preview | プレビュー | pr-123.my-app.vercel.app |
| Development | 開発 | localhost:3000 |

### エラー監視

\`\`\`
プロンプト：
「Vercel + Sentry でエラー監視を設定する手順を教えて」
\`\`\`

### パフォーマンス監視

- Vercel Analytics
- Lighthouse CI
- Core Web Vitals

### 継続的な改善サイクル

\`\`\`
1. 機能開発（feature branch）
2. プルリクエスト作成
3. プレビュー環境で確認
4. コードレビュー
5. mainにマージ
6. 自動デプロイ
7. 監視・改善
\`\`\``,
          quiz: {
            question: "Vercelでの自動デプロイが実行されるタイミングは？",
            options: [
              "毎日決まった時刻",
              "手動でボタンを押した時",
              "GitHubにコードをプッシュした時",
              "サーバーを再起動した時"
            ],
            correctIndex: 2,
            explanation: "VercelはGitHub連携により、リポジトリにコードをプッシュするたびに自動的にデプロイが実行されます。これによりCI/CDが実現できます。"
          }
        }
      ]
    },
    {
      id: "advanced-phase6-lesson22",
      number: 22,
      title: "Claude Codeで開発を加速する",
      description: "AIコーディングアシスタントを活用した効率的な開発フローを学ぶ",
      duration: "15分",
      objectives: [
        "Claude Codeの特徴を理解する",
        "効果的なプロンプトの書き方を習得する",
        "AIと協働する開発フローを確立する"
      ],
      sections: [
        {
          id: "section1",
          title: "Claude Codeとは",
          content: `## Claude Codeとは

### 概要

**Claude Code**は、Anthropicが提供するAIコーディングアシスタントです。
ターミナルから直接AIと対話しながら開発できます。

### 主な機能

| 機能 | 説明 |
|------|------|
| コード生成 | 自然言語からコードを生成 |
| コードレビュー | バグや改善点を指摘 |
| リファクタリング | コードの品質向上 |
| 質問応答 | 技術的な質問に回答 |
| ファイル操作 | 読み書き、検索 |

### 効果的なプロンプト

\`\`\`
悪い例:
「ログイン機能を作って」

良い例:
「Next.js 14 (App Router) + Supabase Authで
ログイン機能を実装してください。

要件:
- メールアドレス/パスワード認証
- ログイン状態の永続化
- 未認証時のリダイレクト
- TypeScript + shadcn/ui使用

ファイル構成も提案してください」
\`\`\`

### コンテキストを活用

\`\`\`
「現在のプロジェクト構造を確認して、
それに合った形でユーザー管理機能を追加してください」
\`\`\``
        },
        {
          id: "section2",
          title: "AIと協働する開発フロー",
          content: `## AIと協働する開発フロー

### 推奨フロー

\`\`\`
1. 要件定義
   └── AIに要件を伝え、設計案をもらう

2. 設計レビュー
   └── 設計を確認し、フィードバック

3. 実装
   └── AIにコードを生成してもらう

4. コードレビュー
   └── AIにレビューを依頼

5. テスト
   └── AIにテストコードを生成してもらう

6. デバッグ
   └── エラーをAIに伝えて解決
\`\`\`

### 段階的に依頼する

\`\`\`
ステップ1:
「まずUserモデルとAPIルートを作って」

ステップ2:
「次にユーザー一覧ページを作って」

ステップ3:
「編集機能も追加して」

ステップ4:
「テストコードを書いて」
\`\`\`

### デバッグの依頼方法

\`\`\`
「以下のエラーが発生しています。
原因と解決方法を教えてください。

エラー:
[エラーメッセージをコピペ]

コンテキスト:
- Next.js 14
- TypeScript
- ○○の処理中に発生」
\`\`\`

### 講座の総まとめ

これで講座は完了です！

**習得したスキル**:
- Vibe Coding（AI協働開発）
- React/Next.js
- Tailwind CSS + shadcn/ui
- API連携（Supabase）
- 本番デプロイ（Vercel）

AIと一緒に、どんどんアプリを作っていきましょう！`,
          quiz: {
            question: "AIにコードを依頼する際のベストプラクティスは？",
            options: [
              "短く曖昧に伝える",
              "一度に全ての機能を依頼する",
              "具体的な要件と使用技術を明示し、段階的に依頼する",
              "エラーが出ても自分で解決する"
            ],
            correctIndex: 2,
            explanation: "AIへの依頼は、具体的な要件と使用技術を明示し、段階的に依頼することで、より正確で使いやすいコードを生成できます。"
          }
        }
      ]
    }
  ]
}

export const advancedPhases: Phase[] = [
  ...basePhasesWithSkippable,
  advancedPhase5,
  advancedPhase6
]
