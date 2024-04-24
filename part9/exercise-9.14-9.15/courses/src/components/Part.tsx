import React from "react"
import { CoursePart } from "../Types/Types"

function Part({ courseParts }: { courseParts: CoursePart[] }):JSX.Element {
    
    return (
        <ul>
        {courseParts.map((course) => (
                        <React.Fragment key={course.name}>
                            <h2>
                                {course.name} {course.exerciseCount}
                            </h2>
                            {course.description ? <p>{course.description}</p> : null}
                        </React.Fragment>
                    )
                )}
        </ul>
    )
}

export default Part