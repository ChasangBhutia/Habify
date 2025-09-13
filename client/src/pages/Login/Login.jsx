import React, { useState } from 'react'
import { useAuthContext } from '../../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {login} = useAuthContext();

    function handleSubmit(e) {
        e.preventDefault();
        login({email, password});
    }
    
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input type="email" value={email} placeholder='email' onChange={(e)=>setEmail(e.target.value)}/>
            <input type="password" value={password} placeholder='Password' onChange={(e)=>setPassword(e.target.value)}/>
            <input type="submit" />
        </form>
    </div>
  )
}

export default Login