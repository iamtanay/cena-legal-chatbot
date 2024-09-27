import React, { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';

const ChatWindow = ({ messages }) => {
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="chat-window">
            {messages.map((msg, index) => (
                <ChatMessage key={index} message={msg.text} isUser={msg.isUser} />
            ))}
            <div ref={messagesEndRef} />
        </div>
    );
};

export default ChatWindow;