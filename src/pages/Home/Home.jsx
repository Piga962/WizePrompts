import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import './Home.css';

const Home = ({ user, setUser }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [messages, setMessages] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [message, setMessage] = useState({
        user_id: user.id,
        message: '',
        answer: '',
        file_id: null,
        conversation_id: '',
    });

    useEffect(() => {
        if (selectedConversation) {
            fetchMessages(selectedConversation.title);
        }
    }, [selectedConversation]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const fetchMessages = async (conversationTitle) => {
        try {
            const response = await fetch(`http://localhost:3001/messages/${conversationTitle}`);
            const data = await response.json();
            setMessages(data);
        } catch (error) {
            console.log(error);
        }
    };

    const createMessage = async (newMessage) => {
        try {
            const response = await fetch('http://localhost:3001/messages/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newMessage),
            });
            if (response.status === 201) {
                alert('Message created successfully');
                fetchMessages(newMessage.conversation_id);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleGenerateHelp = async (prompt) => {
        try {
            const res = await fetch(`http://localhost:3001/chat/context?message=${prompt}`);
            const data = await res.json();
            return data.response;
        } catch (error) {
            console.log(error);
            alert('Failed to submit prompt');
        }
    };

    const handleConversationSelect = (conversation) => {
        setSelectedConversation(conversation);
        setMessage((prevMessage) => ({ ...prevMessage, conversation_id: conversation.title }));
        fetchMessages(conversation.title);
    };

    return (
        <div className="Home">
            <Sidebar
                user={user}
                setUser={setUser}
                isOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
                onConversationSelect={handleConversationSelect}
            />
            <MainContent
                createMessage={createMessage}
                categories={categories}
                messages={messages}
                isSidebarOpen={isSidebarOpen}
                selectedConversation={selectedConversation}
                setMessage={setMessage}
                handleGenerateHelp={handleGenerateHelp}
                fetchMessages={fetchMessages}
                user={user}
                message={message}
            />
        </div>
    );
};

export default Home;