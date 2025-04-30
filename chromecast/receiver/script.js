// Cast Receiver Frameworkの初期化
const context = cast.framework.CastReceiverContext.getInstance();
const playerManager = context.getPlayerManager();

// メッセージハンドラーの設定
playerManager.setMessageInterceptor(
    cast.framework.messages.MessageType.LOAD,
    request => {
        if (request.media && request.media.customData) {
            const customData = request.media.customData;
            if (customData.type === 'END_MESSAGE') {
                updateMessage(customData.message);
            }
        }
        return request;
    }
);

// メッセージの更新関数
function updateMessage(message) {
    const messageElement = document.getElementById('message');
    const submessageElement = document.getElementById('submessage');
    
    if (message) {
        const parts = message.split(' 😊');
        messageElement.textContent = parts[0];
        if (parts[1]) {
            submessageElement.textContent = parts[1] + ' 😊';
        }
    }
}

// アプリケーションの開始
context.start(); 