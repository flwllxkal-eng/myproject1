document.addEventListener('DOMContentLoaded', () => {
    const expressionDisplay = document.getElementById('expression-display');
    const resultDisplay = document.getElementById('result-display');
    const buttons = document.querySelector('.buttons');

    // --- State Management ---
    let currentExpression = '0';

    // --- Formatting Helpers ---
    const formatResult = (result) => {
        if (result === 'Error' || isNaN(result) || !isFinite(result)) {
            return 'Error';
        }
        const num = Number(result);
        // Format with commas and handle precision
        return num.toLocaleString('en-US', { maximumFractionDigits: 10 });
    };

    // --- Display Update ---
    const updateDisplay = (shouldRecalculate = true) => {
        expressionDisplay.textContent = currentExpression;
        if (shouldRecalculate) {
            const result = calculate(currentExpression);
            resultDisplay.textContent = formatResult(result);
        }
        // Set cursor to the end of the expression display
        setCursorToEnd(expressionDisplay);
    };

    const setCursorToEnd = (element) => {
        const range = document.createRange();
        const selection = window.getSelection();
        range.selectNodeContents(element);
        range.collapse(false); // false to collapse to the end
        selection.removeAllRanges();
        selection.addRange(range);
    };

    // --- Core Calculation Logic ---
    const calculate = (expr) => {
        if (!expr) return '0';
        try {
            let evalExpr = expr
                .replace(/,/g, '') // Remove formatting commas
                .replace(/×/g, '*')
                .replace(/÷/g, '/')
                .replace(/π/g, 'Math.PI')
                .replace(/e/g, 'Math.E')
                .replace(/\^/g, '**')
                .replace(/√/g, 'Math.sqrt')
                .replace(/log/g, 'Math.log10')
                .replace(/ln/g, 'Math.log')
                .replace(/sin/g, 'Math.sin')
                .replace(/cos/g, 'Math.cos')
                .replace(/tan/g, 'Math.tan')
                .replace(/EXP/g, 'e')
                .replace(/(\d)Math\.PI/g, '$1 * Math.PI')
                .replace(/(\d)Math\.E/g, '$1 * Math.E')
                .replace(/(\d)(Math\.sin|Math\.cos|Math\.tan|Math\.log10|Math\.log|Math\.sqrt)/g, '$1 * $2')
                .replace(/\)(\d|\()/g, ') * $1');

            const result = new Function('return ' + evalExpr)();
            return parseFloat(result.toPrecision(12));
        } catch (error) {
            return 'Error'; 
        }
    };
    
    const factorial = (n) => {
        if (n < 0 || n % 1 !== 0) return 'Error';
        if (n === 0) return 1;
        return n > 1 ? n * factorial(n - 1) : 1;
    };

    // --- Event Handlers ---
    const handleButtonClick = (key) => {
        if (currentExpression === '0' && !('.()/*-+'.includes(key))) {
            currentExpression = '';
        }

        switch (key) {
            case 'AC':
                currentExpression = '0';
                resultDisplay.textContent = '0';
                break;
            case 'DEL':
                currentExpression = currentExpression.slice(0, -1) || '0';
                break;
            case '=':
                currentExpression = resultDisplay.textContent.replace(/,/g, '');
                updateDisplay(false); // Don't recalculate, just update expression
                return; // Exit to avoid re-adding to expression
            case 'sqr':
                currentExpression += '^2';
                break;
            case 'pow':
                currentExpression += '^';
                break;
            case 'fact':
                try {
                    const numToFactorial = calculate(currentExpression);
                    currentExpression = String(factorial(Number(numToFactorial)));
                } catch (e) { currentExpression = 'Error'; }
                break;
            default:
                currentExpression += key;
                break;
        }
        updateDisplay();
    };

    // --- Event Listeners ---
    buttons.addEventListener('click', (event) => {
        const target = event.target;
        if (target.matches('.btn')) {
            handleButtonClick(target.dataset.key);
        }
    });

    // Listen for direct input on the expression display
    expressionDisplay.addEventListener('input', (e) => {
        // Basic sanitization - better handling might be needed
        currentExpression = e.target.textContent.replace(/\n/g, ''); 
        updateDisplay();
    });

    // Prevent non-number/operator keys in contenteditable, handle Enter and Backspace
    expressionDisplay.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleButtonClick('=');
        }
    });

    // Initialize
    updateDisplay();
});
