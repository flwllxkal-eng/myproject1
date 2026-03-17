document.addEventListener('DOMContentLoaded', () => {
    const inputText = document.getElementById('inputText');

    const wordCountEl = document.getElementById('wordCount');
    const charCountEl = document.getElementById('charCount');
    const charCountNoSpacesEl = document.getElementById('charCountNoSpaces');
    const spaceCountEl = document.getElementById('spaceCount');
    const sentenceCountEl = document.getElementById('sentenceCount');

    function analyzeText() {
        const text = inputText.value;

        // Character count (with spaces)
        const charCount = text.length;
        charCountEl.textContent = charCount;

        // Character count (without spaces)
        const charCountNoSpaces = text.replace(/\s/g, '').length;
        charCountNoSpacesEl.textContent = charCountNoSpaces;

        // Space count
        const spaceCount = (text.match(/\s/g) || []).length;
        spaceCountEl.textContent = spaceCount;

        // Word count
        const words = text.trim().split(/\s+/);
        const wordCount = text.trim() === '' ? 0 : words.length;
        wordCountEl.textContent = wordCount;
        
        // Sentence count
        const sentences = text.match(/[\w|\s][\.|!|?]/g);
        const sentenceCount = sentences ? sentences.length : 0;
        sentenceCountEl.textContent = sentenceCount;
    }

    inputText.addEventListener('input', analyzeText);
});
