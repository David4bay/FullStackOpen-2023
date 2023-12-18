/* eslint-disable react/prop-types */


const CurrencySymbol = ({ individualCurrency }) => {
    return (
        <p>
            <strong>Currency Symbol</strong>: <li>{individualCurrency?.symbol}</li>
        </p>
    )
}

export default CurrencySymbol