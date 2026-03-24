document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelector('.buttons');

    let currentExpression = '0';

    const updateDisplay = () => {
        display.textContent = currentExpression;
    };

    const factorial = (n) => {
        if (n < 0 || n % 1 !== 0) return 'Error';
        if (n === 0) return 1;
        let result = 1;
        for (let i = n; i > 0; i--) {
            result *= i;
        }
        return result;
    };

    const handleKeyPress = (key) => {
        if (currentExpression === 'Error') {
            currentExpression = '0';
        }

        switch (key) {
            case 'AC':
            case 'Escape':
                currentExpression = '0';
                break;
            case 'DEL':
            case 'Backspace':
                currentExpression = currentExpression.length > 1 ? currentExpression.slice(0, -1) : '0';
                break;
            case '=':
            case 'Enter':
                if (currentExpression) {
                    currentExpression = String(calculate(currentExpression));
                }
                break;
            case 'sqr':
                currentExpression = `(${currentExpression})^2`;
                break;
            case 'pow':
                currentExpression += '^';
                break;
            case 'fact':
                currentExpression = String(factorial(Number(calculate(currentExpression))));
                break;
            case 'sin':
            case 'cos':
            case 'tan':
            case 'log':
            case 'ln':
            case 'sqrt':
                currentExpression = currentExpression === '0' ? key + '(' : currentExpression + key + '(';
                break;
            case 'pi':
            case 'e':
                 if (currentExpression === '0') {
                    currentExpression = key;
                } else if (!isNaN(currentExpression.slice(-1))){
                     currentExpression += '*' + key;
                } else {
                     currentExpression += key;
                }
                break;
            default:
                if (/^[0-9.()/*\-+,eE]/.test(key) || key === 'EXP') {
                    if (currentExpression === '0' && !('.()/*-+'.includes(key))) {
                        currentExpression = key;
                    } else {
                        currentExpression += key;
                    }
                }
                break;
        }
        updateDisplay();
    };
    
    const calculate = (expr) => {
        try {
            let evalExpr = expr
                .replace(/×/g, '*')
                .replace(/÷/g, '/')
                .replace(/π/g, 'Math.PI')
                .replace(/e/g, 'Math.E')
                .replace(/\^/g, '**')
                .replace(/√/g, 'Math.sqrt')
                .replace(/log/g, 'Math.log10')
                .replace(/ln/g, 'Math.log')
                .replace(/EXP/g, 'e');

            evalExpr = evalExpr.replace(/(sin|cos|tan|sqrt|log10|log)\(/g, 'Math.$1(');
            const result = new Function('return ' + evalExpr)();
            if (isNaN(result) || !isFinite(result)) return 'Error';
            return parseFloat(result.toPrecision(12));
        } catch (error) {
            return 'Error';
        }
    };

    buttons.addEventListener('click', (event) => {
        const target = event.target;
        if (!target.classList.contains('btn')) return;
        handleKeyPress(target.dataset.key);
    });

    document.addEventListener('keydown', (event) => {
        event.preventDefault(); // Prevent default browser actions for keys like '/'
        let key = event.key;
        // Map keyboard characters to calculator keys
        if (key === 'Enter') key = '=';
        if (key === '/' || key === '*' || key === '-' || key === '+') {
             // Let it pass through
        } else if(key.match(/^[a-zA-Z]$/)) {
            // Prevent alphabet keys unless they are part of a function
            const validLetterKeys = ['e']; // 'e' is a constant
            if (!validLetterKeys.includes(key.toLowerCase())) return;
        }

        const button = document.querySelector(`[data-key="${key}"]`);
        if (button) {
            button.focus();
            handleKeyPress(key);
        } else {
             handleKeyPress(key);
        }
    });

    updateDisplay();
});
