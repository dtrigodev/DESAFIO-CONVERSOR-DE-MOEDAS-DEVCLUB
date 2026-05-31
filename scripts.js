document.addEventListener('DOMContentLoaded', () => {
    const convertButton = document.querySelector('.convert-button');
    const currencyFromSelect = document.querySelector('#currency-from');
    const currencyToSelect = document.querySelector('#currency-to');

    function updateBackground(currencyTo) {
        document.body.classList.remove('usd-bg', 'eur-bg', 'brl-bg');
        document.body.classList.add(
            currencyTo === 'USD' ? 'usd-bg' :
                currencyTo === 'EUR' ? 'eur-bg' :
                    'brl-bg'
        );

        const backgroundMap = {
            BRL: './assets/real-background.jpg',
            USD: './assets/dolar-background.jpg',
            EUR: './assets/euro-background.jpg'
        };

        // Carrega a imagem de background de forma assíncrona para não bloquear a renderização
        const url = backgroundMap[currencyTo];
        if (!url) return;

        const img = new Image();
        img.src = url;
        img.onload = () => {
            document.body.style.backgroundImage = `url('${url}')`;
        };
        img.onerror = () => {
            // em caso de erro mantém apenas a cor de fundo definida pela classe
            document.body.style.backgroundImage = '';
        };
    }

    function convertvalues() {
        const rawInput = document.querySelector('.input-currency').value;
        const inputCurrency = Number(rawInput.replace(',', '.').replace(/[^0-9.-]/g, ''));
        const currencyValueToConvert = document.querySelector('.currency-value-to-convert');
        const currencyValueConverted = document.querySelector('.currency-value-converted');
        const currencySourceLabel = document.querySelector('.currency-source-label');
        const currencyConvertedLabel = document.querySelector('.currency-converted-label');
        const currencySourceImg = document.querySelector('.currency-source-img');
        const currencyConvertedImg = document.querySelector('.currency-converted-img');
        const currencyFrom = document.querySelector('#currency-from').value;
        const currencyTo = document.querySelector('#currency-to').value;

        const exchangeRates = {
            BRL: 1,
            USD: 5.25,
            EUR: 5.70
        };

        const currencyNames = {
            BRL: 'Real Brasileiro',
            USD: 'Dólar Americano',
            EUR: 'Euro'
        };

        const currencySymbols = {
            BRL: 'R$',
            USD: 'USD',
            EUR: 'EUR'
        };

        const convertedValue = (inputCurrency * exchangeRates[currencyFrom]) / exchangeRates[currencyTo];

        currencyValueToConvert.innerHTML = `${currencySymbols[currencyFrom]} ${inputCurrency.toFixed(2)}`;
        currencySourceLabel.innerHTML = currencyNames[currencyFrom];
        currencyValueConverted.innerHTML = `${currencySymbols[currencyTo]} ${convertedValue.toFixed(2)}`;
        currencyConvertedLabel.innerHTML = currencyNames[currencyTo];

        const imageMap = {
            BRL: './assets/real.png',
            USD: './assets/dolar.png',
            EUR: './assets/euro.png'
        };

        const altMap = {
            BRL: 'Imagem de Real Brasileiro',
            USD: 'Imagem de Dólar Americano',
            EUR: 'Imagem de Euro'
        };

        if (currencySourceImg) {
            currencySourceImg.src = imageMap[currencyFrom];
            currencySourceImg.alt = altMap[currencyFrom];
        }

        if (currencyConvertedImg) {
            currencyConvertedImg.src = imageMap[currencyTo];
            currencyConvertedImg.alt = altMap[currencyTo];
        }

        updateBackground(currencyTo);
    }

    function handleCurrencyChange() {
        if (currencyToSelect) {
            updateBackground(currencyToSelect.value);
        }
    }

    if (currencyFromSelect) {
        currencyFromSelect.addEventListener('change', handleCurrencyChange);
    }

    if (currencyToSelect) {
        currencyToSelect.addEventListener('change', handleCurrencyChange);
    }

    if (convertButton) {
        convertButton.addEventListener('click', convertvalues);
    }

    if (currencyToSelect) {
        updateBackground(currencyToSelect.value);
    }

});
