import {useState, useEffect} from 'react'
import { getJobById } from '../services/jobs'
import Navbar from './navbar/Navbar'
import './JobDetails.scss'

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
    <div className='detailsPage'>
      <Navbar />
        {jobDetails && (
        <div className='content'>
          <div className='title'>
            <h2>{jobDetails.title} {jobDetails.locationType} {jobDetails.jobType} at {jobDetails.companyName}</h2>
          </div>

          <div className='details'>
            <p>{jobDetails.jobType}</p>
            <h1>{jobDetails.title}</h1>
            <p style={{color:'#ED5353'}}>{jobDetails.location}</p>
            <h3>About Company</h3>
            <p>{jobDetails.aboutCompany}</p>
            <h3>About the job/internship</h3>
            <p>{jobDetails.description}</p>
            <h3>Skill(s) required</h3>
            <ul className='skills'>{jobDetails.skills.map((skill, idx) => (
                <li className='skill' key={idx}>{skill}</li>
            ))}</ul>
            <h3>Information</h3>
            <p>{jobDetails.information}</p>
          </div>
        </div>)}
        {jobDetails === null && (<h1>Job not found</h1>)}
    </div>
  )
}

export default JobDetails