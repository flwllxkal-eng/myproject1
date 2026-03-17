document.addEventListener('DOMContentLoaded', () => {
    const inputText = document.getElementById('inputText');
    const password = document.getElementById('password');
    const encryptBtn = document.getElementById('encryptBtn');
    const decryptBtn = document.getElementById('decryptBtn');
    const outputText = document.getElementById('outputText');
    const status = document.getElementById('status');

    const displayStatus = (message, isError = false) => {
        status.textContent = message;
        status.className = 'status-message'; // Reset classes
        if (message) {
            status.classList.add(isError ? 'error' : 'success');
        }
    };

    async function getKey(password, salt) {
        const enc = new TextEncoder().encode(password);
        const keyMaterial = await window.crypto.subtle.importKey(
            'raw', 
            enc, 
            'PBKDF2', 
            false, 
            ['deriveKey']
        );
        return window.crypto.subtle.deriveKey(
            {
                name: 'PBKDF2',
                salt: salt,
                iterations: 100000,
                hash: 'SHA-256'
            },
            keyMaterial,
            { name: 'AES-GCM', length: 256 },
            true,
            ['encrypt', 'decrypt']
        );
    }

    async function encryptText() {
        if (!inputText.value || !password.value) {
            displayStatus('Text and password are required.', true);
            return;
        }

        try {
            displayStatus('Encrypting...');
            const salt = window.crypto.getRandomValues(new Uint8Array(16));
            const iv = window.crypto.getRandomValues(new Uint8Array(12));
            const key = await getKey(password.value, salt);

            const encodedText = new TextEncoder().encode(inputText.value);

            const encryptedData = await window.crypto.subtle.encrypt(
                { name: 'AES-GCM', iv: iv },
                key,
                encodedText
            );

            // Combine salt, iv, and encrypted data for easy storage/transmission
            const combined = new Uint8Array(salt.length + iv.length + encryptedData.byteLength);
            combined.set(salt, 0);
            combined.set(iv, salt.length);
            combined.set(new Uint8Array(encryptedData), salt.length + iv.length);

            // Base64 encode the result for a clean output string
            outputText.value = btoa(String.fromCharCode.apply(null, combined));
            displayStatus('Encryption successful!');
        } catch (err) {
            console.error('Encryption failed:', err);
            displayStatus(`Encryption failed: ${err.message}`, true);
        }
    }

    async function decryptText() {
        if (!inputText.value || !password.value) {
            displayStatus('Encrypted text and password are required.', true);
            return;
        }

        try {
            displayStatus('Decrypting...');
            // Decode the Base64 string back to a Uint8Array
            const combined = new Uint8Array(atob(inputText.value).split('').map(char => char.charCodeAt(0)));

            const salt = combined.slice(0, 16);
            const iv = combined.slice(16, 28);
            const encryptedData = combined.slice(28);

            const key = await getKey(password.value, salt);

            const decryptedData = await window.crypto.subtle.decrypt(
                { name: 'AES-GCM', iv: iv },
                key,
                encryptedData
            );

            outputText.value = new TextDecoder().decode(decryptedData);
            displayStatus('Decryption successful!');
        } catch (err) {
            console.error('Decryption failed:', err);
            displayStatus('Decryption failed. Check your password or the encrypted text.', true);
        }
    }

    encryptBtn.addEventListener('click', encryptText);
    decryptBtn.addEventListener('click', decryptText);
});
