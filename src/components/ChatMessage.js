import React from 'react';

const ChatMessage = ({ message, isUser }) => {
    return (
        <div className={isUser ? 'user-message' : 'bot-message'} style={{ whiteSpace: 'pre-line' }}>
            {message}
        </div>
    );
};

export default ChatMessage;