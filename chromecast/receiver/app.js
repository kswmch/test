const context = cast.framework.CastReceiverContext.getInstance();
const playerManager = context.getPlayerManager();

// カスタムメッセージを受け取るためのネームスペースを設定
const NAMESPACE = 'urn:x-cast:com.oshimai.app';

// メッセージを受け取った時の処理
context.addCustomMessageListener(NAMESPACE, function(event) {
    console.log('受信したメッセージ:', event.data);
    // 必要に応じてメッセージに応じた処理を追加
});

// レシーバーアプリを起動
context.start();
