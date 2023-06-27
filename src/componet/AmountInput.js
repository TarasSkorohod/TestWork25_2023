const AmountInput = ({ amount, onChange, readOnly }) => {
    return (
        <input
            type="number"
            value={amount}
            onChange={onChange}
            className="amount-input"
            readOnly={readOnly}
        />
    );
};
export default AmountInput;
