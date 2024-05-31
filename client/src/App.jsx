import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Job from './pages/Job'
import JobDetails from './pages/JobDetails'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/jobs' element={<Job />} />
        <Route path='/jobs/:id' element={<JobDetails />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
