# AI-Powered Web App Development Blueprint

## Overview

This document outlines the development plan and features for a series of AI-powered web applications. The goal is to create modern, useful, and aesthetically pleasing single-page applications using vanilla JavaScript, HTML, and CSS, leveraging modern web standards. Each series builds upon the last, introducing new concepts and capabilities.

## Series #1: Simple Image Gallery

*   **Objective:** Create a clean, responsive image gallery.
*   **Features:**
    *   Dynamic image loading from a JavaScript array.
    *   Modal view for larger images when a thumbnail is clicked.
*   **Tech Stack:** HTML, CSS, JavaScript (ES Modules).

## Series #2: Interactive Quiz Game

*   **Objective:** Build an engaging, interactive quiz application.
*   **Features:**
    *   Multiple-choice questions loaded from a structured JavaScript object.
    *   Immediate feedback on user answers (correct/incorrect).
*   **Tech Stack:** HTML, CSS, JavaScript (ES Modules).

## Series #3: Versatile Unit Converter

*   **Objective:** Create a tool for converting various units of measurement.
*   **Features:**
    *   Supports Length, Weight, and Temperature conversions.
    *   Real-time conversion as the user types.
*   **Tech Stack:** HTML, CSS, JavaScript (ES Modules).

## Series #4: Real-Time Currency Converter

*   **Objective:** Build a blog-style page with a real-time currency conversion tool.
*   **Features:**
    *   Fetches the latest currency exchange rates from the `frankfurter.app` API.
    *   User-friendly interface for currency selection and conversion.
*   **Tech Stack:** HTML, CSS, JavaScript with `fetch` API.

## Series #5: Advanced Case Converter

*   **Objective:** Develop a comprehensive tool for text case conversion.
*   **Features:**
    *   Supports multiple conversion options (UPPERCASE, lowercase, etc.).
    *   Instant, real-time text conversion.
*   **Tech Stack:** HTML, CSS, JavaScript (ES Modules).

## Series #6: Word and Character Counter

*   **Objective:** Create a real-time tool to count words, characters, sentences, and spaces.
*   **Features:**
    *   Instantly counts and displays key metrics as the user types.
    *   Calculates Word Count, Character Count, Space Count, and Sentence Count.
*   **Tech Stack:** HTML, CSS, JavaScript (ES Modules).

## Series #7: Image File Size Calculator

*   **Objective:** Create a tool to estimate image file sizes based on their properties.
*   **Features:**
    *   **Input-Based Calculation:** Calculates the estimated file size from user inputs for image width, height, and color depth (bits per pixel).
    *   **Real-Time Estimation:** Provides immediate file size estimates in Bytes, Kilobytes (KB), and Megabytes (MB).
    *   **Educational Content:** The page will feature high-quality content explaining the technical concepts of digital images, such as pixels, color depth, and compression. It will also outline why understanding file size is crucial for web performance and SEO, targeting AdSense approval.
    *   **User-Friendly Interface:** A clean and intuitive UI, consistent with previous series, for easy input and clear results.
*   **Tech Stack:** HTML, CSS, JavaScript (ES Modules).

## Series #8: Encryption/Decryption Tool

*   **Objective:** Build a secure tool for text encryption and decryption using modern web standards.
*   **Features:**
    *   **Secure Encryption:** Utilizes the **Web Crypto API** with the industry-standard **AES-GCM** algorithm for strong, authenticated encryption.
    *   **Password-Based Key Derivation:** Securely derives a cryptographic key from a user-provided password using the **PBKDF2** algorithm, preventing simple dictionary attacks.
    *   **User-Friendly Interface:** Simple inputs for text and a password, with clear buttons for "Encrypt" and "Decrypt" actions.
    *   **Educational Content:** Includes high-quality explanations about the importance of encryption, what AES-GCM is, how the Web Crypto API works, and why password-based key derivation is crucial for security. This content aims to build user trust and provide educational value.
*   **Tech Stack:** HTML, CSS, and modern JavaScript utilizing the **Web Crypto API**.

---

### **Current Request Plan: Series #8**

1.  **Correct `index.html` Link:** Fix the missing hyperlink for the Series #7 navigation card on the main page.
2.  **Update `blueprint.md`:** Add the full plan for Series #8.
3.  **Create `series8` Directory:** Set up a new directory for the eighth project.
4.  **Develop `series8/index.html`:** Structure the page with text areas for input/output, a password field, and control buttons. Include detailed, original English content on Web Crypto, AES-GCM, and security best practices.
5.  **Develop `series8/style.css`:** Adapt the styles from previous series to maintain a consistent look and feel.
6.  **Develop `series8/main.js`:** Implement the core cryptographic functions using the Web Crypto API, including key derivation (PBKDF2), encryption (AES-GCM), and decryption (AES-GCM).
7.  **Update Main `index.html`:** Add a new navigation card linking to the "Encryption/Decryption Tool" series.
8.  **Git Integration:** Commit all new and modified files and push them to the remote repository.
