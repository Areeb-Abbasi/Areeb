import React, { useState, useRef, useEffect } from 'react';
import { getAIResponse } from '../utils/ai';
import '../styles/chatbot.css';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Hey! I'm your fitness AI 🤖 Ask me anything about workouts, nutrition, or exercises!",
      sender: 'bot'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);


const handleSend = async () => {
  if (!input.trim() || isLoading) return;

  // Add user message
  const userMessage = { text: input, sender: 'user' };
  setMessages(prev => [...prev, userMessage]);
  const currentInput = input;
  setInput('');
  setIsLoading(true);

  try {
    
    const aiResponse = await getAIResponse(currentInput);
    
    setMessages(prev => [...prev, { text: aiResponse, sender: 'bot' }]);
  } catch (error) {
    console.error('Error in handleSend:', error);
    setMessages(prev => [...prev, { 
      text: "Sorry, I encountered an error. Please try again.", 
      sender: 'bot' 
    }]);
  } finally {
    setIsLoading(false);
  }
};

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        text: "Hey! I'm your fitness AI 🤖 Ask me anything about workouts, nutrition, or exercises!",
        sender: 'bot'
      }
    ]);
  };

  const quickQuestions = [
    "Good beginner workout?",
    "Protein needs?",
    "Weight loss tips?",
    "Home exercises?",
    "Best supplements?"
  ];

  return (
    <>
      <button className="chatbot-button" onClick={() => setIsOpen(true)}>
        🤖 Fitness AI
      </button>

      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div>
              <h3>Fitness AI Assistant</h3>
              <p style={{ fontSize: '12px', margin: 0, opacity: 0.8 }}>
                • Powered by Groq
              </p>
            </div>
            <div style={{ display: 'flex', gap: '5px' }}>
              <button className="clear-btn" onClick={clearChat} title="Clear chat">
                🗑️
              </button>
              <button className="close-btn" onClick={() => setIsOpen(false)}>
                ×
              </button>
            </div>
          </div>

          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.sender}`}>
                {message.text}
              </div>
            ))}
            {isLoading && (
              <div className="message bot thinking">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {messages.length <= 2 && (
            <div style={{ padding: '10px 15px', borderTop: '1px solid #e1e5e9', borderBottom: '1px solid #e1e5e9' }}>
              <p style={{ fontSize: '12px', margin: '0 0 8px 0', color: '#666' }}>
                Quick questions:
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setInput(question);
                      setTimeout(() => handleSend(), 100);
                    }}
                    style={{
                      background: 'transparent',
                      border: '1px solid #667eea',
                      color: '#667eea',
                      padding: '4px 8px',
                      borderRadius: '15px',
                      fontSize: '11px',
                      cursor: 'pointer'
                    }}
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="chatbot-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about fitness..."
              disabled={isLoading}
            />
            <button onClick={handleSend} disabled={isLoading}>
              {isLoading ? '...' : 'Send'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot; 