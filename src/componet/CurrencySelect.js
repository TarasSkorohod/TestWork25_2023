const CurrencySelect = ({ selectedCurrency, onChangeCurrency, exchangeRates }) => {
    return (
        <select value={selectedCurrency} onChange={onChangeCurrency} className="currency-select">
            <option value="UAH">UAH</option>
            {Object.keys(exchangeRates).map((currency) => (
                <option key={currency} value={currency}>
                    {currency}
                </option>
            ))}
        </select>
    );
};
export default CurrencySelect;