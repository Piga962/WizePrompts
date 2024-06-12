import React from 'react';

const Conversations = ({conversations, onConversationSelect}) => {
    return (
        <>
        <ul>
            {conversations.map((conversation, index) =>(
                <li key = {index} onClick={() => onConversationSelect(conversation)}>
                    <strong>{conversation.title}</strong><br/>
                </li>
            ))}
        </ul>
        </>
    );
}

export default Conversations;