// Cast Developer ConsoleでApp IDを取得後に設定
const APPLICATION_ID = '81B88856';
const NAMESPACE = 'urn:x-cast:com.oshimai.app';

let castSession = null;

window.onload = function() {
    // Cast APIの初期化
    cast.framework.CastContext.getInstance().setOptions({
        receiverApplicationId: APPLICATION_ID,
        autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED
    });

    const castContext = cast.framework.CastContext.getInstance();
    const endButton = document.getElementById('endButton');
    const statusElement = document.getElementById('status');

    // セッション状態の監視
    castContext.addEventListener(
        cast.framework.CastContextEventType.SESSION_STATE_CHANGED,
        function(event) {
            switch (event.sessionState) {
                case cast.framework.SessionState.SESSION_STARTED:
                    castSession = castContext.getCurrentSession();
                    endButton.disabled = false;
                    statusElement.textContent = '接続済み';
                    break;
                case cast.framework.SessionState.SESSION_ENDED:
                    castSession = null;
                    endButton.disabled = true;
                    statusElement.textContent = '未接続';
                    break;
            }
        }
    );

    // 終了メッセージ送信ボタンの設定
    endButton.addEventListener('click', function() {
        if (castSession) {
            castSession.sendMessage(NAMESPACE, {
                type: 'end',
                message: 'おしまい'
            });
        }
    });
};
