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

---

### **Current Request Plan: Series #7**

1.  **Create `series7` Directory:** Set up a new directory for the seventh project.
2.  **Develop `index.html`:**
    *   Structure the page with input fields for width, height, and a dropdown for color depth.
    *   Include a clear results display area and comprehensive, original English content about image file sizes for AdSense.
3.  **Develop `style.css`:**
    *   Maintain design consistency by adapting the styles from Series #6.
4.  **Develop `main.js`:**
    *   Implement the mathematical logic to calculate the estimated file size in real-time based on the formula: `(Width * Height * BitsPerPixel) / 8`.
    *   Convert the result into B, KB, and MB and display it.
5.  **Update Main `index.html`:** Add a new navigation card to the main page to link to the "Image File Size Calculator" series.
6.  **Git Integration:** Commit all new files and push them to the remote repository.
