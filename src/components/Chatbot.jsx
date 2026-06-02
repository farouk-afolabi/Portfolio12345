import React, { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { FiX, FiSend, FiCpu } from 'react-icons/fi';
import { theme } from '../styles/theme';

const pulse = keyframes`
  0%, 100% { box-shadow: 0 4px 16px rgba(37, 99, 235, 0.4), 0 0 0 0 rgba(37, 99, 235, 0.4); }
  50% { box-shadow: 0 4px 16px rgba(37, 99, 235, 0.4), 0 0 0 10px rgba(37, 99, 235, 0); }
`;

const ToggleButton = styled.button`
  position: fixed;
  bottom: 28px;
  right: 28px;
  z-index: 1000;
  border-radius: 50px;
  height: 52px;
  padding: 0 20px;
  background: ${theme.colors.primary};
  color: #fff;
  border: none;
  font-size: ${theme.fontSizes.sm};
  font-weight: 700;
  letter-spacing: 0.02em;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  animation: ${pulse} 2.5s ease-in-out infinite;
  transition: background 0.2s ease, transform 0.2s ease;

  svg { font-size: 18px; flex-shrink: 0; }

  &:hover {
    background: ${theme.colors.secondary};
    transform: scale(1.05);
    animation: none;
    box-shadow: 0 6px 20px rgba(37, 99, 235, 0.5);
  }
`;

const ChatWindow = styled.div`
  position: fixed;
  bottom: 90px;
  right: 24px;
  width: 320px;
  max-height: 480px;
  background: ${theme.colors.backgroundDark};
  border-radius: 14px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.45);
  border: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  flex-direction: column;
  z-index: 1001;
  overflow: hidden;
`;

const ChatHeader = styled.div`
  padding: 14px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  font-weight: 600;
  font-size: ${theme.fontSizes.base};
  color: ${theme.colors.primary};
  background: rgba(255, 255, 255, 0.03);
  display: flex;
  align-items: center;
  gap: 8px;

  &::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #22c55e;
    flex-shrink: 0;
  }
`;

const MessagesArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 14px;
  background: rgba(255, 255, 255, 0.02);
  display: flex;
  flex-direction: column;
  gap: 10px;

  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-track { background: transparent; }
  &::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }
`;

const MessageRow = styled.div`
  display: flex;
  justify-content: ${({ isUser }) => isUser ? 'flex-end' : 'flex-start'};
`;

const Bubble = styled.span`
  display: inline-block;
  background: ${({ isUser }) => isUser ? theme.colors.primary : 'rgba(255,255,255,0.07)'};
  color: ${({ isUser }) => isUser ? '#fff' : theme.colors.textDark};
  border-radius: ${({ isUser }) => isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px'};
  padding: 9px 13px;
  max-width: 82%;
  font-size: ${theme.fontSizes.sm};
  line-height: 1.5;
  word-break: break-word;
  white-space: pre-wrap;
  border: ${({ isUser }) => isUser ? 'none' : '1px solid rgba(255,255,255,0.08)'};
`;

const InputRow = styled.form`
  display: flex;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding: 8px;
  background: rgba(255, 255, 255, 0.02);
  gap: 8px;
`;

const ChatInput = styled.input`
  flex: 1;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  color: ${theme.colors.textDark};
  outline: none;
  font-size: ${theme.fontSizes.sm};
  padding: 8px 12px;
  border-radius: 8px;
  transition: ${theme.transitions.default};

  &::placeholder { color: rgba(255,255,255,0.3); }
  &:focus { border-color: ${theme.colors.primary}; }
`;

const SendButton = styled.button`
  background: ${theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 8px 14px;
  font-weight: 600;
  font-size: ${theme.fontSizes.sm};
  cursor: pointer;
  transition: ${theme.transitions.default};
  flex-shrink: 0;

  &:hover { background: ${theme.colors.secondary}; }
`;

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "Hi! I'm Farouk's AI assistant. Ask me anything about Farouk!" }
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

    const userMessage = input;
    setMessages(prev => [...prev, { sender: 'user', text: userMessage }]);
    setInput('');

    try {
      setMessages(prev => [...prev, { sender: 'bot', text: 'Thinking...' }]);

      const response = await fetch('https://portfolio12345-backend.onrender.com/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `Server error ${response.status}`);
      }

      setMessages(prev => [
        ...prev.slice(0, -1),
        { sender: 'bot', text: data.response || 'Something went wrong.' },
      ]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [
        ...prev.slice(0, -1),
        { sender: 'bot', text: "Sorry, I'm having trouble connecting right now. Try again in a moment!" },
      ]);
    }
  };

  return (
    <>
      <ToggleButton onClick={() => setOpen(o => !o)} aria-label="Open chatbot">
        {open ? <FiX /> : <><FiCpu /> Ask AI about me</>}
      </ToggleButton>
      {open && (
        <ChatWindow>
          <ChatHeader>Farouk's AI Assistant</ChatHeader>
          <MessagesArea>
            {messages.map((msg, i) => (
              <MessageRow key={i} isUser={msg.sender === 'user'}>
                <Bubble isUser={msg.sender === 'user'}>{msg.text}</Bubble>
              </MessageRow>
            ))}
            <div ref={messagesEndRef} />
          </MessagesArea>
          <InputRow onSubmit={handleSend}>
            <ChatInput
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask me about Farouk..."
            />
            <SendButton type="submit" aria-label="Send"><FiSend /></SendButton>
          </InputRow>
        </ChatWindow>
      )}
    </>
  );
};

export default Chatbot;
