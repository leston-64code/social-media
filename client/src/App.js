import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './modules/auth/SignUp'
import Login from './modules/auth/Login'
import "./index.css"
import ProfilePage from './modules/user/ProfilePage';
import Camera from './modules/components/Camera';
import MainLayout from './layout/MainLayout';
import HomePage from './modules/pages/HomePage';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='/home' element={<MainLayout />} >
            <Route index element={<HomePage />} />
            <Route path="profile" element={<ProfilePage />} />
            {/* <Route path="fst" element={<Fst />} /> */}
          </Route>
            {/* <Route path="/profile" element={<ProfilePage />} /> */}
            {/* <Route path="/cam" element={<Camera />} /> */}
            {/* <Route path="/main" element={<MainLayout />} /> */}
        </Routes>
      </Router>

    </>
  )
}

export default App
