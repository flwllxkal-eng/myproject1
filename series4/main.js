
const fromCurrencySelect = document.getElementById('from-currency');
const toCurrencySelect = document.getElementById('to-currency');
const amountInput = document.getElementById('amount');
const resultText = document.getElementById('result-text');
const swapButton = document.querySelector('.swap-icon');

const API_URL = 'https://api.frankfurter.app';

// 1. Fetch currencies and populate select elements
async function populateCurrencies() {
    try {
        const response = await fetch(`${API_URL}/currencies`);
        if (!response.ok) {
            throw new Error('Failed to fetch currencies.');
        }
        const currencies = await response.json();
        
        // Add currencies to select options
        for (const currencyCode in currencies) {
            const option1 = new Option(`${currencyCode} - ${currencies[currencyCode]}`, currencyCode);
            const option2 = new Option(`${currencyCode} - ${currencies[currencyCode]}`, currencyCode);
            fromCurrencySelect.add(option1);
            toCurrencySelect.add(option2);
        }

        // Set default values
        fromCurrencySelect.value = 'USD';
        toCurrencySelect.value = 'EUR';

        // Initial conversion
        convertCurrency();

    } catch (error) {
        console.error('Error populating currencies:', error);
        resultText.textContent = 'Error loading currencies.';
    }
}

// 2. Convert currency
async function convertCurrency() {
    const amount = amountInput.value;
    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;

    if (amount === '' || amount < 0) {
        resultText.textContent = 'Please enter a valid amount.';
        return;
    }
    
    // If amount is not a number (e.g. '1e')
    if (isNaN(amount)) {
        resultText.textContent = 'Invalid number format.';
        return;
    }

    if (fromCurrency === toCurrency) {
        resultText.textContent = `${amount} ${fromCurrency} = ${amount} ${toCurrency}`;
        return;
    }

    resultText.textContent = 'Converting...';

    try {
        // The API handles the amount=1 case gracefully if it's not provided
        const response = await fetch(`${API_URL}/latest?amount=${parseFloat(amount)}&from=${fromCurrency}&to=${toCurrency}`);
        if (!response.ok) {
            throw new Error('Conversion request failed.');
        }
        const data = await response.json();
        const convertedAmount = data.rates[toCurrency];

        resultText.textContent = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(3)} ${toCurrency}`;

    } catch (error) {
        console.error('Error converting currency:', error);
        resultText.textContent = 'Error during conversion.';
    }
}

// 3. Event Listeners

amountInput.addEventListener('input', convertCurrency);
fromCurrencySelect.addEventListener('change', convertCurrency);
toCurrencySelect.addEventListener('change', convertCurrency);

swapButton.addEventListener('click', () => {
    const temp = fromCurrencySelect.value;
    fromCurrencySelect.value = toCurrencySelect.value;
    toCurrencySelect.value = temp;
    convertCurrency();
});

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    populateCurrencies();
});
