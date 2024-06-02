import {useState, useEffect} from 'react'
import { getAllJobs } from '../services/jobs'
import { useNavigate } from 'react-router-dom'

function Job() {
  const [jobs, setJobs] = useState([])
  const [skills, setSkills] = useState("")
  useEffect(() => {
    getAllJobs().then((response) => {
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
    }).catch((error) => {
      console.log(error)
      setJobs([])
    })
  }
  return (
    <div>
      <h1>Jobs</h1>
      <input type="text" placeholder='search by skills (separate by comma)' />
      <button style={{
                padding: '5px 10px',
                backgroundColor: '#ED5353',
                color: 'white',
                cursor: 'pointer',
                marginTop: '5px',
                border: 'none',
                borderRadius: '5px'
              }} onClick={triggerSearch}>Search</button>
      {localStorage.getItem("token") && <button style={{
                padding: '5px 10px',
                backgroundColor: '#ED5353',
                color: 'white',
                cursor: 'pointer',
                marginTop: '5px',
                border: 'none',
                borderRadius: '5px'
              }} onClick={() => navigate("/create-job")}>+ Add Job</button>}
      <ul>
        {
          jobs.map((job) => (
            <li key={job._id}>
              <h1>{job.title}</h1>
              <h2>{job.companyName}</h2>
              <div><span>{job.salary}</span>&nbsp;<span>{job.location}</span></div>
              <div>{job.skills.map((skill, idx) => 
              (
                  <li key={idx}>{skill}</li>
              ))}</div>
              {/* <p>{job.skills.join(", ")}</p> */}
              <div><span>{job.locationType}</span>&nbsp;<span>{job.jobType}</span></div>
              <button style={{
                padding: '5px 10px',
                backgroundColor: '#ED5353',
                color: 'white',
                cursor: 'pointer',
                marginTop: '5px',
                border: 'none',
                borderRadius: '5px'
              }} onClick={() => gotoJobDetails(job._id)}>View Details</button>
              {localStorage.getItem("token") && <button style={{
                padding: '5px 10px',
                borderBlock: '1px solid #ED5353',
                color: '#ED5353',
                cursor: 'pointer',
                marginTop: '5px',
                marginLeft: '5px',
                borderRadius: '5px'
              }} onClick={() => navigate(`/edit/${job._id}`)}>Edit Job</button>}
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default Job