import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useContext, useEffect, useState } from "react";
import UserContext from "../context/user/Usercontext";

export default function Login() {
  
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  let {logIn,auth,token}=useContext(UserContext);
  let navigate=useNavigate()
  
  useEffect(()=>{
    if(auth){navigate("/")}
  },[auth,token])

  async function handleSubmit(e) {
    e.preventDefault();
    let res=await logIn(email,password);
    if(res.success){
      window.localStorage.setItem("auth-token",res.tok)
      navigate("/");
    }
    
  }
  
  function handleEmailChange(e) {
    
    setEmail(e.target.value)
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value)
  }
  return (
    <div className="min-h-[100vh] bg-background">
      <Navbar />
      <div>
        <h2 className="text-2xl font-semibold text-center text-textcolor my-4 mb-8">
          Please Login To Continue
        </h2>
        <div className="">
          <div className="relative left-1/2 -translate-x-1/2 md:w-[40vw] bg-gray-300 m-3 sm:w-[60vw] w-[80vw] p-4 rounded-md shadow-xl ">
            <form action="/" onSubmit={handleSubmit}>
              
              <div className="mb-3">
                <label htmlFor="email">
                  <h3 className="text-lg font-semibold text-gray-700">Email</h3>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleEmailChange}
                    className="w-[100%] rounded-md p-2 py-1"
                    required
                  />
                </label>
              </div>
              <div className="mb-3">
                <label htmlFor="password">
                  <h3 className="text-lg font-semibold text-gray-700">Password</h3>
                  <input
                    type="text"
                    name="password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                    className="w-[100%] rounded-md p-2 py-1"
                    required
                    minLength={6}
                  />
                </label>
              </div>
              <div className="mt-3">
                <p className="text-gray-600">Already created account <Link to="/login" className="text-blue-700">Login?</Link></p>
              </div>
              <div>
                <button
                className="p-2 bg-textcolor text-background rounded-md relative left-full -translate-x-full hover:bg-gray-800 hover:shadow-lg" type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

