// import { useEffect, useState } from 'react'
// import { login } from '../../services/auth'
import { useNavigate } from 'react-router-dom'
import './Navbar.scss'

function Navbar() {
    const navigate = useNavigate()
    // const [username, setUsername] = useState('')
    
    // useEffect(() => {
    //   login(data).then((response) =>{
    //     if(response.data){
    //         console.log(response.data)
    //     }    
    //   }).catch((err) =>{
    //     console.log(err)
    //   })
    // }, [])
    
  return (
    <nav>
        <header>
        <div>
            <h1>Jobfinder</h1>
        </div>
        {localStorage.getItem("token") ? 
         <div className='buttons'>
            <button style={{background: 'none'}} onClick={() => {}}>Logout</button>
            <button style={{background: 'none'}}>Hello! Recruiter</button>
         </div>   
        :
        <div className='buttons'>
        <button className='login' onClick={() => navigate('/login')}>Login</button>
        <button className='register' onClick={() => navigate('/register')}>Register</button>
    </div>
        }
        
        </header>
        <img id='rec1' src="Rectangle 2.png" alt="" />
        <img id='rec2' src="Rectangle 3.png" alt="" />
        <img id='rec3' src="Rectangle 4.png" alt="" />
    </nav>
  )
}

export default Navbar