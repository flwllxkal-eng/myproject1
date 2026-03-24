document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const modeIndicator = document.getElementById('mode-indicator');
    const buttonsGrid = document.querySelector('.buttons-grid');

    let currentExpression = '0';
    let memory = 0;
    let isRadian = false; // false for Degree, true for Radian

    const updateDisplay = () => {
        display.textContent = currentExpression;
        modeIndicator.textContent = isRadian ? 'RAD' : 'DEG';
    };

    const factorial = (n) => {
        if (n < 0) return 'Error';
        if (n === 0) return 1;
        let result = 1;
        for (let i = n; i > 0; i--) {
            result *= i;
        }
        return result;
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

            // Handle trig functions with degree/radian conversion
            evalExpr = evalExpr.replace(/(sin|cos|tan)\(([^)]+)\)/g, (match, func, val) => {
                let angle = calculate(val);
                if (!isRadian) {
                    angle = angle * (Math.PI / 180); // Convert to radians
                }
                return `Math.${func}(${angle})`;
            });

            const result = new Function('return ' + evalExpr)();
            if (isNaN(result) || !isFinite(result)) return 'Error';
            return Math.round(result * 1e12) / 1e12; // Round for precision

        } catch (error) {
            return 'Error';
        }
    };

    buttonsGrid.addEventListener('click', (event) => {
        if (!event.target.classList.contains('btn')) return;

        const key = event.target.dataset.key;

        if (currentExpression === 'Error') currentExpression = '0';

        switch (key) {
            // Clear & Deletion
            case 'AC': currentExpression = '0'; break;
            case 'DEL':
                currentExpression = currentExpression.length > 1 ? currentExpression.slice(0, -1) : '0';
                break;

            // Core Calculation
            case '=':
                currentExpression = String(calculate(currentExpression));
                break;

            // Memory Functions
            case 'mc': memory = 0; break;
            case 'mr': currentExpression = String(memory); break;
            case 'm+': memory += (calculate(currentExpression) || 0); currentExpression = '0'; break;
            case 'm-': memory -= (calculate(currentExpression) || 0); currentExpression = '0'; break;

            // Mode & Constants
            case 'deg': isRadian = !isRadian; break;
            case 'pi':
            case 'e':
                currentExpression = currentExpression === '0' ? key : currentExpression + key;
                break;
            
            // Advanced Functions
            case 'sqr': currentExpression = `(${currentExpression})^2`; break;
            case 'pow': currentExpression += '^'; break;
            case 'sqrt': currentExpression = `√(${currentExpression})`; break;
            case 'fact': currentExpression = String(factorial(Number(currentExpression))); break;
            case 'log':
            case 'ln':
            case 'sin':
            case 'cos':
            case 'tan':
                 currentExpression = currentExpression === '0' ? key + '(' : currentExpression + key + '(';
                 break;

            // Operators and numbers
            default:
                if (currentExpression === '0' && !('. ( ) / * - +'.includes(key))) {
                    currentExpression = key;
                } else {
                    currentExpression += key;
                }
                break;
        }
        updateDisplay();
    });
    updateDisplay(); // Initial display update
});
