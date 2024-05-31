import { useState } from 'react'
import { login } from '../services/auth'
import { useNavigate } from 'react-router-dom'

function Login() {
    const [data, setData] = useState({
        email: '',
        password: ''
    })
    const handleChange = (e) => {
        setData({...data, [e.target.name]: e.target.value})
    }
    const navigate = useNavigate()
    const handleLogin = (e) => {
        e.preventDefault()
        login(data).then((response) => {
            alert(`Welcome ${response.data.name}`);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userId", response.data.userId);
            console.log(response.data)
            navigate('/jobs')
        })
    }
  return (
    <>
        <h1>Already have an account?</h1>
        <p>Your personal job finder is here</p>
        <form onSubmit={handleLogin} style={{display:'flex', flexDirection: 'column', gap: '1rem', width: '300px'}}>
            <input type="email" name='email' onChange={handleChange} placeholder='Email' />
            <input type="password" name='password' onChange={handleChange} placeholder='Password' />
            <button type='submit'>Sign in</button>
        </form>
    </>
  )
}

export default Login