import {useState, useEffect} from 'react'
import { getJobById } from '../services/jobs'

function JobDetails() {
    const url = new URL(window.location.href)
    const id = url.pathname.split("/")[2]
    const [jobDetails, setJobDetails] = useState(null)
  useEffect(() => {
    getJobById(id).then((response) => {
        console.log(response)
        if(response.status === 500){
            return setJobDetails(null)
        }else if(response.status === 404){
            return setJobDetails(null)
        }
        setJobDetails(response.data)
    }).catch((error) => {
      console.log(error)
    //   setJobDetails(null)
    })
  }, [id])
  console.log(jobDetails)
  return (
    <div>
        {jobDetails && (<div>
            <h1>{jobDetails.title}</h1>
            <h2>{jobDetails.companyName}</h2>
            <p>{jobDetails.location}</p>
            <p>{jobDetails.locationType}</p>
            <p>{jobDetails.description}</p>
            <ul>{jobDetails.skills.map((skill, idx) => (
                <li key={idx}>{skill}</li>
            ))}</ul>
        </div>)}
        {jobDetails === null && (<h1>Job not found</h1>)}
    </div>
  )
}

export default JobDetails