import React from 'react'
import { useQuery } from '@apollo/client'
import { RECOMMENDATIONS } from '../queries/graphqlQueries'

const Recommendations = () => {

    const { loading, error, data } = useQuery(RECOMMENDATIONS)

    if (loading) return <h3>Loading...</h3>

    if (error) return <h3>Sorry, something went wrong.</h3>

    console.log("data coming from recommendations component", data)

    return (
        <>
        <h2>
            recommendations 
        </h2>
        <p>
            books in your favorite genre <strong>{data?.me.favoriteGenre}</strong>
        </p>
        {
        loading ? <h3>Loading recommended books...</h3> : error ? <h3>Failed to fetch recommended books.</h3> : (
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>
                        <strong>author</strong>
                        </th>
                        <th>
                        <strong>published</strong>
                        </th>
                    </tr>
                {data.getUsersFavoriteBooks.map((books) => (
                    <React.Fragment key={`${books.title} ${books.author.name}`}>
                        <tr>
                            <td>{books.title}</td>
                            <td>{books.author.name}</td>
                            <td>{books.published}</td>
                        </tr>
                    </React.Fragment>
                ))}
            </tbody>
        </table>
        )
        }
        </>
    )
}

export default Recommendations