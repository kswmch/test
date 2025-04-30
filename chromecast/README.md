# Cast Timer (Oshimai App)

シンプルなChromecast連携アプリです。親のデバイスからボタンを押すと、Chromecastに「今日はおしまい！」という画面を表示させます。

## 構成

- `sender/`: 親が操作するSenderアプリ (HTML, CSS, JS)
- `receiver/`: Chromecastに表示されるReceiverアプリ (HTML, CSS, JS)

## セットアップ

1.  **Google Cast Developer Console でのアプリ登録:**
    *   [Google Cast SDK Developer Console](https://cast.google.com/publish/) にアクセスし、新しいアプリケーションを登録します。
    *   「Custom Receiver」を選択します。
    *   **Receiver Application URL** に、Receiverアプリ (`receiver/index.html`) をホスティングするURLを指定します。
        *   **ローカルテストの場合:** ngrokなどのツールでローカルサーバーを外部公開し、そのHTTPS URLを指定します。（例: `https://xxxx-xx-xx-xx-xx.ngrok-free.app/receiver/index.html`）
        *   **GitHub Pagesの場合:** GitHub Pagesでホスティングした `receiver/index.html` のURLを指定します。（例: `https://<ユーザー名>.github.io/<リポジトリ名>/receiver/`）
    *   登録後、**Application ID** が発行されるので、これをコピーしておきます。

2.  **SenderアプリへのApp ID設定:**
    *   `sender/script.js` ファイルを開きます。
    *   `const applicationId = 'YOUR_APPLICATION_ID';` の行を見つけ、`YOUR_APPLICATION_ID` を、ステップ1で取得した実際の **Application ID** に書き換えます。

3.  **テストデバイスの登録:**
    *   Cast Developer Consoleで、テストに使用するChromecastデバイスのシリアル番号を登録します。

## 使い方

1.  **Receiverアプリのホスティング:**
    *   `receiver` フォルダの内容をWebサーバーでホストします。
        *   ローカルテスト: `receiver` フォルダがあるディレクトリで `python -m http.server` などを実行し、ngrokで公開します。
        *   GitHub Pages: リポジトリの `docs` フォルダまたは `main` ブランチをGitHub Pagesとして公開設定し、`receiver` フォルダの内容をそこに配置します。（必要に応じてビルドステップや構成調整が必要になる場合があります）
    *   **重要:** ReceiverはHTTPSでホストされている必要があります。

2.  **Senderアプリを開く:**
    *   `sender/index.html` ファイルをWebブラウザで開きます。
        *   ローカルファイルとして直接開くか、Webサーバー経由でアクセスします。（ローカルサーバーから開くのが確実です）

3.  **キャスト:**
    *   Senderアプリのキャストボタン（<google-cast-launcher>）をクリックし、キャスト先のChromecastデバイスを選択します。
    *   接続が成功すると、ReceiverアプリがChromecastに表示されます。

4.  **終了メッセージ送信:**
    *   Senderアプリの「終了メッセージを送る」ボタンをクリックします。
    *   Receiverアプリの画面は変わりませんが、開発者コンソール（Sender側）にメッセージ送信のログが表示されます。（Receiver側でも受信ログが表示されます）

## 注意点

- ReceiverアプリはHTTPSでホストする必要があります。
- App IDを正しく設定してください。
- テストデバイスがDeveloper Consoleに登録されていることを確認してください。 