// アプリケーションID（Cast Developer Consoleで登録したIDに置き換える）
const APP_ID = 'YOUR_APP_ID';

// Cast APIの初期化
window['__onGCastApiAvailable'] = function(isAvailable) {
    if (isAvailable) {
        initializeCastApi();
    }
};

// Cast APIの初期化関数
function initializeCastApi() {
    const castContext = cast.framework.CastContext.getInstance();
    castContext.setOptions({
        receiverApplicationId: APP_ID,
        autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED
    });

    // キャスト状態の変更を監視
    castContext.addEventListener(
        cast.framework.CastContextEventType.CAST_STATE_CHANGED,
        onCastStateChanged
    );
}

// キャスト状態が変更されたときの処理
function onCastStateChanged(event) {
    const castSession = cast.framework.CastContext.getInstance().getCurrentSession();
    const sendMessageButton = document.getElementById('sendMessage');
    const statusElement = document.getElementById('status');

    switch (event.castState) {
        case cast.framework.CastState.CONNECTED:
            sendMessageButton.disabled = false;
            statusElement.textContent = 'Chromecastに接続されました';
            break;
        case cast.framework.CastState.NOT_CONNECTED:
            sendMessageButton.disabled = true;
            statusElement.textContent = 'Chromecastに接続されていません';
            break;
    }
}

// 終了メッセージを送信する関数
function sendEndMessage() {
    const castSession = cast.framework.CastContext.getInstance().getCurrentSession();
    if (castSession) {
        castSession.sendMessage('urn:x-cast:com.google.cast.sample.helloworld', {
            type: 'END_MESSAGE',
            message: '今日はおしまい！また明日遊ぼうね 😊'
        });
    }
}

// イベントリスナーの設定
document.addEventListener('DOMContentLoaded', function() {
    const sendMessageButton = document.getElementById('sendMessage');
    sendMessageButton.addEventListener('click', sendEndMessage);
}); 