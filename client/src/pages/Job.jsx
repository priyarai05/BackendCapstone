import {useState, useEffect} from 'react'
import { getAllJobs } from '../services/jobs'
import { useNavigate } from 'react-router-dom'
import Navbar from './navbar/Navbar'
import './Job.scss'

function Job() {
  const [jobs, setJobs] = useState([])
  const [skills, setSkills] = useState("")
  const [filteredSkills, setFilteredSkills] = useState(false)
  useEffect(() => {
    getAllJobs({ skills: ""}).then((response) => {
      setJobs(response.data)
      // console.log(jobs)
    }).catch((error) => {
      console.log(error)
      setJobs([])
    })
  }, [])
  const navigate = useNavigate()
  const gotoJobDetails = (id) =>{
    navigate(`/jobs/${id}`)
  }
  const triggerSearch = () => {
    getAllJobs({ skills }).then((response) => {
      setJobs(response.data)
      setFilteredSkills(true)
      console.log(skills)
    }).catch((error) => {
      console.log(error)
      setJobs([])
    })
  }
  return (
    <div>
      <Navbar />
      <div className='searchBox'>
      <input type="text" value={skills} onChange={(e) => setSkills(e.target.value)} placeholder='search by skills (separate by comma)' />
      {filteredSkills && (<div className='skills'>
        {skills.split(',').map((skill) => {
          return <span><span key={skill} className='skill'>{skill}</span><span>X</span></span>
        })}
      </div>)}
      {localStorage.getItem("token") ? 
      <div className='filter'>
        <button onClick={triggerSearch}>Apply Filter</button>
        <button style={{border: 'none'}} className='inactive' onClick={triggerSearch}>Clear</button>
      <button onClick={() => navigate("/create-job")}>+ Add Job</button>
      </div>
              :
              <div className='filter'>
              <button onClick={triggerSearch}>Apply Filter</button>
              <button style={{border: 'none'}} className='inactive' onClick={triggerSearch}>Clear</button>
              </div>
      }
      </div>
      <ul className='jobList'>
        {
          jobs.map((job) => (
            <li key={job._id} className='singleJob'>
              <div className="left">
                <img src={job.companyLogo} alt="logo" />
                <h2>{job.title}</h2>
                <div><span>{job.salary}</span>&nbsp;<span>{job.location}</span></div>
                <div className='locationType'><span>{job.locationType}</span>&nbsp;<span>{job.jobType}</span></div>
              </div>
              
              <div className='right'>
                <div className='skills'>{job.skills.map((skill, idx) => 
                (
                    <li className='skill' key={idx}>{skill}</li>
                ))}</div>
                {/* <p>{job.skills.join(", ")}</p> */}
                <button onClick={() => gotoJobDetails(job._id)}>View Details</button>
                {localStorage.getItem("token") && <button className='inactive' onClick={() => navigate(`/edit/${job._id}`)}>Edit Job</button>}
              </div>
            </li>  
          ))
        }
      </ul>
    </div>
  )
}

export default Job