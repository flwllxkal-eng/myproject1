document.addEventListener('DOMContentLoaded', () => {
    const expressionDisplay = document.getElementById('expression-display');
    const resultDisplay = document.getElementById('result-display');
    const buttons = document.querySelector('.buttons');

    let currentExpression = '0';

    const formatResult = (result) => {
        if (result === 'Error' || result === 'Error(incomplete)' || isNaN(result) || !isFinite(result)) {
            return 'Error';
        }
        const num = Number(result);
        // Use parseFloat and toPrecision to handle floating point inaccuracies and remove trailing zeros
        return parseFloat(num.toPrecision(12)).toString();
    };

    const updateDisplay = (shouldRecalculate = true) => {
        expressionDisplay.textContent = currentExpression;
        if (shouldRecalculate) {
            const result = calculate(currentExpression);
            if (result !== 'Error(incomplete)') {
                 resultDisplay.textContent = formatResult(result);
            }
        }
        setCursorToEnd(expressionDisplay);
    };

    const setCursorToEnd = (element) => {
        try {
            const range = document.createRange();
            const selection = window.getSelection();
            range.selectNodeContents(element);
            range.collapse(false);
            selection.removeAllRanges();
            selection.addRange(range);
            element.focus();
        } catch(e) { console.error("Error setting cursor:", e); }
    };

    const calculate = (expr) => {
        if (!expr) return '0';

        const factorial = (n) => {
            if (n < 0 || n % 1 !== 0) return NaN;
            if (n === 0 || n === 1) return 1;
            let result = 1;
            for (let i = 2; i <= n; i++) {
                result *= i;
            }
            return result;
        };

        try {
            let evalExpr = expr.trim();

            // Pre-process factorials
            evalExpr = evalExpr.replace(/(\d+)!/g, (match, num) => factorial(parseInt(num, 10)));

            evalExpr = evalExpr
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
                .replace(/(\d)(Math\.PI|Math\.E|Math\.sin|Math\.cos|Math\.tan|Math\.log10|Math\.log|Math\.sqrt|\()/g, '$1 * $2')
                .replace(/(\))(\d|Math|\()/g, '$1 * $2');

            // Handle right-to-left exponentiation (e.g., 2^3^2 = 2^(3^2))
            const parts = evalExpr.split('^');
            if (parts.length > 1) {
                let last = parts.pop();
                evalExpr = `Math.pow(${parts.join('^')}, ${last})`; // Simplified for now, can be improved for chains
                let base = parts.pop();
                evalExpr = `Math.pow(${base}, ${last})`;
                while(parts.length) {
                    evalExpr = `Math.pow(${parts.pop()}, ${evalExpr})`;
                }
            }
            
            const result = new Function('return ' + evalExpr)();

            if (isNaN(result) || !isFinite(result)) {
                return 'Error';
            }

            return result;
        } catch (error) {
            if (error instanceof SyntaxError) {
                return 'Error(incomplete)';
            }
            return 'Error';
        }
    };

    const handleButtonClick = (key) => {
        const functionsWithParen = ['sin', 'cos', 'tan', 'log', 'sqrt'];

        if (resultDisplay.textContent === 'Error' && key !== 'AC') {
            currentExpression = '0';
            resultDisplay.textContent = '0';
        }

        if (functionsWithParen.includes(key)) {
            let prefix = '';
            if (currentExpression === '0') {
                currentExpression = '';
            } else {
                const lastChar = currentExpression.slice(-1);
                if (/[0-9)π]/.test(lastChar)) {
                    prefix = '*';
                }
            }
            currentExpression += prefix + key + '(';
            updateDisplay(false);
            return;
        }

        if (currentExpression === '0' && key !== '.') {
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
                const finalResult = calculate(currentExpression);
                currentExpression = formatResult(finalResult);
                resultDisplay.textContent = currentExpression;
                updateDisplay(false);
                return;
            case 'sqr':
                currentExpression += '^2';
                break;
            case 'pow':
                currentExpression += '^';
                break;
            case 'fact':
                currentExpression += '!';
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
    
    document.addEventListener('keydown', (e) => {
        const key = e.key;
        const keyMap = {
            'Enter': '=', 'Backspace': 'DEL', 'Escape': 'AC',
            '/': '/', '*': '*', '-': '-', '+': '+', 'x': '*',
            '1': '1', '2': '2', '3': '3', '4': '4', '5': '5',
            '6': '6', '7': '7', '8': '8', '9': '9', '0': '0',
            '.': '.', '(': '(', ')': ')', '!': 'fact', '^': 'pow'
        };
        
        if (keyMap[key]) {
            e.preventDefault();
            handleButtonClick(keyMap[key]);
        }
    });

    updateDisplay();
});
