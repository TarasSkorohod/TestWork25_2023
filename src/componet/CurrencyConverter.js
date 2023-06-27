import React, { useState, useEffect } from 'react';
import './styles.css';
import {ExchangeRateService} from "../API/ExchangeRateService";
import AmountInput from "./AmountInput";
import CurrencySelect from "./CurrencySelect";
const CurrencyConverter = () => {
    const [amount, setAmount] = useState(0);
    const [fromCurrency, setFromCurrency] = useState('UAH');
    const [toCurrency, setToCurrency] = useState('USD');
    const exchangeRates = ExchangeRateService();
    const [convertedAmount, setConvertedAmount] = useState(0);

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    };

    const handleFromCurrencyChange = (event) => {
        setFromCurrency(event.target.value);
    };

    const handleToCurrencyChange = (event) => {
        setToCurrency(event.target.value);
    };

    useEffect(() => {
        const convertAmount = () => {
            let converted;

            if (fromCurrency === 'UAH') {
                const toRate = exchangeRates[toCurrency];
                converted = amount * toRate;
            } else if (toCurrency === 'UAH') {
                const fromRate = exchangeRates[fromCurrency];
                converted = amount / fromRate;
            } else {
                const fromRate = exchangeRates[fromCurrency];
                const toRate = exchangeRates[toCurrency];
                converted = (amount / fromRate) * toRate;
            }

            setConvertedAmount(converted.toFixed(2));
        };

        convertAmount();
    }, [amount, fromCurrency, toCurrency, exchangeRates]);

    return (
        <div className="currency-converter">
            <h1 className="converter-title">Конвертер валют</h1>
            <div className="input-container">
                <AmountInput amount={amount} onChange={handleAmountChange} />
                <CurrencySelect
                    selectedCurrency={fromCurrency}
                    onChangeCurrency={handleFromCurrencyChange}
                    exchangeRates={exchangeRates}
                />
                <span className="equals-sign">=</span>
                <AmountInput amount={convertedAmount} readOnly />
                <CurrencySelect
                    selectedCurrency={toCurrency}
                    onChangeCurrency={handleToCurrencyChange}
                    exchangeRates={exchangeRates}
                />
            </div>
        </div>
    );
};

export default CurrencyConverter;
