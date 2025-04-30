// Cast SDKの初期化
window['__onGCastApiAvailable'] = function(isAvailable) {
  if (isAvailable) {
    initializeCastApi();
  }
};

function initializeCastApi() {
  // Cast Developer Consoleで取得したApp IDを設定
  const applicationId = '6AF191AA'; // ← ここを後で書き換える
  const sessionRequest = new chrome.cast.SessionRequest(applicationId);
  const apiConfig = new chrome.cast.ApiConfig(sessionRequest,
    sessionListener, // セッション状態のリスナー
    receiverListener); // Receiverの状態リスナー

  chrome.cast.initialize(apiConfig, onInitSuccess, onError);
}

function onInitSuccess() {
  console.log('Cast SDK initialized.');
}

function onError(message) {
  console.error('Cast SDK initialization error:', message);
}

let castSession = null;
const endButton = document.getElementById('endButton');

// セッション状態が変わったときの処理
function sessionListener(newSession) {
  castSession = newSession;
  if (castSession) {
    console.log('Session established:', castSession.sessionId);
    endButton.disabled = false; // セッションが確立したらボタンを有効化
    // セッションが切断されたときのリスナーを追加
    castSession.addUpdateListener(sessionUpdateListener);
  } else {
    console.log('Session ended.');
    endButton.disabled = true; // セッションが切れたらボタンを無効化
  }
}

// セッション状態の更新を監視
function sessionUpdateListener(isAlive) {
    if (!isAlive) {
        console.log('Session disconnected.');
        castSession = null;
        endButton.disabled = true;
    }
}

// Receiverの状態が変わったときの処理（今回は特に何もしない）
function receiverListener(availability) {
  if (availability === chrome.cast.ReceiverAvailability.AVAILABLE) {
    console.log('Receiver available.');
  } else {
    console.log('Receiver unavailable.');
  }
}

// 終了メッセージを送るボタンの処理
endButton.addEventListener('click', () => {
  if (castSession) {
    const namespace = 'urn:x-cast:com.example.casttimer'; // 独自の名前空間
    const message = { type: 'SHOW_END_SCREEN' }; // 送信するメッセージ

    castSession.sendMessage(namespace, message)
      .then(() => console.log('End message sent successfully.'))
      .catch(error => console.error('Error sending message:', error));
  } else {
    console.warn('No active session to send message.');
  }
}); 