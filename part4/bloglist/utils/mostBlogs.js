

const mostBlogs = (blogs) => {
  const maxBlogs = Math.max(...blogs.map(({ blogs }) => blogs))
  const blogFormat = blogs.map(({ author, blogs }) => ({ author, blogs }))
  const filterBlogs = blogFormat.filter(({ blogs }) => blogs === maxBlogs)[0]

  return filterBlogs
}

module.exports = mostBlogs