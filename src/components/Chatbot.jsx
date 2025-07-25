import React, { useState, useRef, useEffect } from 'react';

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! I am Farouk’s AI assistant. Ask me anything about Farouk!' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);

  const handleSend = async (e) => {
    e.preventDefault();
  
    if (!input.trim()) return;
  
    // Save input locally before clearing
    const userMessage = input;
  
    setMessages(prev => [...prev, { sender: 'user', text: userMessage }]);
    setInput(''); // clear input
  
    try {
      // Show a temporary "thinking" message
      setMessages(prev => [...prev, { sender: 'bot', text: 'Thinking...' }]);
  
      const response = await fetch('https://portfolio12345-backend.onrender.com/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });
  
      const data = await response.json();
  
      // Remove the temporary "thinking..." message and show the actual response
      setMessages(prev => [
        ...prev.slice(0, -1),
        { sender: 'bot', text: data.reply || 'Something went wrong' },
      ]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [
        ...prev.slice(0, -1),
        { sender: 'bot', text: 'Error communicating with server.' },
      ]);
    }
  };
  return (
    <>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 1000,
          borderRadius: '50%',
          width: 56,
          height: 56,
          background: '#2563eb',
          color: '#fff',
          border: 'none',
          fontSize: 28,
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          cursor: 'pointer',
        }}
        aria-label="Open chatbot"
      >
        💬
      </button>
      {open && (
        <div
          style={{
            position: 'fixed',
            bottom: 90,
            right: 24,
            width: 320,
            maxHeight: 480,
            background: '#fff',
            borderRadius: 12,
            boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 1001,
          }}
        >
          <div style={{ padding: 16, borderBottom: '1px solid #eee', fontWeight: 600, color: '#2563eb' }}>
            Farouk’s AI Chatbot
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: 16, background: '#f8fafc' }}>
            {messages.map((msg, i) => (
              <div key={i} style={{
                marginBottom: 12,
                textAlign: msg.sender === 'user' ? 'right' : 'left',
              }}>
                <span style={{
                  display: 'inline-block',
                  background: msg.sender === 'user' ? '#2563eb' : '#e0e7ef',
                  color: msg.sender === 'user' ? '#fff' : '#222',
                  borderRadius: 16,
                  padding: '8px 14px',
                  maxWidth: '80%',
                  wordBreak: 'break-word',
                }}>{msg.text}</span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSend} style={{ display: 'flex', borderTop: '1px solid #eee', padding: 8, background: '#fff' }}>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask me about Farouk..."
              style={{ flex: 1, border: 'none', outline: 'none', fontSize: 16, padding: 8, borderRadius: 8 }}
            />
            <button type="submit" style={{ marginLeft: 8, background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 16px', fontWeight: 600, cursor: 'pointer' }}>
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Chatbot; 