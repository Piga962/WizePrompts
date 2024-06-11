import React, { useState } from 'react';

const FileInput = () => {
    const [fileName, setFileName] = useState('');

    const handleFileChange = (e) => {
        setFileName(e.target.files[0] ? e.target.files[0].name : '');
    };

    return (
        <div>
            <input 
                type="file" 
                id="file" 
                className="file-input" 
                onChange={handleFileChange}
            />
            <label htmlFor="file" className="file-input-label"></label>
            {fileName && <p>Archivo seleccionado: {fileName}</p>}
        </div>
    );
};

export default FileInput;