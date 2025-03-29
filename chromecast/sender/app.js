// デフォルトのMedia Receiver IDを使用
const APPLICATION_ID = 'CC1AD845';
let castContext = null;
let castSession = null;
let player = null;
let playerController = null;

// メディアの読み込み
function loadMedia() {
    if (!castSession) {
        console.log('セッションがありません');
        return;
    }

    const mediaInfo = new cast.framework.media.MediaInfo('https://raw.githubusercontent.com/kswmch/test/main/chromecast/assets/oshimai.png', 'image/png');
    mediaInfo.metadata = new cast.framework.media.PhotoMediaMetadata();
    mediaInfo.metadata.title = '今日はおしまい！';
    mediaInfo.metadata.subtitle = 'また明日遊ぼうね 😊';

    const request = new cast.framework.media.LoadRequest(mediaInfo);
    castSession.loadMedia(request).then(
        function() {
            console.log('メディア読み込み成功');
        },
        function(error) {
            console.error('メディア読み込みエラー:', error);
        }
    );
}

// Cast APIの初期化
function initializeCastApi() {
    try {
        console.log('Initializing Cast API...');
        castContext = cast.framework.CastContext.getInstance();
        castContext.setOptions({
            receiverApplicationId: APPLICATION_ID,
            autoJoinPolicy: 'origin_scoped'
        });

        const endButton = document.getElementById('endButton');
        const statusElement = document.getElementById('status');

        player = new cast.framework.RemotePlayer();
        playerController = new cast.framework.RemotePlayerController(player);

        // セッション状態の監視
        castContext.addEventListener(
            cast.framework.CastContextEventType.SESSION_STATE_CHANGED,
            function(event) {
                console.log('セッション状態変更:', event.sessionState);
                switch (event.sessionState) {
                    case cast.framework.SessionState.SESSION_STARTED:
                    case cast.framework.SessionState.SESSION_RESUMED:
                        castSession = castContext.getCurrentSession();
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

        // 終了ボタンのイベントリスナー
        endButton.addEventListener('click', function() {
            if (castSession) {
                castSession.endSession(true);
            }
        });

        console.log('Cast API initialized successfully');
    } catch (error) {
        console.error('Error initializing Cast API:', error);
    }
}

// Cast APIが利用可能になったら初期化
window.__onGCastApiAvailable = function(isAvailable) {
    if (isAvailable) {
        console.log('Cast API is available through callback');
        initializeCastApi();
    } else {
        console.log('Cast API is not available');
    }
};
