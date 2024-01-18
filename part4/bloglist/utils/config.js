const PORT = process.env.PORT || 3003

const PASSWORD = encodeURIComponent(process.env.MONGO_PASS)

const MONGODB_URI = process.env.NODE_ENV === 'test' ?
  `mongodb+srv://${process.env.MONGO_USER}:${PASSWORD}@cluster0.7fmaegp.mongodb.net/testBlogList?retryWrites=true&w=majority` :
  `mongodb+srv://${process.env.MONGO_USER}:${PASSWORD}@cluster0.7fmaegp.mongodb.net/bloglist?retryWrites=true&w=majority` || process.env.MONGODB_URI

module.exports = {
  MONGODB_URI,
  PORT
}