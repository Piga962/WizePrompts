import React from 'react';
import './Sidebar.css';

const Sidebar = ({ username, conversations, onConversationSelect, onLogout }) => {
    return (
        <div className="Sidebar">
            <div className="User">
                <h3>{username}</h3>
                <button onClick={onLogout}>Logout</button>
            </div>
            <div className="Conversations">
                <h4>Conversations</h4>
                <ul>
                    {conversations.map((conversation) => (
                        <li key={conversation.id} onClick={() => onConversationSelect(conversation.id)}>
                            {conversation.title}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
