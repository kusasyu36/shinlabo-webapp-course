import { Phase } from "../types"

export const beginnerPhases: Phase[] = [
  {
    id: 1,
    title: "AIに触れてみよう",
    description: "AIとは何かを知り、実際に話しかけてみましょう",
    duration: "15分",
    lessons: [
      {
        id: "beginner-lesson1",
        number: 1,
        title: "AIとは何か？",
        description: "AIは「賢いお手伝いさん」。話しかけるだけで何でも答えてくれます",
        duration: "5分",
        objectives: [
          "AIとは「賢いお手伝いさん」だと理解する",
          "怖くない、難しくないと感じる"
        ],
        sections: [
          {
            id: "section1",
            title: "AIってなに？",
            videoUrl: "/videos/beginner/webapp-lesson1.mp4",
            content: `## AIは「賢いお手伝いさん」

AIとは、話しかけるだけで何でも答えてくれる「賢いお手伝いさん」のようなものです。

### AIができること

- 質問に答える
- 文章を書く
- 絵を描く
- **アプリを作る** ← 今回はこれをやります！

### 安心してください

- 難しい言葉を覚える必要はありません
- 日本語で話しかけるだけでOK
- 無料で使えます

> 💡 **ポイント**: AIは魔法ではなく、あなたの「お手伝いさん」です。`,
            videoRequired: true
          },
          {
            id: "section2",
            title: "今日やること",
            videoUrl: "/videos/beginner/webapp-lesson1.mp4",
            content: `## この講座でやること

### ゴール
「ボタンを押すと数字が増えるアプリ」を作ります！

### 手順
1. AIに話しかける
2. AIがアプリを作ってくれる
3. 動かしてみる

たったこれだけです。

> 🎉 **プログラミングを勉強しなくても、アプリが作れます！**`,
            quiz: {
              question: "AIに話しかけるのに、プログラミング言語を覚える必要がある？",
              options: [
                "はい、覚える必要がある",
                "いいえ、日本語で話しかけるだけでOK"
              ],
              correctIndex: 1,
              explanation: "正解！AIには日本語で話しかけるだけでOKです。プログラミング言語を覚える必要はありません。"
            }
          }
        ]
      },
      {
        id: "beginner-lesson2",
        number: 2,
        title: "Google AI Studioを開いてみよう",
        description: "無料で使えるAIのページを開いてみましょう",
        duration: "5分",
        objectives: [
          "Google AI Studioにアクセスできる",
          "画面を見て「ここに書くんだ」と分かる"
        ],
        sections: [
          {
            id: "section1",
            title: "AIのページを開こう",
            videoUrl: "/videos/beginner/webapp-lesson2.mp4",
            content: `## Google AI Studioを開こう

### 手順（動画でも見れます）

1. **インターネットを開く**
   - Chrome（クローム）やSafari（サファリ）など

2. **検索する**
   - 「Google AI Studio」と入力して検索

3. **クリック**
   - 検索結果の一番上をクリック

4. **ログイン**
   - 「Googleアカウントでログイン」を押す
   - Gmailをお持ちの方は、そのアカウントでOK

> ⚠️ **Googleアカウントがない方へ**
> Gmailを作ると自動的にアカウントができます`,
            videoRequired: true
          },
          {
            id: "section2",
            title: "画面の見方",
            videoUrl: "/videos/beginner/webapp-lesson2.mp4",
            content: `## 画面の見方

開けたら、こんな画面が出てきます：

\`\`\`
┌────────────────────────────────────┐
│                                    │
│   ここにAIからの返事が出ます       │
│                                    │
├────────────────────────────────────┤
│ ここに日本語で書きます [送信]      │
└────────────────────────────────────┘
\`\`\`

### 覚えること

1. **下の入力欄** → ここに書く
2. **送信ボタン** → これを押すとAIに送られる

> 💡 他のボタンは今は気にしなくてOK！`,
            quiz: {
              question: "Google AI Studioを使うのにお金はかかる？",
              options: [
                "無料で使える",
                "有料（お金がかかる）"
              ],
              correctIndex: 0,
              explanation: "正解！Google AI Studioは無料で使えます。"
            }
          }
        ]
      },
      {
        id: "beginner-lesson3",
        number: 3,
        title: "AIに話しかけてみよう",
        description: "実際にAIに話しかけて、返事をもらってみましょう",
        duration: "5分",
        objectives: [
          "AIに日本語で話しかけられる",
          "返事が来て「すごい！」と思う"
        ],
        sections: [
          {
            id: "section1",
            title: "最初の一言",
            videoUrl: "/videos/beginner/webapp-lesson3.mp4",
            content: `## AIに「こんにちは」と言ってみよう

### やってみよう

1. 入力欄に「こんにちは」と入力
2. 送信ボタン（紙飛行機のマーク）を押す
3. AIが返事をしてくれます！

### 結果

AIが「こんにちは！何かお手伝いできることはありますか？」
のような返事をしてくれます。

> 🎉 **おめでとうございます！AIと会話できました！**`,
            videoRequired: true
          },
          {
            id: "section2",
            title: "いろいろ聞いてみよう",
            videoUrl: "/videos/beginner/webapp-lesson3.mp4",
            content: `## 好きなことを聞いてみよう

### 試してみよう

何でも聞いてOKです！例えば：

- 「りんごの栄養について教えて」
- 「今日の晩ごはんのアイデアを出して」
- 「猫について教えて」

### ポイント

- 日本語で聞くだけでOK
- 難しい言葉は使わなくてOK
- 何回聞いても無料

> 💡 次のレッスンでは、いよいよ「アプリを作って」とお願いします！`,
            quiz: {
              question: "AIに話しかける時、どうやって話しかける？",
              options: [
                "英語で話しかける",
                "プログラミング言語で話しかける",
                "日本語で普通に話しかける"
              ],
              correctIndex: 2,
              explanation: "正解！AIには日本語で普通に話しかけるだけでOKです。"
            }
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "初めてのアプリ体験",
    description: "AIにお願いして、実際にアプリを作ってもらいましょう",
    duration: "20分",
    lessons: [
      {
        id: "beginner-lesson4",
        number: 4,
        title: "AIが作ったアプリを見てみよう",
        description: "AIにアプリを作ってもらい、完成品を見てみましょう",
        duration: "5分",
        objectives: [
          "AIがアプリを作れることを知る",
          "完成品を見て「こういうのが作れるんだ」と思う"
        ],
        sections: [
          {
            id: "section1",
            title: "アプリを作ってもらおう",
            videoUrl: "/videos/beginner/webapp-lesson4.mp4",
            content: `## AIに「アプリを作って」とお願いしよう

### 魔法の言葉

入力欄に、以下をコピーして貼り付けてください：

---

**クリックすると数字が1増えるボタンを作って**

---

そして送信ボタンを押します。

### 結果

AIが何やら難しそうな文字をたくさん書きます。

> ⚠️ **安心してください！**
> この文字を理解する必要はありません。
> AIが「アプリの設計図」を書いてくれているだけです。`,
            videoRequired: true
          },
          {
            id: "section2",
            title: "アプリを動かしてみよう",
            videoUrl: "/videos/beginner/webapp-lesson4.mp4",
            content: `## 作ったアプリを動かそう

### 手順（動画でも見れます）

1. **コピーする**
   - AIが書いた文字を全部コピーします
   - 「コードをコピー」ボタンがあればそれを押す

2. **メモ帳を開く**
   - Windowsの方：スタートメニューから「メモ帳」
   - Macの方：「テキストエディット」

3. **貼り付ける**
   - Ctrl+V（Macは⌘+V）で貼り付け

4. **保存する**
   - 「名前を付けて保存」
   - 名前を「counter.html」にする（重要！）

5. **開く**
   - 保存したファイルをダブルクリック

### 結果

ブラウザが開いて、ボタンが表示されます！
押してみると... 数字が増える！

> 🎉 **おめでとうございます！アプリが動きました！**`,
            videoRequired: true,
            quiz: {
              question: "AIが書いた難しそうな文字、理解する必要がある？",
              options: [
                "全部理解する必要がある",
                "理解しなくてOK。AIが書いてくれるから"
              ],
              correctIndex: 1,
              explanation: "正解！AIが書いた文字（コード）は理解しなくてOKです。AIが代わりに書いてくれます。"
            }
          }
        ]
      },
      {
        id: "beginner-lesson5",
        number: 5,
        title: "ボタンを押すと数字が増えるアプリ",
        description: "今度は自分で「お願い」を書いてアプリを作ってみましょう",
        duration: "5分",
        objectives: [
          "自分で「お願い」を書いてアプリを作る",
          "「自分で作った！」という達成感を得る"
        ],
        sections: [
          {
            id: "section1",
            title: "もう少し詳しくお願いしよう",
            videoUrl: "/videos/beginner/webapp-lesson5.mp4",
            content: `## もっと詳しくお願いしてみよう

### 以下をコピーして貼り付けてください

---

ボタンを押すと数字が増えるアプリを作ってください。

数字は大きく真ん中に表示してください。
ボタンは「+1」「-1」「リセット」の3つ。
色は青を使ってください。

---

### やること

1. 上の文章をコピー
2. Google AI Studioに貼り付け
3. 送信ボタンを押す
4. 出てきたものをコピー
5. メモ帳に貼り付けて保存（counter2.html）
6. ダブルクリックで開く

> 💡 前回より詳しくお願いしたので、より希望通りのアプリができます！`,
            videoRequired: true
          },
          {
            id: "section2",
            title: "動いたか確認しよう",
            videoUrl: "/videos/beginner/webapp-lesson5.mp4",
            content: `## 確認しよう

### チェックリスト

- [ ] 数字が大きく表示されている
- [ ] 「+1」ボタンがある
- [ ] 「-1」ボタンがある
- [ ] 「リセット」ボタンがある
- [ ] 色が青い

### 動かなかった場合

もし動かなかったら：

1. ファイル名が「.html」で終わっているか確認
2. もう一度最初からやってみる

> 🎉 **動きましたか？おめでとうございます！あなたもアプリ開発者です！**`,
            quiz: {
              question: "AIにお願いする時、詳しくお願いするとどうなる？",
              options: [
                "AIが混乱してうまくいかない",
                "より希望通りのものができる"
              ],
              correctIndex: 1,
              explanation: "正解！AIには詳しくお願いするほど、より希望通りのものができます。"
            }
          }
        ]
      },
      {
        id: "beginner-lesson6",
        number: 6,
        title: "自分の好みに変えてみよう",
        description: "色を変えたり、大きさを変えたり、自分好みにカスタマイズしましょう",
        duration: "5分",
        objectives: [
          "AIに追加のお願いができる",
          "「自分好みにできる」と分かる"
        ],
        sections: [
          {
            id: "section1",
            title: "色を変えてみよう",
            videoUrl: "/videos/beginner/webapp-lesson6.mp4",
            content: `## 色を変えてみよう

### AIに追加でお願いする

さっきの会話の続きで、こう入力します：

---

**色を赤に変えてください**

---

すると、AIが修正した版を書いてくれます。

### やること

1. 新しく出てきたものをコピー
2. メモ帳に貼り付け
3. 「counter3.html」で保存
4. 開いて確認

> 🎨 赤くなりましたか？好きな色に変えてみましょう！`,
            videoRequired: true
          },
          {
            id: "section2",
            title: "いろいろ変えてみよう",
            videoUrl: "/videos/beginner/webapp-lesson6.mp4",
            content: `## 他にもいろいろ変えてみよう

### 試してみよう

AIにこんなお願いもできます：

- 「数字をもっと大きくして」
- 「背景を黄色にして」
- 「ボタンを丸くして」
- 「+10ボタンも追加して」

### ポイント

- 日本語でお願いするだけ
- 何回でも変更OK
- 少しずつ変えると上手くいく

> 💡 **あなたの好きなようにアプリを変えられます！**`,
            quiz: {
              question: "作ったアプリの色を変えたい時、どうする？",
              options: [
                "プログラミングを勉強して自分で直す",
                "AIに「色を○○に変えて」とお願いする"
              ],
              correctIndex: 1,
              explanation: "正解！AIに「色を○○に変えて」とお願いするだけで変えられます。"
            }
          }
        ]
      },
      {
        id: "beginner-lesson7",
        number: 7,
        title: "作ったものを保存しよう",
        description: "作ったアプリをデスクトップに保存して、いつでも使えるようにしましょう",
        duration: "5分",
        objectives: [
          "作ったアプリを保存できる",
          "いつでも開けることを知る"
        ],
        sections: [
          {
            id: "section1",
            title: "デスクトップに保存しよう",
            videoUrl: "/videos/beginner/webapp-lesson7.mp4",
            content: `## デスクトップに保存しよう

### 手順

1. **メモ帳でファイルを開く**
   - 先ほど作ったファイルを開く

2. **名前を付けて保存**
   - 「ファイル」→「名前を付けて保存」

3. **保存場所を「デスクトップ」に**

4. **名前を「私のカウンター.html」に**
   - 「.html」を忘れずに！

5. **保存ボタンを押す**

> ✅ デスクトップにファイルができました！`,
            videoRequired: true
          },
          {
            id: "section2",
            title: "いつでも開ける",
            videoUrl: "/videos/beginner/webapp-lesson7.mp4",
            content: `## いつでも開けます

### 使い方

デスクトップにできたファイルを
**ダブルクリック**するだけ！

いつでも、何回でも使えます。

### ユニット2 完了！

ここまでで：

- AIに話しかけた
- ボタンで数字が増えるアプリを作った
- 好みに色を変えた
- デスクトップに保存した

> 🎉 **全部、日本語で話しかけるだけでできましたね！**`,
            quiz: {
              question: "保存したアプリをもう一度開くには？",
              options: [
                "もう一度AIに作ってもらう",
                "デスクトップのファイルをダブルクリック"
              ],
              correctIndex: 1,
              explanation: "正解！一度保存したら、ファイルをダブルクリックするだけで何度でも開けます。"
            }
          }
        ]
      }
    ]
  },
  {
    id: 3,
    title: "簡単なツールを作ろう",
    description: "メモを残せる便利なアプリを作りましょう",
    duration: "15分",
    lessons: [
      {
        id: "beginner-lesson8",
        number: 8,
        title: "メモを残せるアプリを作ろう",
        description: "買い物リストなどを書いておけるメモアプリを作ります",
        duration: "5分",
        objectives: [
          "実用的なアプリを作る体験",
          "「これ使える！」と思う"
        ],
        sections: [
          {
            id: "section1",
            title: "メモアプリを作ろう",
            videoUrl: "/videos/beginner/webapp-lesson8.mp4",
            content: `## メモアプリを作ろう

### 以下をコピーして貼り付けてください

---

メモアプリを作ってください。

文字を入力して「追加」ボタンを押すと、
下にメモが追加されます。
各メモの横に「削除」ボタンがあり、
押すと消えます。
シンプルで見やすいデザインにしてください。

---

### やること

1. 上の文章をGoogle AI Studioに貼り付け
2. 送信
3. 出てきたものをコピー
4. メモ帳に貼り付け
5. 「memo.html」で保存
6. ダブルクリックで開く`,
            videoRequired: true
          },
          {
            id: "section2",
            title: "使ってみよう",
            videoUrl: "/videos/beginner/webapp-lesson8.mp4",
            content: `## 使ってみよう

### 試してみよう

1. 入力欄に「牛乳を買う」と入力
2. 「追加」ボタンを押す
3. 下にメモが追加される
4. 「削除」ボタンで消える

### 活用例

- 買い物リスト
- やることリスト
- メモ帳

> 💡 **これ、実際に使えますよね！**`,
            quiz: {
              question: "AIにアプリを作ってもらう時、何が大切？",
              options: [
                "とにかく短くお願いする",
                "何がしたいか詳しく伝える"
              ],
              correctIndex: 1,
              explanation: "正解！何がしたいか詳しく伝えると、より希望通りのものができます。"
            }
          }
        ]
      },
      {
        id: "beginner-lesson9",
        number: 9,
        title: "見た目を整えよう",
        description: "メモアプリの見た目を自分好みに変えましょう",
        duration: "5分",
        objectives: [
          "デザインを変える体験",
          "「もっとこうしたい」を伝える練習"
        ],
        sections: [
          {
            id: "section1",
            title: "見た目を変えよう",
            videoUrl: "/videos/beginner/webapp-lesson9.mp4",
            content: `## 見た目を変えよう

### AIに追加でお願いする

さっきの会話の続きで、順番に試してみましょう：

**1つ目：**
---
背景を水色にしてください
---

**2つ目：**
---
メモの文字をもっと大きくしてください
---

**3つ目：**
---
追加ボタンを緑色にして、大きくしてください
---

> 💡 1つずつお願いすると上手くいきます！`,
            videoRequired: true
          },
          {
            id: "section2",
            title: "完成！",
            videoUrl: "/videos/beginner/webapp-lesson9.mp4",
            content: `## 完成！

### チェックリスト

- [ ] 背景が水色になった
- [ ] 文字が大きくなった
- [ ] ボタンが緑色になった

### ポイント

- 日本語で伝えるだけで見た目が変わる
- 1つずつお願いすると上手くいく
- 気に入らなかったらまたお願いすればOK

> 🎨 **あなた好みのメモアプリができました！**`,
            quiz: {
              question: "アプリの見た目を変えたい時、一番いいやり方は？",
              options: [
                "一度にたくさんの変更をお願いする",
                "1つずつお願いして確認する"
              ],
              correctIndex: 1,
              explanation: "正解！1つずつお願いして確認すると、思い通りのものができやすいです。"
            }
          }
        ]
      },
      {
        id: "beginner-lesson10",
        number: 10,
        title: "まとめ：あなたもアプリが作れた！",
        description: "学んだことの振り返りと、これからの第一歩",
        duration: "5分",
        objectives: [
          "学んだことを振り返る",
          "「自分にもできた」という自信を持つ"
        ],
        sections: [
          {
            id: "section1",
            title: "振り返り",
            videoUrl: "/videos/beginner/webapp-lesson10.mp4",
            content: `## やったことの振り返り

### 今日やったこと

1. **AIと話した**
   - 「こんにちは」と言ってみた
   - 色々質問してみた

2. **カウンターアプリを作った**
   - 「作って」とお願いしただけ
   - ボタンを押すと数字が増える

3. **好みに変えた**
   - 色を変えた
   - 大きさを変えた

4. **メモアプリを作った**
   - 買い物リストに使える
   - 見た目も整えた

> 🎉 **全部、日本語で話しかけるだけでできました！**`,
          },
          {
            id: "section2",
            title: "これからの一歩",
            videoUrl: "/videos/beginner/webapp-lesson10.mp4",
            content: `## あなたにもできた！

### 大事なこと

プログラミングを勉強しなくても、
AIがいれば自分のツールが作れます。

### これから

- 思いついたものを作ってみてください
- 「こんなのあったら便利」をAIに伝えてみてください
- 失敗しても大丈夫。何度でもやり直せます

### もっと学びたい方へ

「標準コース」に進むと、
もっと本格的なアプリが作れます。

でも、無理せず、
ここで止めてもOKです。

> 🚀 **作ったアプリを使い続けることが大切です！**

---

## 🎊 初心者コース修了おめでとうございます！

AIと一緒なら、あなたにもアプリが作れることが
分かりました。

これからも、AIを「賢いお手伝いさん」として
活用してください！`,
            quiz: {
              question: "この講座で一番大事なことは？",
              options: [
                "プログラミング言語を覚えること",
                "難しいコードを理解すること",
                "AIに日本語で話しかければアプリが作れること"
              ],
              correctIndex: 2,
              explanation: "正解！プログラミングを勉強しなくても、AIに日本語で話しかけるだけでアプリが作れます。これが一番大事なことです！"
            }
          }
        ]
      }
    ]
  }
]
