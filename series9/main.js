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

        // New function to handle left-to-right exponentiation
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
            let evalExpr = expr
                .replace(/,/g, '') // Remove formatting commas
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
                .replace(/(\d)Math\.PI/g, '$1 * Math.PI')
                .replace(/(\d)Math\.E/g, '$1 * Math.E')
                .replace(/(\d)(Math\.sin|Math\.cos|Math\.tan|Math\.log10|Math\.log|Math\.sqrt)/g, '$1 * $2')
                .replace(/\)(\d|\(|Math)/g, ') * $1');

            // Apply the new exponent transformation
            evalExpr = transformExponents(evalExpr);
            
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
                updateDisplay(false);
                return;
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

    buttons.addEventListener('click', (event) => {
        const target = event.target;
        if (target.matches('.btn')) {
            handleButtonClick(target.dataset.key);
        }
    });

    expressionDisplay.addEventListener('input', (e) => {
        currentExpression = e.target.textContent.replace(/\n/g, '');
        updateDisplay();
    });

    expressionDisplay.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleButtonClick('=');
        }
    });

    updateDisplay();
});
