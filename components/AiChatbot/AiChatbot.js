'use client';
import { useState, useRef, useEffect } from 'react';
import styles from './AiChatbot.module.css';

const QUICK_REPLIES = [
  '🏠 Household Shifting',
  '🏢 Corporate Relocation',
  '🏭 Industrial Shifting',
  '🚗 Vehicle Transportation'
];

export default function AiChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Load chat history from sessionStorage on mount
  useEffect(() => {
    const saved = sessionStorage.getItem('npm_chat_history');
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (e) {
        initializeDefaultChat();
      }
    } else {
      initializeDefaultChat();
    }
  }, []);

  // Save chat history to sessionStorage on updates
  useEffect(() => {
    if (messages.length > 0) {
      sessionStorage.setItem('npm_chat_history', JSON.stringify(messages));
    }
  }, [messages]);

  // Scroll to bottom helper
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [messages, isTyping, isOpen]);

  const initializeDefaultChat = () => {
    setMessages([
      {
        sender: 'bot',
        text: "Namaste! I'm Dev, your AI Shifting Coordinator. 🚚 Ask me anything about home shifting, packing charges, or PSU billing claim checklists!"
      }
    ]);
  };

  const handleSendMessage = async (text) => {
    if (!text.trim()) return;

    const userMsg = { sender: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg] })
      });
      const data = await res.json();

      if (res.ok) {
        setMessages(prev => [...prev, { sender: 'bot', text: data.reply }]);
        
        // Dynamic notification if lead was registered
        if (data.leadCaptured) {
          setMessages(prev => [...prev, {
            sender: 'bot',
            text: "✅ Booking info parsed successfully! A corporate shifting surveyor is logging your details and will call you back shortly. You can also chat directly on WhatsApp at 9835168368."
          }]);
        }
      } else {
        // Fallback for API limit or connection errors
        if (res.status === 429) {
          setMessages(prev => [...prev, {
            sender: 'bot',
            text: "⚠️ We are experiencing brief traffic limits on the AI channel. Please wait 10 seconds and try again, or chat directly on WhatsApp!"
          }]);
        } else {
          setMessages(prev => [...prev, {
            sender: 'bot',
            text: "I'm having a connection delay with the dispatch desk. Let's chat directly on WhatsApp at 9835168368, or call us directly!"
          }]);
        }
      }
    } catch (err) {
      setMessages(prev => [...prev, {
        sender: 'bot',
        text: "Connection timeout. Please contact our Dhanbad HQ hotline directly at 9835168368 for immediate bookings."
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const getWhatsAppHandoverLink = () => {
    const chatLog = messages
      .map(m => `${m.sender === 'user' ? 'Client' : 'Dev AI'}: ${m.text}`)
      .join('\n');
    const msg = `*National Packers & Movers — Chatbot Handover*\n\n` +
      `_Chat Summary:_\n${chatLog.substring(chatLog.length - 800)}\n\n` +
      `Hello, I would like to speak to a coordinator regarding my relocation request!`;
    return `https://wa.me/919835168368?text=${encodeURIComponent(msg)}`;
  };

  return (
    <>
      {/* ── Floating Launcher ── */}
      <button 
        className={styles.launcher} 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Shifting Assistant Chatbot"
      >
        {isOpen ? '❌' : '💬'}
      </button>

      {/* ── Chat Window Box ── */}
      {isOpen && (
        <div className={styles.chatWindow}>
          {/* Header */}
          <div className={styles.chatHeader}>
            <div className={styles.botPulse} />
            <div>
              <h3>Dev — Shifting Coordinator</h3>
              <p>Active 24/7 • National Packers & Movers</p>
            </div>
          </div>

          {/* Conversation messages list */}
          <div className={styles.messageBox}>
            {messages.map((msg, idx) => (
              <div key={idx} className={msg.sender === 'user' ? styles.userRow : styles.botRow}>
                <div className={styles.messageBubble}>
                  {msg.text}
                  {msg.text.includes("WhatsApp") && (
                    <div style={{ marginTop: '0.75rem', display: 'flex', gap: '8px' }}>
                      <a 
                        href={getWhatsAppHandoverLink()} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn btn-primary btn-sm"
                        style={{ padding: '4px 10px', fontSize: '0.7rem' }}
                      >
                        💚 WhatsApp Chat
                      </a>
                      <a 
                        href="tel:9835168368" 
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '4px 10px', fontSize: '0.7rem' }}
                      >
                        📞 Call HQ
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className={styles.botRow}>
                <div className={styles.typingIndicator}>
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies chips */}
          <div className={styles.quickRepliesList}>
            {QUICK_REPLIES.map((reply, idx) => (
              <button 
                key={idx} 
                className={styles.chip} 
                onClick={() => handleSendMessage(reply)}
                type="button"
              >
                {reply}
              </button>
            ))}
          </div>

          {/* Input field area */}
          <form 
            className={styles.inputArea} 
            onSubmit={(e) => { 
              e.preventDefault(); 
              handleSendMessage(inputVal); 
            }}
          >
            <input
              type="text"
              placeholder="Ask about rates, route timelines, invoice..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
            />
            <button type="submit" aria-label="Send message">➔</button>
          </form>
        </div>
      )}
    </>
  );
}
