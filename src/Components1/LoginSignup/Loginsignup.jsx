import React, { useState } from 'react'
import './Loginsignup.css'

import person from '../assets/icons8-person-50.png'
import email from '../assets/icons8-email-50.png'
import password from '../assets/icons8-password-50.png'
import { useNavigate } from 'react-router-dom'
// import { useNavigate } from 'react-router-dom'

const Loginsignup = () => {

    const [action,setAction] = useState("SignUp")
    const [formData, setFormData] =useState({ name:"", email:"", password:"" })
    const [error, setError] = useState("")
    const navigate = useNavigate()
  
    // Handle input change
    const handleChange= (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    // Clear form 
    const clearForm = () =>{
      setFormData({ name:"", email:"",password:""})
      setError("")
    }

   // signup function
  const handleSignUp = () => {
    const { name, email, password } = formData;
    if (!name || !email || !password) {
      setError("All fields are required!");
      
      return;
    }

    localStorage.setItem(
      "user",
      JSON.stringify({ name, email, password, loggedIn: false })
    );

    alert("Signup Successful! Please Login.");
    clearForm();
    setAction("Login");
  };

  // login function
  const handleLogin = () => {
    const { email, password } = formData;
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!email || !password) {
      setError("Email & Password required!");
      return;
    }

    if (
      storedUser &&
      storedUser.email === email &&
      storedUser.password === password
    ) {
      localStorage.setItem(
        "user",
        JSON.stringify({ ...storedUser, loggedIn: true })
      );
      alert("Login Successful!");
      clearForm();
      navigate("/navbar"); // Navbar page pe navigate
    } else {
      setError("Invalid Credentials!");
    }
  };

  return (
     
    <div className='container'>
      
        <div className="header">
            <div className="text">{action}</div>
            <div className="underline"></div>
        </div>

         <div className="inputs">
        {action === "SignUp" && (
          <div className="input">
            <img src={person} alt="" />
            <input
              type="text"
              placeholder="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
        )}
            

             <div className="input">
                <img src={email} alt="" />
                <input type="email" name="email" placeholder='Email Id'  value={formData.email} 
                 onChange={handleChange} disabled={action === "SignUp" && !formData.name} // Name bharna compulsory
                 />
            </div>

             <div className="input">
                <img src={password} alt="" />
                <input type="password" placeholder='Password'
           name="password"
            value={formData.password}
            onChange={handleChange}
            disabled={ (action === "SignUp" && !formData.email) || (action === "SignUp" && !formData.name)} 
            // Email aur Name bharna compulsory
              />
            </div>
        </div>


        {/* {action==="SignUp"? null :<div className="forgot-password">Forgot Password ? <span>Click Here</span></div>} */}
        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

      {action === "Login" && (<div className="forgot-password"> Forgot Password ? <span>Click Here</span></div>)}
        
        <div className="submit-container">

   {action === "SignUp" ? (<div className="submit" onClick={handleSignUp}>Sign Up </div>) : 
   (<div className="submit" onClick={handleLogin}> Login </div>)}

   <div className="submit gray" onClick={() => setAction(action === "SignUp" ? "Login" : "SignUp")}>
          {action === "SignUp" ? "Go to Login" : "Go to SignUp"} </div>
          
            {/* <div className={action==="Login"?"submit gray":"submit"} onClick={()=>{setAction("SignUp")}} >SignUp</div>
            <div className={action==="SignUp"?"submit gray":"submit"} onClick={()=>{setAction("Login")}} >Login</div> */}

        </div>
    </div>

    
  
  )
}

export default Loginsignup



  // const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  //    const navigate = useNavigate();

  //      const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  //   const handleSubmit = async () => {
  //   try {
  //     let url =
  //       action === "SignUp"
  //         ? "http://localhost:5000/api/auth/signup"
  //         : "http://localhost:5000/api/auth/login";

  //     const res = await fetch(url, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(formData),
  //     });

  //     const data = await res.json();

  //     if (data.token) {
  //       localStorage.setItem("token", data.token);
  //       navigate("/home"); // navigate to home after login/signup
  //     } else {
  //       alert(data.msg || "Something went wrong");
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };


      // <button className="submit" onClick={handleSubmit}>
      //   {action}
      // </button>