// デフォルトのMedia Receiver IDを使用
const APPLICATION_ID = 'CC1AD845';
const DEFAULT_MEDIA_RECEIVER_APP_ID = 'CC1AD845';

let castSession = null;

window.onload = function() {
    // Cast APIの初期化
    cast.framework.CastContext.getInstance().setOptions({
        receiverApplicationId: DEFAULT_MEDIA_RECEIVER_APP_ID,
        autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED
    });

    const context = cast.framework.CastContext.getInstance();
    const endButton = document.getElementById('endButton');
    const statusElement = document.getElementById('status');
    const player = new cast.framework.RemotePlayer();
    const playerController = new cast.framework.RemotePlayerController(player);

    // セッション状態の監視
    context.addEventListener(
        cast.framework.CastContextEventType.SESSION_STATE_CHANGED,
        function(event) {
            console.log('セッション状態変更:', event.sessionState);
            switch (event.sessionState) {
                case cast.framework.SessionState.SESSION_STARTED:
                case cast.framework.SessionState.SESSION_RESUMED:
                    castSession = context.getCurrentSession();
                    if (castSession) {
                        console.log('セッション取得成功');
                        endButton.disabled = false;
                        statusElement.textContent = '接続済み';
                        // おしまい画像を表示
                        loadMedia();
                    }
                    break;
                case cast.framework.SessionState.SESSION_ENDED:
                case cast.framework.SessionState.SESSION_ERROR:
                    console.log('セッション終了またはエラー');
                    castSession = null;
                    endButton.disabled = true;
                    statusElement.textContent = '未接続';
                    break;
            }
        }
    );

    // メディアの読み込み
    function loadMedia() {
        if (!castSession) {
            return;
        }

        const mediaInfo = new chrome.cast.media.MediaInfo('https://raw.githubusercontent.com/kswmch/test/main/chromecast/assets/oshimai.png', 'image/png');
        mediaInfo.metadata = new chrome.cast.media.PhotoMediaMetadata();
        mediaInfo.metadata.title = '今日はおしまい！';
        mediaInfo.metadata.subtitle = 'また明日遊ぼうね 😊';

        const request = new chrome.cast.media.LoadRequest(mediaInfo);
        castSession.loadMedia(request).then(
            function() {
                console.log('メディア読み込み成功');
            },
            function(error) {
                console.error('メディア読み込みエラー:', error);
            }
        );
    }

    // 終了ボタンの設定
    endButton.addEventListener('click', function() {
        if (castSession) {
            console.log('セッション終了');
            castSession.endSession(true);
        }
    });
};
