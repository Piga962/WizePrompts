import React, { useState, useEffect } from 'react';
import './MainContent.css';
import FileInput from './components/FileInput';
import axios from 'axios';
import FormattedText from './components/FormattedText';
import Send from '../../images/send.png';
import Audio from '../../images/audio.png';

const MainContent = ({ createMessage, categories, messages, selectedConversation, handleGenerateHelp, fetchMessages, user, documents }) => {
    const [prompt, setPrompt] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [newCategory, setNewCategory] = useState('');
    const [file, setFile] = useState(null); 
    const [fileForm, setFileForm] = useState({
        user_id: user ? user.id : '',
        document_type: '',
        document_name: '',
        document_route: '',
        category_id: '',
    });

    const [voices, setVoices] = useState([]);
    const [language, setLanguage] = useState('en');
    const [selectedVoice, setSelectedVoice] = useState(null);

    useEffect(() => {
        if(selectedConversation){
            setFileForm((prevForm) => ({
                ...prevForm,
                category_id: selectedConversation.category_id,
            }));
            setSelectedCategory(selectedConversation.category_id);
        }
    }, [selectedConversation]);

    useEffect(() => {
        const populateVoices = () => {
            const synth = window.speechSynthesis;
            const allVoices = synth.getVoices();
            const filteredVoices = allVoices.filter(voice =>
                language === 'en' ? voice.lang.startsWith('en') : voice.lang.startsWith('es')
            );
            setVoices(filteredVoices);

            if (filteredVoices.length > 0) {
                setSelectedVoice(filteredVoices[0].name);
            } else {
                setSelectedVoice(null);
            }
        };

        populateVoices();
        window.speechSynthesis.onvoiceschanged = populateVoices;
    }, [language]);

    const handlePromptChange = (e) => setPrompt(e.target.value);
    const handleCategoryChange = (e) => setSelectedCategory(selectedConversation.category_id);
    const handleNewCategoryChange = (e) => setNewCategory(e.target.value);

    const handleFileChange = (file) => {
        setFile(file);
        setFileForm((prevForm) => ({
            ...prevForm,
            document_type: file.type,
            document_name: file.name,
        }));
    };

    const handleFileUpload = () => {
        if (!file) {
            alert("Please select a file first");
            return;
        }
        const formData = new FormData();
        formData.append('file', file);

        axios.post('http://localhost:3001/chat/upload', formData)
        .then((response) => {
            console.log(response);
            console.log(formData);  
            alert('Archivo subido correctamente');
            setFileForm((prevForm) => ({
                ...prevForm,
                document_route: response.data.fileUrl, // Asegúrate de que esta propiedad existe en la respuesta del backend
            }));
            createFile({
                ...fileForm,
                document_route: response.data.fileUrl, // Incluye la ruta del archivo
            });
        })
        .catch((error) => {
            console.log("Error al subir el archivo", error);
            alert('Error al subir el archivo');
        });
    };

    const createFile = async (fileForm) => {
        try {
            const response = await fetch('http://localhost:3001/documents', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(fileForm),
            });
            if(response.status === 201){
                alert('File created successfully');
            }
        } catch(error) {
            console.log(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const currentPrompt = prompt; // Store the current prompt
        setPrompt(''); // Clear the prompt field

        const answer = await handleGenerateHelp({ 
            prompt: currentPrompt,
            pastMessages: messages.map((msg) => msg.message),
            pastAnswers: messages.map((msg) => msg.answer),
            documents: documents.map((doc) => doc.document_name) // Asumiendo que tienes documentos en el estado del componente
        });

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

    const speakText = (text) => {
        if (text.trim() !== '') {
            if ('speechSynthesis' in window) {
                const synth = window.speechSynthesis;
                const utterance = new SpeechSynthesisUtterance(text);
                const selectedVoiceObject = voices.find(voice => voice.name === selectedVoice);
                utterance.voice = selectedVoiceObject;
                synth.speak(utterance);
            } else {
                alert('Sorry, your browser does not support speech synthesis.');
            }
        }
    };

    return (
        <div className="MainContent">
            {selectedConversation ? (
                <>

                    <div className="Messages">
                    <h2 style={{display: 'flex', justifyContent: 'center', color: 'white'}}>{selectedConversation.title}</h2>
                        {messages.map((msg, index) => (
                            <div key={index} className="Message">
                                <div className="UserMessage">{msg.message}</div>
                                <FormattedText className="ResponseMessage" text={msg.answer}>
                                </FormattedText>
                                    <button onClick={() => speakText(msg.answer)} style={{width: '50px', height: '50px', borderRadius: '100%'}}>
                                        <img src={Audio} alt="Audio" className='send' />
                                    </button>
                            </div>
                        ))}
                    </div>
                    
                    <form onSubmit={handleSubmit} className="PromptForm">
                        <div className="form-buttons-left">
                            <FileInput 
                                onFileChange={handleFileChange}
                                onFileUpload={handleFileUpload}
                            />
                        </div>
                        <textarea
                            value={prompt}
                            onChange={handlePromptChange}
                            placeholder="Enter your prompt"
                            required
                            className="prompt-textarea"
                        />
                        <button type="submit" className="submit-button">
                            <img src={Send} alt="Send" className='send' />
                        </button>
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