import React, { useState, useEffect } from 'react';
import './MainContent.css';
import FileInput from './FileInput';

const MainContent = ({ createMessage, categories, messages, selectedConversation, setMessage, handleGenerateHelp, fetchMessages, user, message }) => {
    const [prompt, setPrompt] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [newCategory, setNewCategory] = useState('');
    const [file, setFile] = useState(null);

    const handlePromptChange = (e) => setPrompt(e.target.value);
    const handleCategoryChange = (e) => setSelectedCategory(e.target.value);
    const handleNewCategoryChange = (e) => setNewCategory(e.target.value);
    const handleFileChange = (e) => setFile(e.target.files[0]);

    useEffect(() => {
        if (selectedConversation) {
            fetchMessages(selectedConversation.title);
        }
    }, [selectedConversation, message]); // Adding message to dependency array ensures UI updates when message changes

    const handleSubmit = async (e) => {
        e.preventDefault();

        const currentPrompt = prompt; // Store the current prompt
        setPrompt(''); // Clear the prompt field

        const answer = await handleGenerateHelp(currentPrompt);

        const updatedMessage = {
            user_id: user.id,
            message: currentPrompt,
            answer: answer,
            file_id: file ? file.id : null,
            conversation_id: selectedConversation.title,
        };

        await createMessage(updatedMessage);
        await fetchMessages(selectedConversation.title);
    };

    return (
        <div className="MainContent">
            {selectedConversation ? (
                <>
                    <div className="ConversationTitle">
                        <h2>{selectedConversation.title}</h2>
                    </div>
                    <div className="Messages">
                        {messages.map((msg, index) => (
                            <div key={index} className="Message">
                                <div className="UserMessage">{msg.message}</div>
                                <div className="ResponseMessage">{msg.answer}</div>
                            </div>
                        ))}
                    </div>
                    
                    <form onSubmit={handleSubmit} className="PromptForm">
                        <div className="form-buttons-left">
                            <FileInput onFileChange={handleFileChange} />
                            
                            <select value={selectedCategory} onChange={handleCategoryChange} className="category-select">
                                <option value="">Categories</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.name}>{category.name}</option>
                                ))}
                            </select>

                            <input
                                type="text"
                                value={newCategory}
                                onChange={handleNewCategoryChange}
                                placeholder="Create a new category"
                            />

                        </div>
                        <textarea
                            value={prompt}
                            onChange={handlePromptChange}
                            placeholder="Enter your prompt"
                            required
                            className="prompt-textarea"
                        />
                        <button type="submit" className="submit-button">Submit</button>
                    </form>
                </>
            ) : (
                <div className="NoConversationSelected">
                    <p>Please select a conversation to view messages.</p>
                </div>
            )}
        </div>
    );
};

export default MainContent;