# Cast Timer (おしまいApp)

子供向けのYouTube視聴を管理するためのシンプルなChromecastアプリです。

## 機能
- Chromecastに「おしまい」メッセージを表示
- シンプルな操作で子供の視聴を終了

## セットアップ手順

1. [Google Cast SDK Developer Console](https://cast.google.com/publish) でアプリを登録
2. 取得したApp IDを `sender/app.js` の `APPLICATION_ID` に設定
3. receiverをホスティング（GitHub Pages等）
4. receiverのURLをCast SDK Developer Consoleに登録

## ディレクトリ構造
- `sender/`: 親用の操作画面
- `receiver/`: Chromecast表示用アプリ

## 技術スタック
- Google Cast SDK for Web
- HTML/CSS/JavaScript
