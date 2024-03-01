import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './modules/auth/SignUp'
import Login from './modules/auth/Login'
import "./index.css"
import ProfilePage from './modules/user/ProfilePage';
// import Camera from './modules/components/Camera';
import Component from './modules/components/Camera';
// import ProfileTwo from './modules/user/ProfileTwo';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/profile" element={<ProfilePage/>}/>
          <Route path="/cam" element={<Component/>}/>
        </Routes>
      </Router>

    </>
  )
}

export default App
