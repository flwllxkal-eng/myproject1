# AI-Powered Web App Development Blueprint

## Overview

This document outlines the development plan and features for a series of AI-powered web applications. The goal is to create modern, useful, and aesthetically pleasing single-page applications using vanilla JavaScript, HTML, and CSS, leveraging modern web standards. Each series builds upon the last, introducing new concepts and capabilities.

## Series #1: Simple Image Gallery

*   **Objective:** Create a clean, responsive image gallery.
*   **Features:**
    *   Dynamic image loading from a JavaScript array.
    *   Modal view for larger images when a thumbnail is clicked.
    *   Modern, minimalist design with CSS Flexbox/Grid.
    *   Accessibility features (e.g., alt tags, keyboard navigation).
*   **Tech Stack:** HTML, CSS, JavaScript (ES Modules).

## Series #2: Interactive Quiz Game

*   **Objective:** Build an engaging, interactive quiz application.
*   **Features:**
    *   Multiple-choice questions loaded from a structured JavaScript object.
    *   Immediate feedback on user answers (correct/incorrect).
    *   Score tracking and final results display.
    *   Polished UI with animations for transitions and feedback.
*   **Tech Stack:** HTML, CSS, JavaScript (ES Modules).

## Series #3: Versatile Unit Converter

*   **Objective:** Create a tool for converting various units of measurement.
*   **Features:**
    *   Supports Length, Weight, and Temperature conversions.
    *   Dynamic population of unit options based on the selected category.
    *   Real-time conversion as the user types.
    *   Includes a wide range of international and traditional units.
    *   Informative content section explaining the importance and context of unit conversion.
*   **Tech Stack:** HTML, CSS, JavaScript (ES Modules).

## Series #4: Real-Time Currency Converter

*   **Objective:** Build a blog-style page with a real-time currency conversion tool.
*   **Features:**
    *   **Real-Time Exchange Rates:** Fetches the latest currency exchange rates from the reliable `frankfurter.app` API.
    *   **User-Friendly Interface:** Clean design where users can input an amount and select 'from' and 'to' currencies.
    *   **AdSense-Optimized Content:** Includes a detailed, high-quality article for AdSense approval.
    *   **Dynamic & Responsive:** The tool provides instant conversion results and the entire page is fully responsive.
*   **Tech Stack:** HTML, CSS, JavaScript with `fetch` API.

## Series #5: Advanced Case Converter

*   **Objective:** Develop a comprehensive tool for text case conversion.
*   **Features:**
    *   **Multiple Conversion Options:** Supports UPPERCASE and lowercase.
    *   **Instant Conversion:** Text is converted with a button click.
    *   **Copy to Clipboard:** A dedicated button allows users to copy the converted text with a single click.
    *   **In-depth Content:** Provides a detailed explanation of what case conversion is, why it's useful, and how it works, aiming for Google AdSense guidelines.
*   **Tech Stack:** HTML, CSS, JavaScript (ES Modules).

## Series #6: Word and Character Counter

*   **Objective:** Create a real-time tool to count words, characters, sentences, and spaces.
*   **Features:**
    *   **Real-Time Analysis:** Instantly counts and displays key metrics as the user types.
    *   **Comprehensive Metrics:** Calculates and shows Word Count, Character Count (with and without spaces), Space Count, and Sentence Count.
    *   **Clean & Familiar UI:** The user interface will be modeled after Series #5 for consistency and ease of use, featuring a large input area and a clear results display.
    *   **High-Quality AdSense Content:** The page will include a comprehensive guide explaining the importance of word counts for SEO, academic writing, and social media. It will detail how to use the tool and its benefits for various professionals (writers, students, marketers, developers).
*   **Tech Stack:** HTML, CSS, JavaScript (ES Modules).

---

### **Current Request Plan: Series #6**

1.  **Create `series6` Directory:** Set up a new directory for the sixth project.
2.  **Develop `index.html`:**
    *   Structure the page with a header, the counter tool, and detailed informational sections.
    *   Write original, high-quality English content aimed at passing AdSense review, explaining the tool's value and application.
3.  **Develop `style.css`:**
    *   Leverage the style from Series #5 to ensure design consistency and adapt it for the new results section.
4.  **Develop `main.js`:**
    *   Implement the logic to count words, characters (with/without spaces), spaces, and sentences in real-time.
    *   Attach an event listener to the input area to trigger the counting functions as the user types.
5.  **Update Main `index.html`:** Add a new navigation card to the main page to link to the "Word and Character Counter" series.
6.  **Git Integration:** Commit all new files with a descriptive message and push to the remote repository.
