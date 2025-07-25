import React, { useState, useEffect } from 'react';

const App = () => {
  const [currentState, setCurrentState] = useState('name-input'); // 'name-input', 'initial', 'chat', 'final'
  const [childName, setChildName] = useState('');
  const [conversation, setConversation] = useState([]);
  const [currentRound, setCurrentRound] = useState(0);
  const [callDuration, setCallDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState('');

  // 現在時刻を更新
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('ja-JP', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // 通話時間を更新
  useEffect(() => {
    let interval;
    if (currentState === 'chat') {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [currentState]);

  // 通話時間をフォーマット
  const formatCallDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // 鬼の会話データ
  const oniConversations = [
    {
      message: `……${childName}……見ているぞ……`,
      options: [
        'こんにちは',
        '怖いです',
        '何ですか？'
      ],
      responses: [
        '……こんにちは……だが、お前の悪い行いも見ている……',
        '……怖がるな……悪いことをしなければ怖くない……',
        '……お前の悪い行いについて話したい……'
      ]
    },
    {
      message: '……最近、言うことを聞かないそうだな……',
      options: [
        'すみません',
        '頑張ります',
        'でも難しいです'
      ],
      responses: [
        '……謝るだけでは足りない……行動で示せ……',
        '……その言葉を信じる……だが、約束を守れ……',
        '……難しいのは分かる……だが、努力は必要だ……'
      ]
    },
    {
      message: '……お母さんやお父さんを困らせている……',
      options: [
        '本当にすみません',
        'もうしません',
        '気をつけます'
      ],
      responses: [
        '……本当に反省しているか……',
        '……もうしないと約束するか……',
        '……気をつけるだけでは足りない……'
      ]
    },
    {
      message: '……鬼は悪い子を連れて行く……',
      options: [
        '連れて行かないでください',
        'いい子になります',
        'お願いします'
      ],
      responses: [
        '……連れて行かないでほしいなら、いい子になれ……',
        '……いい子になるなら、見守ってやる……',
        '……お願いするなら、約束を守れ……'
      ]
    },
    {
      message: '……最後に聞く……いい子になるか……',
      options: [
        'はい、いい子になります',
        '頑張ります',
        '約束します'
      ],
      responses: [
        '……よし……約束を守れ……',
        '……頑張るだけでは足りない……行動で示せ……',
        '……約束を破ったら、また来る……'
      ]
    }
  ];

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (childName.trim()) {
      setCurrentState('initial');
    }
  };

  const startCall = () => {
    setCurrentState('chat');
    setCallDuration(0);
    setConversation([{
      type: 'oni',
      text: oniConversations[0].message
    }]);
  };

  const handleOptionSelect = (optionIndex) => {
    const currentConversation = oniConversations[currentRound];
    const selectedResponse = currentConversation.responses[optionIndex];
    
    // ユーザーの選択を追加
    setConversation(prev => [...prev, {
      type: 'user',
      text: currentConversation.options[optionIndex]
    }]);

    // 鬼の応答を追加
    setConversation(prev => [...prev, {
      type: 'oni',
      text: selectedResponse
    }]);

    // 次のラウンドへ
    if (currentRound < oniConversations.length - 1) {
      setTimeout(() => {
        setCurrentRound(prev => prev + 1);
        setConversation(prev => [...prev, {
          type: 'oni',
          text: oniConversations[currentRound + 1].message
        }]);
      }, 1000);
    } else {
      // 最終メッセージ
      setTimeout(() => {
        setConversation(prev => [...prev, {
          type: 'oni',
          text: '……約束を守れ……いい子になれ……'
        }]);
        setTimeout(() => {
          setCurrentState('final');
        }, 2000);
      }, 1000);
    }
  };

  const restart = () => {
    setCurrentState('name-input');
    setChildName('');
    setConversation([]);
    setCurrentRound(0);
    setCallDuration(0);
  };

  // 電話のヘッダーコンポーネント
  const PhoneHeader = () => (
    <div className="phone-header">
      <div className="phone-status">
        <div className="status-dot"></div>
        <span>通話中</span>
      </div>
      <div className="phone-time">{currentTime}</div>
      <div className="phone-battery">
        <div className="battery-icon">
          <div className="battery-level"></div>
        </div>
        <span>60%</span>
      </div>
    </div>
  );

  // 通話情報コンポーネント
  const CallInfo = () => (
    <div className="call-info">
      <div className="caller-name">👹 鬼</div>
      <div className="caller-status">通話中</div>
      <div className="call-duration">{formatCallDuration(callDuration)}</div>
    </div>
  );

  const renderNameInput = () => (
    <div className="app">
      <div className="phone-screen">
        <PhoneHeader />
        <div className="oni-image">
          <div className="oni-placeholder">👹</div>
        </div>
        <form onSubmit={handleNameSubmit}>
          <input
            type="text"
            className="name-input"
            placeholder="あなたの名前を入力してください"
            value={childName}
            onChange={(e) => setChildName(e.target.value)}
            required
          />
          <button type="submit" className="call-button">
            名前を登録
          </button>
        </form>
        <div className="phone-footer">
          <div className="home-button">🏠</div>
        </div>
      </div>
    </div>
  );

  const renderInitial = () => (
    <div className="app">
      <div className="phone-screen">
        <PhoneHeader />
        <CallInfo />
        <div className="oni-image">
          <div className="oni-placeholder">👹</div>
        </div>
        <button className="call-button" onClick={startCall}>
          電話に出る
        </button>
        <div className="phone-footer">
          <div className="home-button">🏠</div>
        </div>
      </div>
    </div>
  );

  const renderChat = () => {
    const currentConversation = oniConversations[currentRound];
    
    return (
      <div className="app">
        <div className="phone-screen">
          <PhoneHeader />
          <CallInfo />
          <div className="oni-image">
            <div className="oni-placeholder">👹</div>
          </div>
          <div className="chat-container">
            {conversation.map((msg, index) => (
              <div key={index} className={`message ${msg.type}-message`}>
                {msg.text}
              </div>
            ))}
          </div>
          {currentRound < oniConversations.length && (
            <div className="options">
              {currentConversation.options.map((option, index) => (
                <button
                  key={index}
                  className="option-button"
                  onClick={() => handleOptionSelect(index)}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
          <div className="phone-footer">
            <div className="home-button">🏠</div>
          </div>
        </div>
      </div>
    );
  };

  const renderFinal = () => (
    <div className="app">
      <div className="phone-screen">
        <PhoneHeader />
        <CallInfo />
        <div className="oni-image">
          <div className="oni-placeholder">👹</div>
        </div>
        <div className="final-message">
          {childName}、約束を守って<br />
          いい子になりなさい……
        </div>
        <button className="restart-button" onClick={restart}>
          もう一度始める
        </button>
        <div className="phone-footer">
          <div className="home-button">🏠</div>
        </div>
      </div>
    </div>
  );

  switch (currentState) {
    case 'name-input':
      return renderNameInput();
    case 'initial':
      return renderInitial();
    case 'chat':
      return renderChat();
    case 'final':
      return renderFinal();
    default:
      return renderNameInput();
  }
};

export default App; 