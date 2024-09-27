import React, { useState, useEffect } from 'react';

const ChatInput = ({ onSend }) => {
    const [inputValue, setInputValue] = useState('');

    // This effect will run when the component mounts
    useEffect(() => {
        // Function to reset chat history on the backend
        const resetChatHistory = async () => {
            try {
                await fetch('http://127.0.0.1:5000/api/chat-reset', {  // Update this URL if needed
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            } catch (error) {
                console.error('Error resetting chat history:', error);
            }
        };

        resetChatHistory();
    }, []); // Empty dependency array means this runs only on mount

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim()) {
            onSend(inputValue);
            setInputValue('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="chat-input-form">
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="chat-input"
            />
            <button type="submit" className="chat-submit-btn">Send</button>
        </form>
    );
};

export default ChatInput;