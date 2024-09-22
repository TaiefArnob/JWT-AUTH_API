import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './signup.css';
import { handleError, handleSuccess } from './utils';

const Signup = () => {
  const initialUser = {
    name: '',
    email: '',
    password: ''
  };

  const navigate=useNavigate()

  const [signupInfo, setSignUpInfo] = useState(initialUser);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignUpInfo({
      ...signupInfo,
      [name]: value
    });
    console.log(signupInfo);
    
  };

  const handleSubmit=async (e)=>{
        e.preventDefault();
        const {name,email,password}=signupInfo;

        if(!name||!email||!password){
            return handleError('All fields are required!')
        }

        try{
            const url='http://localhost:8000/auth/signup'

            const response=await fetch(url,{
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(signupInfo)
            });
            const result=await response.json();
            const {success,message,error}=result

            if(success){
                handleSuccess(message);
                setTimeout(()=>{
                    navigate('/login')
                },1000)
            }else if(error){
                const details=error?.details[0].message
                handleError(details)
            }else if(!success){
                handleError(message)
            }



            console.log(result);
            

        }catch(err){
            handleError(err)
        }
  }


  return (
    <div className="container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            autoFocus
            placeholder="Enter your name..."
            onChange={handleChange}
            value={signupInfo.name}
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email..."
            onChange={handleChange}
            value={signupInfo.email}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password..."
            onChange={handleChange}
            value={signupInfo.password}
          />
        </div>

        <button>Signup</button>
        <span>
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Signup;
