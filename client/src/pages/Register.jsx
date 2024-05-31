import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { register } from '../services/auth'

function Register() {
    const [data, setData] = useState({
        name: '',
        email: '',
        mobile: '',
        password: ''
    })
    const handleChange = (e) => {
        setData({...data, [e.target.name]: e.target.value})
    }
    const navigate = useNavigate();
    const registerUser = async (e) => {
        e.preventDefault();
        const response = await register(data);
        alert(response.data);
        navigate('/login')
    }
    
  return (
    <>
        <h1>Create an account</h1>
        <form style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            width: '300px',
            margin: 'auto'
        }} onSubmit={registerUser}>
            <input type="text" name='name' onChange={handleChange} placeholder='Name' />
            <input type='email' name='email' onChange={handleChange} placeholder='Email' />
            <input type='tel' name='mobile' onChange={handleChange} placeholder='Mobile' />
            <input type='password' name='password' onChange={handleChange} placeholder='Password' />
            <div>
            <input type='checkBox' id='checkbox' name='checkbox' />
            <label htmlFor="checkbox">By creating an account, I agree to our terms of use and privacy policy</label>
            </div>
            <button type='submit'>Create Account</button>
        </form>
    </>
  )
}

export default Register