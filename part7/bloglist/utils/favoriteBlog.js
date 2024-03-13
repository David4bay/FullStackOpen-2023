

const favoriteBlog = (blog) => {
  const blogs = [...blog]

  const mappedLikes = blogs.map(({ likes }) => likes)
  const listOfLikes = blogs.map(({ title, author, likes }) => ({ title, author, likes }))
  const maxLikes = Math.max(...mappedLikes)

  return listOfLikes.filter(({ likes }) => likes === maxLikes)[0]
}

module.exports = favoriteBlog