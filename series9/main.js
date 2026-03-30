document.addEventListener('DOMContentLoaded', () => {
    const expressionDisplay = document.getElementById('expression-display');
    const resultDisplay = document.getElementById('result-display');
    const buttons = document.querySelector('.buttons');

    let currentExpression = '0';

    const formatResult = (result) => {
        if (result === 'Error' || isNaN(result) || !isFinite(result)) {
            return 'Error';
        }
        return parseFloat(Number(result).toPrecision(12)).toString();
    };

    const calculate = (expr) => {
        if (!expr) return '';

        const factorial = (n) => {
            if (n < 0 || n % 1 !== 0) return NaN;
            if (n === 0 || n === 1) return 1;
            let result = 1;
            for (let i = 2; i <= n; i++) result *= i;
            return result;
        };

        try {
            let evalExpr = expr.trim()
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
                .replace(/\^/g, '**');

            evalExpr = evalExpr.replace(/(\d+\.?\d*)!/g, (match, num) => factorial(parseFloat(num)));

            evalExpr = evalExpr
                .replace(/(\d|\)|π|e)(Math|\()/g, '$1*$2')
                .replace(/(\))(\d|Math\.PI|Math\.E)/g, '$1*$2');

            const result = new Function('return ' + evalExpr)();

            if (isNaN(result) || !isFinite(result)) return 'Error';
            return result;
        } catch (error) {
            return 'Error';
        }
    };

    const handleButtonClick = (key) => {
        // If '=', calculate and show result. DO NOT touch the expression.
        if (key === '=') {
            const result = calculate(currentExpression);
            resultDisplay.textContent = formatResult(result);
            return;
        }

        // For any other key, we are editing the expression.
        // The previous result becomes irrelevant.
        if (resultDisplay.textContent !== '') {
             resultDisplay.textContent = '';
        }

        if (key === 'AC') {
            currentExpression = '0';
            resultDisplay.textContent = '0'; 
        } else if (key === 'DEL') {
            currentExpression = currentExpression.slice(0, -1) || '0';
        } else {
            if (currentExpression === '0' && key !== '.') {
                currentExpression = '';
            }
            
            // Append the new key
            const functionsWithParen = ['sin', 'cos', 'tan', 'log', 'sqrt', 'ln'];
            const lastChar = currentExpression.slice(-1);
            const isLastCharNumOrParen = /[\d)]/.test(lastChar);

            if (functionsWithParen.includes(key)) {
                currentExpression += (isLastCharNumOrParen ? '×' : '') + key + '(';
            } else if (key === 'pi') {
                currentExpression += (isLastCharNumOrParen ? '×' : '') + 'π';
            } else if (key === 'sqr') {
                currentExpression += '^2';
            } else if (key === 'pow') {
                currentExpression += '^';
            } else if (key === 'fact') {
                currentExpression += '!';
            } else {
                currentExpression += key;
            }
        }

        expressionDisplay.textContent = currentExpression;
    };

    buttons.addEventListener('click', (event) => {
        if (event.target.matches('.btn') && event.target.dataset.key) {
            handleButtonClick(event.target.dataset.key);
        }
    });

    document.addEventListener('keydown', (e) => {
        const keyMap = {
            'Enter': '=', 'Backspace': 'DEL', 'Escape': 'AC', '/': '÷', '*': '×', '-': '-', '+': '+',
            '1':'1','2':'2','3':'3','4':'4','5':'5','6':'6','7':'7','8':'8','9':'9','0':'0',
            '.':'.','(':'(',')':')','!':'fact','^':'pow','p':'pi'
        };
        if (keyMap[e.key]) {
            e.preventDefault();
            handleButtonClick(keyMap[e.key]);
        }
    });
    
    expressionDisplay.textContent = currentExpression;
});
