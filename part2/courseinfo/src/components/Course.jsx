

const Course = ({couse}) => {
    
    return (
        <div>
            <Header course={course} />
            <Content parts={parts} />
            <Total />
        </div>
    )
}

export default Course