import { Entry } from "../../types"
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import HealthAndSafetyOutlinedIcon from '@mui/icons-material/HealthAndSafetyOutlined';

interface EntryProp {
    entries: Entry[] | [] | any[]
}

const listStyle = {
    listStyle: "none", 
    paddingTop: 10, 
    paddingBottom: 5, 
    paddingLeft: 4, 
    paddingRight: 0, 
    margin: 0, 
    marginBottom: 8,
    borderRadius: "5px",
    border: '2px solid black',
    lineHeight: "1.5"
}

function Entries({ entries }: EntryProp) {

    if (entries.length < 1) return <p>No entries found.</p>

    return entries?.map(({
        id,
        date,
        description,
        // diagnosisCodes,
        // discharge,
        specialist,
        // type,
        healthCheckRating = "Good"
    }) => (
        <ul key={id} style={listStyle}>
            {date ? (
                <li>
                <strong>
                    {date} <HealthAndSafetyOutlinedIcon />
                </strong>
                </li>) : null
            }
            {description ? (<li>
                <em>
                    {description}
                </em>
                </li>) : null}
            {healthCheckRating ? <li>{healthCheckRating > 5 ? <FavoriteOutlinedIcon style={{color: "green"}} /> : <FavoriteOutlinedIcon style={{color: "red"}} />}</li> : null}

            {specialist ? <li>diagnosed by <strong>{specialist}</strong></li> : null}
        </ul>
    ))
}

export default Entries