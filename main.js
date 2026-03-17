
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
    
    // 각 종류의 문자를 하나씩 보장
    let password = '';
    password += uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)];
    password += lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)];
    password += numberChars[Math.floor(Math.random() * numberChars.length)];
    password += specialChars[Math.floor(Math.random() * specialChars.length)];

    // 나머지 길이를 모든 문자 종류에서 랜덤하게 채움
    for (let i = 4; i < passwordLength; i++) {
        const randomIndex = Math.floor(Math.random() * allChars.length);
        password += allChars[randomIndex];
    }

    // 생성된 비밀번호를 섞어서 순서 예측 불가능하게 만듦
    const shuffledPassword = password.split('').sort(() => 0.5 - Math.random()).join('');

    passwordDisplay.value = shuffledPassword;
});

copyButton.addEventListener('click', () => {
    passwordDisplay.select();
    // execCommand는 오래된 방식이므로 새로운 Clipboard API를 사용합니다.
    navigator.clipboard.writeText(passwordDisplay.value).then(() => {
        // (선택사항) 복사 성공 시 사용자에게 알림
        copyButton.textContent = 'Copied!';
        setTimeout(() => {
            copyButton.textContent = 'Copy';
        }, 1500);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
});
