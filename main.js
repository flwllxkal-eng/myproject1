
const passwordDisplay = document.getElementById('password-display');
const generateButton = document.getElementById('generate-button');
const copyButton = document.getElementById('copy-button');

const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
const numberChars = '0123456789';
const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

const allChars = uppercaseChars + lowercaseChars + numberChars + specialChars;

generateButton.addEventListener('click', () => {
    const passwordLength = Math.floor(Math.random() * 5) + 8; // 8-12 characters
    let password = '';
    for (let i = 0; i < passwordLength; i++) {
        const randomIndex = Math.floor(Math.random() * allChars.length);
        password += allChars[randomIndex];
    }
    passwordDisplay.value = password;
});

copyButton.addEventListener('click', () => {
    passwordDisplay.select();
    document.execCommand('copy');
});
