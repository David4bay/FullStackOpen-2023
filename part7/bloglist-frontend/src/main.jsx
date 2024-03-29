import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Users from './components/Users'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import SingleBlogPost from './components/SingleBlogPost'

ReactDOM.createRoot(document.getElementById('root')).render(
    <StrictMode>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/users/*" element={<Users />} />
            <Route path="/blogs/*" element={<SingleBlogPost />} />
          </Routes>
        </Router>
      </Provider>
    </StrictMode>
    )