document.addEventListener('DOMContentLoaded', () => {
    const inputText = document.getElementById('inputText');
    const outputText = document.getElementById('outputText');
    const convertBtn = document.getElementById('convertBtn');
    const copyBtn = document.getElementById('copyBtn');

    convertBtn.addEventListener('click', () => {
        const selectedCase = document.querySelector('input[name="case"]:checked').value;
        const text = inputText.value;

        if (selectedCase === 'uppercase') {
            outputText.value = text.toUpperCase();
        } else if (selectedCase === 'lowercase') {
            outputText.value = text.toLowerCase();
        }
    });

    copyBtn.addEventListener('click', () => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(outputText.value).then(() => {
                copyBtn.textContent = 'Copied!';
                setTimeout(() => {
                    copyBtn.textContent = 'Copy to Clipboard';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy: ', err);
            });
        }
    });
});
