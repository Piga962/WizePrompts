import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import './Home.css';

const Home = ({ user, setUser }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [messages, setMessages] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [message, setMessage] = useState({
        user_id: user ? user.id : null, // Verificar si user no es null
        message: '',
        answer: '',
        file_id: null,
        conversation_id: '',
    });
    const [getDoc, setGetDoc] = useState({
        user_id: user ? user.id : null,
        category_id: '',
    })
    console.log(documents);
    console.log(getDoc);
    useEffect(() => {
        if (selectedConversation) {
            fetchMessages(selectedConversation.title);
            setGetDoc({
                user_id: user.id,
                category_id: selectedConversation.category_id,
            });
            fetchDocuments();
        }
    }, [selectedConversation]);

    const [conversations, setConversations] = useState([]);     
    
    const fetchConversations = async () => {
        if (user) { // Verificar si user no es null
            try {
                const response = await fetch(`http://localhost:3001/conversations/${user.id}`);
                const data = await response.json();
                setConversations(data);
            } catch (error) {
                console.log(error);
            }
        }
    };

    useEffect(() => {
        fetchConversations();
        fetchDocuments();
    }, [user]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const fetchMessages = async (conversationTitle) => {
        try {
            const response = await fetch(`http://localhost:3001/messages/${conversationTitle}`);
            const data = await response.json();
            setMessages(data);
            fetchDocuments();
        } catch (error) {
            console.log(error);
        }
    };

    const fetchDocuments = async () =>{
        try{
            const response = await fetch('http://localhost:3001/documents/get', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(getDoc),
            }
            );
            console.log(response);
            if(response.status === 200){
                const data = await response.json();
                console.log(data);
                setDocuments(data);
            }
        }catch(error){
            console.log(error);
        }
    }

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
                fetchDocuments();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleGenerateHelp = async ({prompt, pastMessages, pastAnswers, documents}) => {
        console.log(prompt, pastMessages, pastAnswers, documents)
        try {
            const res = await fetch(`http://localhost:3001/chat/context?message=${prompt}?pastMessages=${pastMessages}?pastAnswers${pastAnswers}?documents=${documents}`);
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
                conversations={conversations}
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
                documents={documents}
                fetchDocuments={fetchDocuments}
            />
        </div>
    );
};

export default Home;
