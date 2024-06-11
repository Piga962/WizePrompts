import React from 'react';

const Conversations = ({conversations}) => {
    return (
        <>
        <ul>
            {conversations.map((conversation, index) =>(
                <li key = {index}>
                    <strong>{conversation.title}</strong><br/>
                </li>
            ))}
        </ul>
        </>
    );
}

export default Conversations;