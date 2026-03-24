document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelector('.buttons');

    let currentExpression = '0';
    let lastResult = null;

    function updateDisplay() {
        display.textContent = currentExpression;
    }

    function calculate(expression) {
        // Replace user-facing operators with JS operators
        let safeExpression = expression.replace(/×/g, '*').replace(/÷/g, '/');

        // Handle trigonometric and log functions
        // This regex finds sin, cos, tan, log followed by parentheses
        // and wraps the argument with the appropriate Math function call
        safeExpression = safeExpression.replace(/(sin|cos|tan|log)\(([^)]+)\)/g, (match, func, arg) => {
            // For log, convert to Math.log10
            if (func === 'log') {
                return `Math.log10(${arg})`;
            }
            // For trig functions, convert argument from degrees to radians if needed
            // Assuming input is in radians as per instructions for now
            return `Math.${func}(${arg})`;
        });

        try {
            // Using Function constructor for safer evaluation than eval()
            const result = new Function('return ' + safeExpression)();
            
            if (isNaN(result) || !isFinite(result)) {
                return 'Error';
            }
            
            // Round to a reasonable number of decimal places to avoid floating point issues
            return Math.round(result * 1e12) / 1e12;
        } catch (e) {
            return 'Error';
        }
    }

    buttons.addEventListener('click', (event) => {
        if (!event.target.classList.contains('btn')) {
            return;
        }

        const key = event.target.dataset.key;

        switch (key) {
            case 'AC':
                currentExpression = '0';
                lastResult = null;
                break;
            case '=':
                if (currentExpression) {
                    const result = calculate(currentExpression);
                    lastResult = result;
                    currentExpression = String(result);
                }
                break;
            case 'sin':
            case 'cos':
            case 'tan':
            case 'log':
                 if (currentExpression === '0' || lastResult !== null) {
                    currentExpression = key + '(';
                    lastResult = null;
                } else {
                    currentExpression += key + '(';
                }
                break;
            default: // Numbers, operators, parentheses
                if (currentExpression === '0' || lastResult !== null) {
                    currentExpression = key;
                    lastResult = null;
                } else {
                    currentExpression += key;
                }
                break;
        }

        updateDisplay();
    });
});
