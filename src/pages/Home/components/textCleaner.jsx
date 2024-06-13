// textCleaner.jsx
export const cleanText = (text) => {
    // Remove excessive asterisks
    let cleanedText = text.replace(/\*{2,}/g, '*'); // Convert multiple consecutive asterisks to a single one

    // Remove asterisks not used for bold formatting (single asterisks or surrounded by spaces)
    cleanedText = cleanedText.replace(/(\*\s+\*)|(\s*\*\s*)/g, ' '); // Remove standalone asterisks

    // Trim leading and trailing spaces
    return cleanedText.trim();
};