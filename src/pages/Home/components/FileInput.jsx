import React, { useState } from 'react';

const FileInput = ({ onFileChange, onFileUpload }) => {
    const [fileName, setFileName] = useState('');

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFileName(file ? file.name : '');
        onFileChange(file);
        console.log(file);
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
            {fileName && <p>{fileName}</p>}
            <button
                className="casino-button upload-button"
                onClick={onFileUpload}
                disabled={!fileName}
            >
                Upload File
            </button>
        </div>
    );
};

export default FileInput;
