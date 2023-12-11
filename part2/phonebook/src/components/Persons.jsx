/* eslint-disable react/prop-types */
import { Fragment } from 'react'

const Persons = ({persons}) => {
    return (
        <ul>
        {persons.map((person) => (
          <Fragment key={person.name}>
            <li>{person.name} {person.number} {person.id}</li>
          </Fragment>
        ))}
      </ul>
    )
}

export default Persons