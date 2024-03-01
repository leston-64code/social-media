import { SiLoop } from "react-icons/si"
import "./style.css"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import Swal from "sweetalert2"
import axios from "axios"

const Login = () => {

  const navigate = useNavigate()

  const [email, setEmail] = useState("leston@gamil.com")
  const [password, setPassword] = useState("987654321")


  const [loading, setLoading] = useState(false)

  async function handleLogin() {
    setLoading(true)
    if ( !email || !password ) {
      setLoading(false)
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please enter all fields'
      });
    }

    await axios.post(`${process.env.REACT_APP_BASE_URL}/api/auth/login`, { email, password }).then((res) => {
      if (res.data.success === true) {
        setLoading(false)
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: "Logged in successfully"
        });
        localStorage.setItem("user_id",res.data.user.user_id)
        navigate("/home/setting")
      }
    }).catch((error) => {
      setLoading(false)
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: "An error occured"
      });
    })
  }

  return (
    <>
      <div className='w-screen flex flex-row'>

        <div className='w-[80%] max-h-full hidden lg:flex justify-evenly items-center bg-gray-200'>
          <SiLoop className="w-[200px] h-[200px] align-middle animate-spin text-red-500" />
          <p className="text-6xl font-bold">LinkLoop</p>
        </div>

        <div className='w-[60%] h-[100%] bg-red-5 flex-auto'>
          <section>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

              <SiLoop className="w-[40px] h-[40px] align-middle animate-spin text-red-500" />

              <div className="w-full bg-white rounded-lg md:mt-0 sm:max-w-md xl:p-0">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                    Login
                  </h1>
                  <p className='inline-block'>New to xeroscape.&nbsp;</p>
                  <Link to="/register" className='font-semibold text-[#1A5ACC] hover:underline inline-block'>Create an account?</Link>

                  <div className="space-y-4 md:space-y-6">

                    <div>
                      <input type="email" name="email" id="email" className="auth-inputs" placeholder="Email Address" required="" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                    </div>

                    <div>
                      <input type="password" name="password" id="password" placeholder="Enter Password" className="auth-inputs" required="" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-start">

                        <div className="flex items-center h-5">
                          <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50" required="" />
                        </div>

                        <div className="ml-3 text-sm">
                          <label htmlFor="remember" className="text-gray-500">Stay logged in</label>
                        </div>

                      </div>
                      <Link to="/forgot" className="text-sm font-medium text-[#1A5ACC] hover:underline ">Forgot password?</Link>
                    </div>

                    <div className='items-center justify-center text-center'>

                      {/* <p className='text-[#8C8C8C] text-sm font-semibold text-left'>If needed, inform users about the use of a CAPTCHA or reCAPTCHA system for added security.</p> */}
                      <button className="w-[50%] m-auto text-white bg-[#1A5ACC] font-medium rounded-md text-sm px-5 py-2.5 mt-3 text-center hover:shadow-lg flex flex-row justify-center" onClick={() => { handleLogin()}} >
                        {
                          loading === false ? 'Login' :
                            <>
                              <div className='rounded-full border-t-[2px] border-white w-5 h-5 animate-spin mr-5'></div>
                              Login
                            </>
                        }
                      </button>

                    </div>

                    <div className='flex items-center'>
                      <hr className='w-[40%] mx-2' />
                      <p className='text-sm font-thin text-gray'>OR</p>
                      <hr className='w-[40%] mx-2' />
                    </div>

                    <div className='flex flex-row w-full justify-around'>
                      <img className='hover:shadow-md cursor-pointer' src={require("./assets/Google.png")} alt="" />
                      <img className='hover:shadow-md cursor-pointer' src={require("./assets/Linkedin.png")} alt="" />
                      <img className='hover:shadow-md cursor-pointer' src={require("./assets/Facebook.png")} alt="" />
                      <img className='hover:shadow-md cursor-pointer' src={require("./assets/Twitter X.png")} alt="" />
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

export default Login
