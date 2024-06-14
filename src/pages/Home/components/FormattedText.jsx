// FormattedText.jsx
import React from 'react';
import { formatText } from './textFormatter';

const FormattedText = ({ text, className }) => {
    const formattedText = formatText(text);

    return (
        <div className={className}>
            {formattedText.map((paragraph, index) => (
                <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }}></p>
            ))}
        </div>
    );
};

export default FormattedText;
