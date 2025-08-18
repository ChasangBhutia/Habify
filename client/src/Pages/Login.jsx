import React from 'react'
import { useState } from 'react'
import { loginUser } from "../services/authServices";

const Login = () => {

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        setLoginData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            let response = await loginUser(loginData);
            if(response.data.success) alert(response.data.success);
        }catch(err){
            console.log(err.message);
        }
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder='Email' name='email' value={loginData.email} onChange={handleChange} />
                <input type="password" placeholder='Password' name='password' value={loginData.password} onChange={handleChange} />
                <input type="submit" value="login" />
            </form>
        </div>
    )
}

export default Login