
import { useState, useRef } from 'react';
import './css/ChatWidget.css';
import chatboxMusic from '../music/chatbox.mp3';
import chatIcon from '../images/icon1.png';
import chatDeco from '../images/icon2.png';

function ChatWidget() {
  const [open, setOpen] = useState(false);
  const musicRef = useRef(null);
  const iconAudioRef = useRef(null);

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const handleToggle = () => {
    if (!open && iconAudioRef.current) iconAudioRef.current.play();
    if (!open && musicRef.current) musicRef.current.play();
    setOpen(!open);
    setWaiting(false);
    setInput("");
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages(prev => [
        ...prev,
        { text: input, bot: false },
        { text: 'Trợ lý đang được phát triển...', bot: true }
      ]);
      setInput("");
    }
  };

  return (
    <>
      {/* Âm thanh ẩn */}
      {/* âm thanh click icon */}
      <audio ref={iconAudioRef} src="/sounds/chat-open.mp3" preload="auto" />
      {/* nhạc khi mở chat */}
      <audio ref={musicRef} src={chatboxMusic} preload="auto" />

      {/* Icon nhỏ */}
      {!open && (
        <button className="cw-icon-btn" onClick={handleToggle} aria-label="Mở chat">
          <img
            src={chatIcon}
            alt="Chat icon"
            className="cw-icon"
          />
        </button>
      )}

      {/* Chatbox */}
      {open && (
        <div className="cw-box">
          {/* Hình trang trí trên đỉnh chat */}
          <img src={chatDeco} alt="decor" className="cw-deco" />
          <div className="cw-header">
            <h2>Trợ lý Otter</h2>
            <button aria-label="Đóng chat" onClick={handleToggle}>
              ✕
            </button>
          </div>

          <div className="cw-body">
            <div className="cw-msg">
              👋 Xin chào! Bạn cần giúp gì hôm nay?
            </div>
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`cw-msg${msg.bot ? ' bot' : ' user'}`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <form className="cw-input-wrap" onSubmit={handleSubmit}>
            <div className="cw-input-row">
              <input
                type="text"
                placeholder="Nhập tin nhắn..."
                className="cw-input"
                value={input}
                onChange={handleInputChange}
              />
              <button type="submit" className="cw-submit-btn" aria-label="Gửi">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default ChatWidget;
