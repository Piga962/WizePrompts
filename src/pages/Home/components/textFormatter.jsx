// textFormatter.jsx
import { cleanText } from './textCleaner';

export const formatText = (text) => {
    
    // Clean the text first
    const cleanedText = cleanText(text);

    // Split the cleaned text into paragraphs based on double newlines
    const paragraphs = cleanedText.split(/\n{2,}/).filter(paragraph => paragraph.trim());

    const formattedParagraphs = paragraphs.map(paragraph => {
        // Replace '*' surrounded words with <b> tags for bold formatting
        const formattedParagraph = paragraph.replace(/\*([^*]+)\*/g, '<b>$1</b>');

        // Replace single newlines within paragraphs with <br />
        return formattedParagraph.replace(/\n/g, '<br />');
    });

    return formattedParagraphs;
};