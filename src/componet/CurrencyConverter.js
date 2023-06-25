import React, { useState, useEffect } from 'react';
import './styles.css';


const CurrencyConverter = () => {
    const [amount, setAmount] = useState(0);
    const [fromCurrency, setFromCurrency] = useState('UAH');
    const [toCurrency, setToCurrency] = useState('USD');
    const [exchangeRate, setExchangeRate] = useState(0);
    const [usdExchangeRate, setUsdExchangeRate] = useState(0);
    const [eurExchangeRate, setEurExchangeRate] = useState(0);

    useEffect(() => {
        const fetchExchangeRates = async () => {
            try {
                const response = await fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json');
                const data = await response.json();

                const usdRate = data.find((currency) => currency.cc === 'USD').rate;
                const eurRate = data.find((currency) => currency.cc === 'EUR').rate;

                setUsdExchangeRate(usdRate);
                setEurExchangeRate(eurRate);

                if (fromCurrency === toCurrency) {
                    setExchangeRate(1);
                } else if (fromCurrency === 'USD' && toCurrency === 'UAH') {
                    setExchangeRate(usdRate);
                } else if (fromCurrency === 'UAH' && toCurrency === 'EUR') {
                    setExchangeRate(1 / eurRate);
                } else if (fromCurrency === 'UAH' && toCurrency === 'USD') {
                    setExchangeRate(1 / usdRate);
                } else if (fromCurrency === 'EUR' && toCurrency === 'UAH') {
                    setExchangeRate(eurRate);
                } else if (fromCurrency === 'USD' && toCurrency === 'EUR') {
                    setExchangeRate(eurRate / usdRate);
                } else if (fromCurrency === 'EUR' && toCurrency === 'USD') {
                    setExchangeRate(usdRate / eurRate);
                }
            } catch (error) {
                console.error('Error fetching exchange rates:', error);
            }
        };

        fetchExchangeRates();
    }, [fromCurrency, toCurrency]);

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    };

    const handleFromCurrencyChange = (event) => {
        setFromCurrency(event.target.value);
    };

    const handleToCurrencyChange = (event) => {
        setToCurrency(event.target.value);
    };

    const convertedAmount = (amount * exchangeRate).toFixed(2);
    return (
        <div className="currency-converter">
            <h1 className="converter-title">Конвертер валют</h1>
            <header className="exchange-rate-header">
                курсы валют: USD/UAH = {usdExchangeRate.toFixed(2)}, EUR/UAH = {eurExchangeRate.toFixed(2)}
            </header>
            <div className="input-container">
                <input type="number" value={amount} onChange={handleAmountChange} className="amount-input" />
                <select value={fromCurrency} onChange={handleFromCurrencyChange} className="currency-select">
                    <option value="UAH">UAH</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                </select>
                <span className="equals-sign">=</span>
                <input type="number" value={convertedAmount} readOnly className="converted-amount-input" />
                <select value={toCurrency} onChange={handleToCurrencyChange} className="currency-select">
                    <option value="UAH">UAH</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                </select>
            </div>
        </div>
    );
};

export default CurrencyConverter;
