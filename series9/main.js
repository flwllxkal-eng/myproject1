document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelector('.buttons');

    let currentExpression = '0';

    function updateDisplay() {
        display.textContent = currentExpression;
    }

    function calculate(expression) {
        // Replace user-facing operators with JS-compatible versions
        let safeExpression = expression
            .replace(/×/g, '*')
            .replace(/÷/g, '/')
            .replace(/π/g, 'Math.PI')
            .replace(/√/g, 'Math.sqrt')
            .replace(/\^/g, '**'); // For x^y

        // Handle log and ln
        safeExpression = safeExpression.replace(/log/g, 'Math.log10').replace(/ln/g, 'Math.log');

        // Handle trigonometric functions (sin, cos, tan)
        safeExpression = safeExpression.replace(/(sin|cos|tan)/g, 'Math.$1');

        try {
            // Using the Function constructor for safer evaluation
            const result = new Function('return ' + safeExpression)();
            
            if (isNaN(result) || !isFinite(result)) {
                return 'Error: Invalid Calculation';
            }
            
            // Round to avoid floating point inaccuracies
            return Math.round(result * 1e12) / 1e12;
        } catch (error) {
            console.error("Calculation Error:", error);
            return 'Error';
        }
    }

    buttons.addEventListener('click', (event) => {
        if (!event.target.classList.contains('btn')) return;

        const key = event.target.dataset.key;
        
        if (currentExpression === 'Error' || currentExpression === 'Error: Invalid Calculation') {
            currentExpression = '0';
        }

        switch (key) {
            case 'AC':
                currentExpression = '0';
                break;
            case 'DEL':
                if (currentExpression.length > 1) {
                    currentExpression = currentExpression.slice(0, -1);
                } else {
                    currentExpression = '0';
                }
                break;
            case '=':
                if (currentExpression) {
                    currentExpression = String(calculate(currentExpression));
                }
                break;
            case 'sqr':
                currentExpression = `(${currentExpression})**2`;
                currentExpression = String(calculate(currentExpression));
                break;
            case 'pow': // Represents x^y
                 if (currentExpression === '0') currentExpression = '';
                 currentExpression += '^';
                 break;
            case 'sqrt':
            case 'sin':
            case 'cos':
            case 'tan':
            case 'log':
            case 'ln':
                if (currentExpression === '0') {
                    currentExpression = key + '(';
                } else {
                    currentExpression += key + '(';
                }
                break;
            case 'pi':
                 if (currentExpression === '0') {
                    currentExpression = 'π';
                } else {
                    currentExpression += 'π';
                }
                break;
            default: // Numbers, operators, parentheses
                if (currentExpression === '0') {
                    currentExpression = key;
                } else {
                    currentExpression += key;
                }
                break;
        }

        updateDisplay();
    });
});
