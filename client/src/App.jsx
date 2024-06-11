import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Job from './pages/Job'
import JobDetails from './pages/JobDetails'
import CreateJob from './pages/CreateJob'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/jobs' element={<Job />} />
        <Route path='/jobs/:id' element={<JobDetails />} />
        <Route path='/create-job' element={<CreateJob />} />
        <Route path='/edit/:id' element={<CreateJob />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
