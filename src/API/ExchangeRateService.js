import{ useState, useEffect } from 'react';

export const ExchangeRateService = () => {
    const [exchangeRates, setExchangeRates] = useState({});

    useEffect(() => {
        const fetchExchangeRates = async () => {
            try {
                const response = await fetch(
                    'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json'
                );
                const data = await response.json();
                const rates = {};

                data.forEach((currency) => {
                    rates[currency.cc] = currency.rate;
                });

                setExchangeRates(rates);
            } catch (error) {
                console.error('Error fetching exchange rates:', error);
            }
        };

        fetchExchangeRates();
    }, []);

    return exchangeRates;
};
