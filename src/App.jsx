import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Main from './pages/main/main'
import Login from './pages/login'
import Navbar from './components/navbar'
import CreatePost from './pages/create-post/createpost'
import ApproveAd from './pages/approveAd/approveAd'

function App() {

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/createpost" element={<CreatePost />} />
          <Route path="/approvead" element={<ApproveAd />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
