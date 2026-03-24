document.addEventListener('DOMContentLoaded', () => {
    const expressionDisplay = document.getElementById('expression-display');
    const resultDisplay = document.getElementById('result-display');
    const buttonsGrid = document.querySelector('.buttons-grid');

    let currentExpression = '0';
    let lastResult = '';

    const updateDisplay = () => {
        expressionDisplay.textContent = currentExpression;
        resultDisplay.textContent = lastResult;
    };

    const factorial = (n) => {
        if (n < 0) return NaN;
        if (n === 0) return 1;
        let result = 1;
        for (let i = 1; i <= n; i++) {
            result *= i;
        }
        return result;
    };

    const handleInput = (key) => {
        if (/[0-9]/.test(key)) {
            if (currentExpression === '0' || lastResult) {
                currentExpression = key;
                lastResult = '';
            } else {
                currentExpression += key;
            }
        } else if (key === '.') {
            if (lastResult) {
                currentExpression = '0.';
                lastResult = '';
            } else if (!/[.eE]/.test(currentExpression.split(/[-+*/()^]/).pop())) {
                currentExpression += key;
            }
        } else if (key === 'AC') {
            currentExpression = '0';
            lastResult = '';
        } else if (key === 'DEL') {
            if (lastResult) {
                currentExpression = '0';
                lastResult = '';
            } else {
                currentExpression = currentExpression.slice(0, -1) || '0';
            }
        } else if (key === '=') {
            try {
                let evalExpression = currentExpression
                    .replace(/\u00d7/g, '*')
                    .replace(/\u00f7/g, '/')
                    .replace(/\u2212/g, '-')
                    .replace(/\^/g, '**')
                    .replace(/\u03c0/g, 'Math.PI')
                    .replace(/e/g, 'Math.E')
                    .replace(/sin\(/g, 'Math.sin(')
                    .replace(/cos\(/g, 'Math.cos(')
                    .replace(/tan\(/g, 'Math.tan(')
                    .replace(/log\(/g, 'Math.log10(')
                    .replace(/ln\(/g, 'Math.log(')
                    .replace(/sqrt\(/g, 'Math.sqrt(')
                    .replace(/(\d+)!/g, (_, n) => `factorial(${n})`);

                lastResult = eval(evalExpression);
                if (typeof lastResult === 'number') {
                    lastResult = Number(lastResult.toPrecision(15));
                }
            } catch (error) {
                lastResult = 'Error';
            }
        } else {
            lastResult = '';
            if (/[\+\-*\/\^]/.test(key)) {
                 currentExpression += ` ${key} `;
            } else if (key === 'fact') {
                currentExpression += '!';
            } else if (['sin', 'cos', 'tan', 'log', 'ln', 'sqrt'].includes(key)) {
                if(currentExpression === '0' || !/[0-9]/.test(currentExpression.slice(-1))){
                    currentExpression = (currentExpression === '0' ? '' : currentExpression) + `${key}(`;
                } else {
                    currentExpression += ` * ${key}(`;
                }
            } else if (key === 'sqr') {
                currentExpression += '^2';
            } else if (key === 'pow') {
                currentExpression += '^';
            } else {
                 currentExpression = (currentExpression === '0' ? '' : currentExpression) + key;
            }
        }

        updateDisplay();
    };

    buttonsGrid.addEventListener('click', (event) => {
        const key = event.target.dataset.key;
        if (key) {
            handleInput(key);
        }
    });

    document.addEventListener('keydown', (event) => {
        let key = event.key;
        if (key === 'Enter') key = '=';
        if (key === 'Backspace') key = 'DEL';
        if (key === '*') key = '×';
        if (key === '/') key = '÷';
        if (key === 'pi') key = 'π';

        const button = document.querySelector(`[data-key='${key}']`);
        if (button) {
            handleInput(key);
            button.classList.add('active');
            setTimeout(() => button.classList.remove('active'), 100);
        }
    });

    updateDisplay();
});
