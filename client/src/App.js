import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './modules/auth/SignUp'
import Login from './modules/auth/Login'
import "./index.css"

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
        </Routes>
      </Router>

    </>
  )
}

export default App
