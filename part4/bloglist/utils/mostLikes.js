

const mostLikes = (blogs) => {
  const blogLikes = blogs.map(({ likes }) => likes)
  const maxNoOfLikes = Math.max(...blogLikes)
  const blogFormat = blogs.map(({ author, likes }) => ({ author, likes }))
  const blogWithMostLikes = blogFormat.filter(({ likes }) => likes === maxNoOfLikes)[0]

  return blogWithMostLikes
}

module.exports = mostLikes