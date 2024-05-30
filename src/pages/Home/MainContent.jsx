import React, { useState } from 'react';
import './MainContent.css';

const MainContent = ({ onPromptSubmit, categories, onCategoryCreate, messages }) => {
    const [prompt, setPrompt] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [newCategory, setNewCategory] = useState('');
    const [file, setFile] = useState(null);

    const handlePromptChange = (e) => setPrompt(e.target.value);
    const handleCategoryChange = (e) => setSelectedCategory(e.target.value);
    const handleNewCategoryChange = (e) => setNewCategory(e.target.value);
    const handleFileChange = (e) => setFile(e.target.files[0]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        return onPromptSubmit({ prompt, selectedCategory, newCategory, file });
        setPrompt(''); // Clear the prompt after submission
    };

    return (
        <div className="MainContent">
            <div className="Messages">
                {messages.map((message, index) => (
                    <div key={index} className="Message">
                        <div className="UserMessage">{message.prompt}</div>
                        <div className="ResponseMessage">{message.response}</div>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className="PromptForm">
                <textarea value={prompt} onChange={handlePromptChange} placeholder="Enter your prompt" required />
                <select value={selectedCategory} onChange={handleCategoryChange}>
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.name}>{category.name}</option>
                    ))}
                </select>
                <input type="text" value={newCategory} onChange={handleNewCategoryChange} placeholder="Or create a new category" />
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default MainContent;
