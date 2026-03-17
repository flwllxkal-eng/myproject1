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

    // 1. Guarantee at least one of each character type
    let password = '';
    password += uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)];
    password += lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)];
    password += numberChars[Math.floor(Math.random() * numberChars.length)];
    password += specialChars[Math.floor(Math.random() * specialChars.length)];

    // 2. Fill the rest of the password length with random characters from all types
    for (let i = 4; i < passwordLength; i++) {
        const randomIndex = Math.floor(Math.random() * allChars.length);
        password += allChars[randomIndex];
    }

    // 3. Shuffle the password to make the character order unpredictable
    const shuffledPassword = password.split('').sort(() => 0.5 - Math.random()).join('');

    passwordDisplay.value = shuffledPassword;
});

copyButton.addEventListener('click', () => {
    passwordDisplay.select();
    // Use the modern Clipboard API instead of the deprecated execCommand
    navigator.clipboard.writeText(passwordDisplay.value).then(() => {
        // (Optional) Notify the user that the copy was successful
        copyButton.innerHTML = 'Copied!'; // Use innerHTML to easily change back to SVG later if needed
        setTimeout(() => {
            copyButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-5zm0 16H8V7h11v14z"/></svg>';
        }, 1500);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
});
