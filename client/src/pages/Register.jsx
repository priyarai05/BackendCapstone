import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { register } from '../services/auth'
import './Register.scss'

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
    <div className='container'>
        <div className="left">
            <div className="loginForm">
            <h1>Create an account</h1>
            <p>Your personal job finder is here</p>
            <form onSubmit={registerUser}>
            <input type="text" name='name' onChange={handleChange} placeholder='Name' />
            <input type='email' name='email' onChange={handleChange} placeholder='Email' />
            <input type='tel' name='mobile' onChange={handleChange} placeholder='Mobile' />
            <input type='password' name='password' onChange={handleChange} placeholder='Password' />
            <div>
            <input type='checkBox' id='checkbox' name='checkbox' />
            <label htmlFor="checkbox"> By creating an account, I agree to our terms of use and privacy policy</label>
            </div>
            <div>
                <button type='submit'>Create Account</button>
                <p>Already have an account? <span onClick={() => navigate('/login')}>Sign In</span></p>
            </div>
            
        </form>
        </div>
        </div>
        <div className="right">
            <img src="register.png" alt="" />
        </div>    
    </div>
  )
}

export default Register