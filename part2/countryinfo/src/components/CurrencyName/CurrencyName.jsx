/* eslint-disable react/prop-types */


const CurrencyName = ({ individualCurrency }) => {
    return (
        <p>
            <strong>Currency Name</strong>: <li>{individualCurrency?.name}</li>
        </p>
    )
}

export default CurrencyName