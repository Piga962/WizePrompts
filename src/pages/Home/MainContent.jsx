import React, { useState } from 'react';
import './MainContent.css';
import FileInput from './FileInput';

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
        await onPromptSubmit({ prompt, selectedCategory, newCategory, file });
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
                <div className="form-buttons-left">
                    <FileInput />
                    <select value={selectedCategory} onChange={handleCategoryChange} className="category-select">
                        <option value="">Categories</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.name}>{category.name}</option>
                        ))}
                    </select>
                    <input type="text" value = {newCategory} onChange={handleNewCategoryChange} placeholder="Create a new category"></input>
                </div>
                <textarea 
                    value={prompt} 
                    onChange={handlePromptChange} 
                    placeholder="Enter your prompt" 
                    required 
                    className="prompt-textarea" 
                />
                <button type="submit" className="submit-button"/>
            </form>
        </div>
    );
};

export default MainContent;
