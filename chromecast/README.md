# Cast Timer (Oshimai App)

YouTubeの視聴時間を管理するためのChromecast連携アプリです。

## プロジェクト構成

```
.
├── sender/          # 送信側アプリ（親が操作する側）
│   ├── index.html
│   ├── style.css
│   └── script.js
└── receiver/        # 受信側アプリ（Chromecastに表示される側）
    ├── index.html
    ├── style.css
    └── script.js
```

## セットアップ手順

1. Google Cast Developer Consoleでアプリケーションを登録
   - https://cast.google.com/publish/ にアクセス
   - 新しいアプリケーションを作成
   - ReceiverアプリのURLを登録（例：https://your-username.github.io/cast-timer/receiver/）

2. アプリケーションの設定
   - `sender/script.js` の `YOUR_APP_ID` を、登録したアプリケーションIDに置き換え

3. ローカルでのテスト
   - ローカルサーバーを起動（例：`python -m http.server 8000`）
   - Chromeブラウザで `http://localhost:8000/sender/` にアクセス

## 使用方法

1. Senderアプリを開く
2. 「キャスト開始」ボタンをクリック
3. 表示されるChromecastデバイスを選択
4. 「終了メッセージを送る」ボタンで終了画面を表示

## 注意事項

- 本アプリはGoogle Cast SDKを使用しています
- 動作にはChromeブラウザが必要です
- テスト時は同じネットワーク上にChromecastデバイスが必要です 