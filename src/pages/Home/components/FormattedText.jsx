// FormattedText.jsx
import React from 'react';
import { formatText } from './textFormatter';

const FormattedText = ({ text }) => {
    const formattedText = formatText(text);

    return (
        <div>
            {formattedText.map((paragraph, index) => (
                <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }}></p>
            ))}
        </div>
    );
};

export default FormattedText;