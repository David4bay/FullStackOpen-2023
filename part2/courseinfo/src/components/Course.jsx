/* eslint-disable react/prop-types */
import React from 'react'

const Header = () => {
    return (
        <header>
            <h1>Web development curriculum</h1>
        </header>
    )
}

const Part = ({name, parts}) => {
    return (
        <>
        <h2>{name}</h2>
        <div>
        {parts.map((item) => (
            <React.Fragment key={item.name}>
                    <p>{item.name} {item.exercises}</p>
            </React.Fragment>
            ))}
        </div>
        </>
    )
}

const Content = ({courses}) => {
    return (
        <>
        {courses.map(({name, parts}) => (
            <React.Fragment key={name}>
            <Part name={name} parts={parts} />
            <strong>total of {parts.reduce((acc, item) => acc + item.exercises, 0)} exercises </strong>
            </React.Fragment>
        ))}
        </>
    )
}

const Course = ({courses}) => {
    return (
        <div>
            <Header />
            <Content courses={courses}  />
        </div>
    )
}

export default Course