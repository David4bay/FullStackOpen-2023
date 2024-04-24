import { CoursePart } from "../Types/Types"

function Content({ courseParts }:{ courseParts: CoursePart[] }):JSX.Element {

    return (
    <>
        <p>
        {courseParts[0].name} {courseParts[0].exerciseCount}
        </p>
        <p>
        {courseParts[1].name} {courseParts[1].exerciseCount}
        </p>
        <p>
        {courseParts[2].name} {courseParts[2].exerciseCount}
        </p>
    </>
    )
}

export default Content