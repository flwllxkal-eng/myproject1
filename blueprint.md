# Project Blueprint

## Overview

This project is a personal hub designed to showcase a collection of web applications and projects, referred to as "series." The main entry point is a landing page that introduces the owner and provides clear navigation to the various series and external links, such as a personal blog. The initial project, "Series #1," is a sophisticated password generator.

This multi-page structure allows for clean separation of different projects under a single domain, making it easy to manage and scale with future additions.

## Implemented Features & Design

### Main Hub (Root: `/`)

*   **Purpose:** Serves as a central promotional and navigational page.
*   **Content:** Introduces the owner (flwllxkal-eng) and links to available project "series" and a blog.
*   **Layout:** A clean, modern, and responsive card-based layout that is easy to navigate.
*   **Styling:** Uses the 'Noto Sans KR' font for clear readability in Korean. The design is professional and welcoming.
*   **Structure:** Composed of a main header, a navigation section with clickable cards for each project, and a simple footer.

### Series #1: Password Generator (`/series1/`)

*   **Functionality:** A sophisticated and user-friendly password generator web application.

*   **Internationalization (i18n):** All content is in English to target a global user base.

*   **SEO & Discoverability:**
    *   A dedicated footer section contains relevant keywords and hashtags (e.g., #cybersecurity, #passwordgenerator) to improve search engine ranking.
    *   The HTML is structured with semantic tags and includes a meta description.
    *   Includes a Google Site Verification meta tag for ownership verification in Google Search Console.

*   **Advanced Password Generation:** Generates a random password (8-12 characters) guaranteed to include at least one uppercase letter, one lowercase letter, one number, and one special character.

*   **Modern & Secure UI:**
    *   **Dark Mode Theme:** A visually comfortable and modern dark theme.
    *   **Responsive Design:** Fully responsive for both desktop and mobile devices.
    *   **Interactive Elements:** Clear feedback on buttons and inputs.
    *   **Professional Typography:** Uses the "Roboto" font for excellent readability.

*   **Rich Educational Content:**
    *   **"Golden Rules" Section:** Details the core principles of strong passwords.
    *   **Tool Justification Section:** Explains the security benefits of using a cryptographically secure, client-side random password generator.

*   **Secure Copy-to-Clipboard:** Utilizes the modern `navigator.clipboard.writeText()` API.

## Current Plan

*   **Project Restructuring:** Refactor the project from a single-page application to a multi-page hub-and-spoke model. (Completed)
    *   Moved the password generator tool into its own `/series1/` directory. (Completed)
    *   Created a new main landing page at the root to serve as a hub. (Completed)
*   **Blueprint Update:** Document the new multi-page structure in the blueprint. (Completed)
