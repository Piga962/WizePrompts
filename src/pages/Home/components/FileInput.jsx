import React, { useState } from 'react';

const FileInput = ({ onFileChange, onFileUpload }) => {
    const [fileName, setFileName] = useState('');

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFileName(file ? file.name : '');
        onFileChange(file);  // Notify parent component of the file change
    };

    const handleUploadClick = () => {
        onFileUpload();
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
            {fileName && <p>File Selected: {fileName}</p>}
            <button
                className="casino-button upload-button"
                onClick={handleUploadClick}
                disabled={!fileName}
            >
                Upload File
            </button>
        </div>
    );
};

export default FileInput;
