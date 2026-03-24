document.addEventListener('DOMContentLoaded', () => {
    const expressionDisplay = document.getElementById('expression-display');
    const resultDisplay = document.getElementById('result-display');
    const buttons = document.querySelector('.buttons');

    let currentExpression = '0';

    const formatResult = (result) => {
        if (result === 'Error' || isNaN(result) || !isFinite(result)) {
            return 'Error';
        }
        const num = Number(result);
        return num.toLocaleString('en-US', { maximumFractionDigits: 10 });
    };

    const updateDisplay = (shouldRecalculate = true) => {
        expressionDisplay.textContent = currentExpression;
        if (shouldRecalculate) {
            const result = calculate(currentExpression);
            resultDisplay.textContent = formatResult(result);
        }
        setCursorToEnd(expressionDisplay);
    };

    const setCursorToEnd = (element) => {
        const range = document.createRange();
        const selection = window.getSelection();
        range.selectNodeContents(element);
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
    };

    const calculate = (expr) => {
        if (!expr) return '0';

        // Helper function for factorial calculation
        const factorial = (n) => {
            if (n < 0 || n % 1 !== 0) return NaN; // Invalid input for factorial
            if (n === 0 || n === 1) return 1;
            let result = 1;
            for (let i = 2; i <= n; i++) {
                result *= i;
            }
            return result;
        };

        // Function to pre-process and calculate factorials in the expression string
        const preprocessFactorials = (str) => {
            // Regex to find an integer followed by '!'
            const factRegex = /(\d+)\s*!/g;
            return str.replace(factRegex, (match, numberStr) => {
                return factorial(parseInt(numberStr, 10));
            });
        };
        
        const transformExponents = (str) => {
            const chainRegex = /((?:-?\d*\.?\d+(?:e[+-]?\d+)?\s*\^\s*)+-?\d*\.?\d+(?:e[+-]?\d+)?)/g;
            return str.replace(chainRegex, (chain) => {
                const parts = chain.split('^').map(p => p.trim());
                if (parts.length < 2) return chain;
                let replacement = `Math.pow(${parts[0]}, ${parts[1]})`;
                for (let i = 2; i < parts.length; i++) {
                    replacement = `Math.pow(${replacement}, ${parts[i]})`;
                }
                return replacement;
            });
        };

        try {
            // Pre-process factorials first!
            let evalExpr = preprocessFactorials(expr);

            // Then do all other replacements
            evalExpr = evalExpr
                .replace(/,/g, '')
                .replace(/×/g, '*')
                .replace(/÷/g, '/')
                .replace(/π/g, 'Math.PI')
                .replace(/e/g, 'Math.E')
                .replace(/√/g, 'Math.sqrt')
                .replace(/log/g, 'Math.log10')
                .replace(/ln/g, 'Math.log')
                .replace(/sin/g, 'Math.sin')
                .replace(/cos/g, 'Math.cos')
                .replace(/tan/g, 'Math.tan')
                .replace(/EXP/g, 'e')
                // Add multiplication where implied
                .replace(/(\d)Math\.PI/g, '$1 * Math.PI')
                .replace(/(\d)Math\.E/g, '$1 * Math.E')
                .replace(/(\d)(Math\.sin|Math\.cos|Math\.tan|Math\.log10|Math\.log|Math\.sqrt)/g, '$1 * $2')
                .replace(/\)(\d|\(|Math)/g, ') * $1');

            // Apply exponent transformation
            evalExpr = transformExponents(evalExpr);
            
            const result = new Function('return ' + evalExpr)();

            if (isNaN(result) || !isFinite(result)) {
                return 'Error';
            }

            return parseFloat(result.toPrecision(12));
        } catch (error) {
            return 'Error';
        }
    };

    const handleButtonClick = (key) => {
        if (currentExpression === '0' && !('.()/*-+\''.includes(key))) {
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
                updateDisplay(false);
                return;
            case 'sqr':
                currentExpression += '^2';
                break;
            case 'pow':
                currentExpression += '^';
                break;
            case 'fact': // THE FIX IS HERE
                currentExpression += '!'; // Just append '!' and let calculate() handle it
                break;
            default:
                currentExpression += key;
                break;
        }
        updateDisplay();
    };

    buttons.addEventListener('click', (event) => {
        const target = event.target;
        if (target.matches('.btn') && target.dataset.key) {
            handleButtonClick(target.dataset.key);
        }
    });

    expressionDisplay.addEventListener('input', (e) => {
        currentExpression = e.target.textContent.replace(/\n/g, '');
        updateDisplay();
    });

    // Comprehensive keyboard support
    document.addEventListener('keydown', (e) => {
        const key = e.key;
        const keyMap = {
            'Enter': '=', 'Backspace': 'DEL', 'Escape': 'AC',
            '/': '/', '*': '*', '-': '-', '+': '+', 'x': '*',
            '1': '1', '2': '2', '3': '3', '4': '4', '5': '5',
            '6': '6', '7': '7', '8': '8', '9': '9', '0': '0',
            '.': '.', '(': '(', ')': ')', '!': 'fact'
        };
        
        if (keyMap[key]) {
            e.preventDefault();
            handleButtonClick(keyMap[key]);
        }
    });

    updateDisplay();
});
