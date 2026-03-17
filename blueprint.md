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
    *   **Real-Time Exchange Rates:** Fetches the latest currency exchange rates from the reliable `frankfurter.app` API (which sources from the European Central Bank).
    *   **User-Friendly Interface:** Utilizes the clean design and layout from Series #3 for a consistent user experience. Users can input an amount and select 'from' and 'to' currencies from a dropdown.
    *   **No API Key Required:** Leverages an open API, removing the need for user sign-up or key management.
    *   **AdSense-Optimized Content:** Includes a detailed, high-quality article explaining how to use the tool, the importance of currency conversion for travelers, online shoppers, and businesses, and information about the data source. This is designed to meet Google AdSense content quality guidelines.
    *   **Dynamic & Responsive:** The tool provides instant conversion results and the entire page is fully responsive for both mobile and desktop devices.
*   **Tech Stack:** HTML, CSS, JavaScript with `fetch` API for asynchronous requests.

---

### **Current Request Plan**

1.  **Create `series4` Directory:** Set up a new directory for the fourth project.
2.  **Develop `index.html`:**
    *   Structure the page with a header, the currency converter tool, and a detailed content section.
    *   Write comprehensive, original content to explain the tool and its use cases, targeting AdSense approval.
3.  **Develop `style.css`:**
    *   Copy the styles from `series3` to ensure a consistent and high-quality design, making minor adjustments as needed.
4.  **Develop `main.js`:**
    *   Implement the core logic for the currency converter.
    *   Use the `fetch` API to communicate with `https://api.frankfurter.app/`.
    *   Write a function to dynamically populate the currency selection dropdowns.
    *   Write a function to calculate and display the converted amount based on user input.
    *   Add event listeners to trigger conversions in real-time.
5.  **Git Integration:** Add all new files to a new commit.

