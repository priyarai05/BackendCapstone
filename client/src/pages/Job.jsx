import {useState, useEffect} from 'react'
import { getAllJobs } from '../services/jobs'
import { useNavigate } from 'react-router-dom'

function Job() {
  const [jobs, setJobs] = useState([])
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
  return (
    <div>
      <h1>Jobs</h1>
      <ul>
        {
          jobs.map((job) => (
            <li key={job._id}>
              <h1>{job.title}</h1>
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
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default Job