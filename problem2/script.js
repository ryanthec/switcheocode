document.addEventListener('DOMContentLoaded', function() {
    const inputAmount = document.getElementById('input-amount');
    const outputAmount = document.getElementById('output-amount');
    const sendDropdown = document.getElementById('send-dropdown');
    const receiveDropdown = document.getElementById('receive-dropdown');
    const swapButton = document.getElementById('swapbutton');
    const sendUsdConversion = document.getElementById('send-usd-conversion');
    const receiveUsdConversion = document.getElementById('receive-usd-conversion');

    //Using conversion rates of 9/8/2024
    //I only have 4 currencies as of now, but more can be added if need be
    const conversionRates = {
        'USD': {
            'BTC': 0.000016, // USD to BTC
            'ETH': 0.000376, // USD to ETH
            'SOL': 0.006369  // USD to SOL
        },
        'BTC': {
            'USD': 1 / 0.000016, // BTC to USD
            'ETH': 0.000376 / 0.000016, // BTC to ETH
            'SOL': 0.006369 / 0.000016  // BTC to SOL
        },
        'ETH': {
            'USD': 1 / 0.000376, // ETH to USD
            'BTC': 0.000016 / 0.000376, // ETH to BTC
            'SOL': 0.006369 / 0.000376  // ETH to SOL
        },
        'SOL': {
            'USD': 1 / 0.006369, // SOL to USD
            'BTC': 0.000016 / 0.006369, // SOL to BTC
            'ETH': 0.000376 / 0.006369  // SOL to ETH
        }
    };

    function convertCurrency() 
    {
        const fromCurrency = sendDropdown.value;
        const toCurrency = receiveDropdown.value;
        const amount = parseFloat(inputAmount.value);

        if (fromCurrency && toCurrency && !isNaN(amount) && amount >= 0) 
        {
            const rate = conversionRates[fromCurrency][toCurrency] || 1;
            outputAmount.value = (amount * rate).toFixed(4);

            if(fromCurrency == 'USD')
                {
                    sendUsdConversion.textContent = `USD Conversion: $${amount.toFixed(4)}`;
                    receiveUsdConversion.textContent = `USD Conversion: $${amount.toFixed(4)}`;
                }
                else
                {
                    const sendToUsdRate = conversionRates[fromCurrency]['USD'];
                    sendUsdConversion.textContent = `USD Conversion: $${(amount * sendToUsdRate).toFixed(4)}`;
                    receiveUsdConversion.textContent = `USD Conversion: $${(amount * sendToUsdRate).toFixed(4)}`;
                }
        
        } 
        else 
        {
            outputAmount.value = '';
            sendUsdConversion.textContent = '';
            receiveUsdConversion.textContent = '';
        }
        
    }

    function swapCurrencies() 
    {
        const temp = sendDropdown.value;
        sendDropdown.value = receiveDropdown.value;
        receiveDropdown.value = temp;
        convertCurrency();
        updateImage();
    }

    inputAmount.addEventListener('input', convertCurrency);
    sendDropdown.addEventListener('change', convertCurrency);
    receiveDropdown.addEventListener('change', convertCurrency);
    swapButton.addEventListener('click', swapCurrencies);

    const sendImg = document.getElementById('send-img');
    const receiveImg = document.getElementById('receive-img');

    const imagePaths = {
      'USD': './images/usd-logo.svg',
      'BTC': './images/btc-logo.svg',
      'ETH': './images/eth-logo.svg',
      'SOL': './images/sol-logo.svg'
    };

    function updateImage() {
      const selectedValue1 = sendDropdown.value;
      sendImg.src = imagePaths[selectedValue1] || './images/default-logo.svg';
      const selectedValue2 = receiveDropdown.value;
      receiveImg.src = imagePaths[selectedValue2] || './images/default-logo.svg';
    }

    sendDropdown.addEventListener('change', updateImage);
    receiveDropdown.addEventListener('change', updateImage);
    updateImage();
});
