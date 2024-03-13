
const totalLikes = (arr) => {
  return arr.reduce((acc, num) => {
    return acc + num.likes
  }, 0)
}

module.exports = totalLikes