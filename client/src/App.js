import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './modules/auth/SignUp'
import Login from './modules/auth/Login'
import "./index.css"
import ProfilePage from './modules/user/ProfilePage';
import Camera from './modules/components/Camera';
import MainLayout from './layout/MainLayout';
import HomePage from './modules/pages/HomePage';
import SettingUp from './modules/components/SettingUp';
import SearchPage from './modules/pages/SearchPage';
import UserPage from './modules/pages/UserPage';

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
            <Route path="setting" element={<SettingUp />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="user/:user_id" element={<UserPage />} />
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
