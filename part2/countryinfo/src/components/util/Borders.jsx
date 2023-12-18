

const Borders = ({country}) => {
    if (country) {
        country.borders?.map((border) => (
            <ul key={border.toString()}>
                <li>{border}</li>
            </ul>
        )) || <li>none</li>
    }
    return
}

export default Borders