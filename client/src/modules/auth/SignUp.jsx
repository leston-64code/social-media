import { Link } from "react-router-dom"
import { SiLoop } from "react-icons/si";
import "./style.css"

const Register = () => {
  return (
    <div className='w-screen h-screen flex flex-row'>

      <div className='w-[80%] max-h-full hidden lg:flex justify-evenly items-center bg-gray-200'>
        <SiLoop className="w-[200px] h-[200px] align-middle animate-spin text-red-500" />
        <p className="text-6xl font-bold animate-bounce">LinkLoop</p>
      </div>

      <div className='w-[60%] h-[100%] bg-red-5 flex-auto'>
        <section>
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto  lg:py-0">

            <SiLoop className="w-[40px] h-[40px] align-middle animate-spin text-red-500" />

            <div className="w-full bg-white rounded-lg md:mt-0 sm:max-w-md xl:p-0">
              <div className="p-2 md:p-6 space-y-4 md:space-y-5 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                  Signup
                </h1>
                <p className='inline-block'>Existing user.&nbsp;</p>
                <Link to="/" className='font-semibold text-[#1A5ACC] hover:underline inline-block'>Login?</Link>

                <form className="space-y-4 md:space-y-6" action="#">

                  <div>
                    <input type="text" name="name" id="name" className="auth-inputs" placeholder="Full name" required="" />
                  </div>

                  <div>
                    <input type="text" name="name" id="nmae" placeholder="Username" className="auth-inputs" required="" />
                  </div>

                  <div>
                    <input type="email" name="email" id="email" className="auth-inputs" placeholder="Email Address" required="" />
                  </div>

                  <div>
                    <input type="password" name="password" id="password" placeholder="Enter Password" className="auth-inputs" required="" />
                  </div>

                  <div>
                    <input type="password" name="cpassword" id="cpassword" placeholder="Confirm Password" className="auth-inputs" required="" />
                  </div>

                  {/* <div className="flex items-center justify-between">
                      <div className="flex items-start">

                        <div className="flex items-center h-5">
                          <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50" required="" />
                        </div>

                        <div className="ml-3 text-sm">
                          <label htmlFor="remember" className="text-gray-500">by ticking I agree to the terms and conditions</label>
                        </div>

                      </div>
                      
                    </div> */}

                  <div className='items-center justify-center text-center'>
                    <button type="submit" className="w-[50%] m-auto text-white bg-[#1A5ACC] font-medium rounded-md text-sm px-5 py-2.5 mt-3 text-center hover:shadow-lg">SignUp</button>
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

                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Register
