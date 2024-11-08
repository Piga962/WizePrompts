import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import Conversations from './components/Conversations';
import WizelineLogo from '../../images/wizeline-sin-fondo.png';

const Sidebar = ({ user, setUser, isOpen, toggleSidebar, onConversationSelect }) => {
    const navigate = useNavigate();
    const [showForm, setShowForm] = useState(false);
    const [conversation, setConversation] = useState({
        user_id: user ? user.id : '', // Verificar si user no es null
        title: '',
        category_id: '',
    });
    const [conversations, setConversations] = useState([]);

    const handleConversationChange = (e) => {
        const { name, value } = e.target;
        setConversation({ ...conversation, [name]: value });
    }

    const handleLogout = () => {
        setUser(null);
        navigate("/login");
    };

    const fetchConversations = async () => {
        if (user) { // Verificar si user no es null
            try {
                const res = await fetch(`http://localhost:3001/conversations/${user.id}`);
                const data = await res.json();
                setConversations(data);
            } catch (error) {
                console.log(error);
            }
        }
    };

    const createConversation = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3001/conversations`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(conversation)
            });
            if (response.status === 200) {
                setShowForm(false);
                setConversation({ user_id: user.id, title: '', category_id: '' });
                alert('Conversation created successfully');
                fetchConversations();
            } else {
                alert('Failed to create conversation');
                console.log(response);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchConversations();
    }, [user]);

    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <div className="sidebar-header">
                <img src={WizelineLogo} alt="logo" className="wizeline-logo"/><h2 style={{overflow: 'hidden', textWrap: 'balance'}}> {user ? user.name : 'Guest'}</h2>
            </div>
            <button onClick={handleLogout} className="logout-button">Logout</button>

            {isOpen && (
                <div className="sidebar-content">
                    
                    <button onClick={() => setShowForm(true)} className="create-button">
                        Create New Conversation
                    </button>

                    {showForm && (
                        <form onSubmit={createConversation} className="create-conversation-form">
                            <input
                                name="title"
                                type="text"
                                placeholder="Conversation Title"
                                value={conversation.title}
                                onChange={handleConversationChange}
                                required
                            />
                            <input
                                name="category_id"
                                type="text"
                                placeholder="Category"
                                value={conversation.category_id}
                                onChange={handleConversationChange}
                                required
                            />
                            <button type="submit" className="create-button">Create</button>
                            <button type="button" onClick={() => setShowForm(false)} className="cancel-button">Cancel</button>
                        </form>
                    )}
                    <Conversations conversations={conversations} onConversationSelect={onConversationSelect} />

                </div>
            )}

            <button onClick={toggleSidebar} className={`toggle-button ${isOpen ? 'open' : ''}`}>
                {isOpen ? 'X' : '>>'}
            </button>
        </div>
    );
};

export default Sidebar;
