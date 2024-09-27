import React, { useState } from 'react';
import ChatInput from './components/ChatInput';
import ChatWindow from './components/ChatWindow';
import axios from 'axios';
import './styles.css';

const App = () => {
    const [messages, setMessages] = useState([]);

    const sendMessage = async (message) => {
        setMessages([...messages, { text: message, isUser: true }]);
    
        try {
            const response = await axios.post('http://127.0.0.1:5000/api/cena-chat', { message });
            const botMessage = response.data.message;
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: botMessage, isUser: false }
            ]);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                const botErrorMessage = error.response.data.message;
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { text: botErrorMessage, isUser: false }
                ]);
            } else {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { text: "Sorry, something went wrong.", isUser: false }
                ]);
            }
        }
    };

    const handleDownloadSummary = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/api/generate-summary', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to generate summary');
            }

            // Create a blob and trigger the download
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'chat_summary.pdf';  // PDF filename
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } catch (error) {
            console.error('Error generating summary:', error);
        }
    };

    return (
        <div className="app">
            <div className="chat-container">
                {/* Heading Section */}
                <div className="chat-heading">
                    <div className="heading-center">
                        <h1>CENA</h1>
                        <p>Comprehensive E-legal Network Assistant</p>
                    </div>
                    <button onClick={handleDownloadSummary} className="download-summary-btn">
                        Download Summary
                    </button>
                </div>
                {/* Chat Window */}
                <ChatWindow messages={messages} />
                
                {/* Chat Input */}
                <ChatInput onSend={sendMessage} />

            </div>
        </div>
    );
};

export default App;