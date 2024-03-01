import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './modules/auth/SignUp'
import Login from './modules/auth/Login'
import "./index.css"
import ProfilePage from './modules/user/ProfilePage';
// import ProfileTwo from './modules/user/ProfileTwo';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/profile" element={<ProfilePage/>}/>
        </Routes>
      </Router>

    </>
  )
}

export default App
