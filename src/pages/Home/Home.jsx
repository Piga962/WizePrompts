import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import './Home.css';
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: "sk-proj-RkaxSDCw5kJtbE6CLzvtT3BlbkFJFgVeMajFe48754K1Oy4N", dangerouslyAllowBrowser: true });

const Home = ({ user, setUser }) => {

    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [conversations, setConversations] = useState([]);
    const [conversation, setConversation] = useState({
        user_id: user.id,
        title: '',
        category_id: '',
    });

    const [categories, setCategories] = useState([]);
    const [messages, setMessages] = useState([]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handlePromptSubmit = async ({ prompt, selectedCategory, newCategory, file }) => {
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
                user={user}
                setUser={setUser}
                isOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
            />
            <MainContent
                onPromptSubmit={handlePromptSubmit}
                categories={categories}
                messages={messages}
                isSidebarOpen={isSidebarOpen}
            />
        </div>
    );
};

export default Home;
