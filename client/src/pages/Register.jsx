import axios from 'axios';
import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import { ToastContainer} from 'react-toastify';

const Register = () => {

 const [email,setEmail]=useState("");
 const [pass,setPass]=useState("")

 const navigate= useNavigate();
  const handleSubmit=(e)=>{
    e.preventDefault()

 try {
  console.log(" Submit ",{email,pass})
  axios.post("http://localhost:3001/register",{email,pass})
  .then((response)=>{
    if(response.status===201){
      
    alert("Registration succussfully ")
    navigate('/login')
    }
     
  })
 } 
 catch (error) {
   console.log(error.message)
  
 }


 

  }
  return (
    <div className='container   w-50 border border-primary my-5  p-5  rounded'>
      <h4> Registeration</h4>
      <form onSubmit={(e)=>{handleSubmit(e)}}>
  <div className="form-group my-3">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email"
     className="form-control" 
     placeholder="Enter email" 
     value={email}
     onChange={(e)=>{setEmail(e.target.value)}}
      required
     />

  </div>
  <div className="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" className="form-control" placeholder="Password"
     value={pass}
     onChange={(e)=>{setPass(e.target.value)}}
     required
      
    />
  </div>

  <button type="submit" className="btn btn-primary w-100 my-4" >Register</button>
  <span>Already have Account ?</span> <Link to='/login'>Login</Link>
</form>
<ToastContainer/>

    </div>
  )
}

export default Register;
