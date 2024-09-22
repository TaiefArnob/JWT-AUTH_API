import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './signup.css';
import { handleError, handleSuccess } from './utils';

const Login = () => {
  const initialUser = {
    email: '',
    password: ''
  };

  const navigate=useNavigate()

  const [loginInfo, setLoginInfo] = useState(initialUser);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo({
      ...loginInfo,
      [name]: value
    });
    console.log(loginInfo);
    
  };

  const handleSubmit=async (e)=>{
        e.preventDefault();
        const {email,password}=loginInfo;

        if(!email||!password){
            return handleError('All fields are required!')
        }

        try{
            const url='http://localhost:8000/auth/login'

            const response=await fetch(url,{
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(loginInfo)
            });
            const result=await response.json();
            const {success,message,error,jwtToken,name}=result

            if(success){
                handleSuccess(message);
                localStorage.setItem('token',jwtToken);
                localStorage.setItem('loggedInUser',name);
                setTimeout(()=>{
                    navigate('/home')
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
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email..."
            onChange={handleChange}
            value={loginInfo.email}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password..."
            onChange={handleChange}
            value={loginInfo.password}
          />
        </div>

        <button>Login</button>
        <span>
          Don't have an account? <Link to="/signup">Signup</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
