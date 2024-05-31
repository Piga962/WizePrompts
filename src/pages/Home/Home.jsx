import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import "./Home.css";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: "sk-proj-RkaxSDCw5kJtbE6CLzvtT3BlbkFJFgVeMajFe48754K1Oy4N", dangerouslyAllowBrowser: true });

const Home = ({username}) => {
    const navigate = useNavigate();
    const [conversations, setConversations] = useState([]);
    const [categories, setCategories] = useState([]);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Fetch conversations and categories from the server
        // Example:
        // fetch('/api/conversations')
        //     .then(response => response.json())
        //     .then(data => setConversations(data));
        // fetch('/api/categories')
        //     .then(response => response.json())
        //     .then(data => setCategories(data));
    }, []);

    const handleLogout = () => {
        // Handle logout logic here
        navigate('/login');
    };

    const handleConversationSelect = (conversationId) => {
        // Handle conversation selection logic here
    };

    const handlePromptSubmit = async ({ prompt, selectedCategory, newCategory, file }) => {
        // Call OpenAI API
        const stream = await openai.chat.completions.create({
            model: "gpt-3.5-turbo-16k",
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: prompt }
            ], stream: true,
        });

        let result = '';
        for await (const chunk of stream) {
            result += chunk.choices[0]?.delta?.content || "";
        }

        setMessages(prevMessages => [
            { prompt, response: result },
            ...prevMessages
        ]);
    };

    return (
        <div className="Home">
            <Sidebar 
                username={username} 
                conversations={conversations} 
                onConversationSelect={handleConversationSelect} 
                onLogout={handleLogout}
            />
            <MainContent 
                onPromptSubmit={handlePromptSubmit} 
                categories={categories} 
                onCategoryCreate={(category) => setCategories([...categories, category])}
                messages={messages}
            />
        </div>
    );
};

export default Home;
