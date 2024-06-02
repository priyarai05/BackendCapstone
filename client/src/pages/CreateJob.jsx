import {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { createJob, getJobById, updateJob } from '../services/jobs'

function CreateJob() {
    const navigate = useNavigate()

    const url = new URL(window.location.href)
    const isEdit = url.pathname.includes("/edit")

    const [data, setData] = useState({
      title: '',
      companyName: '',
      location: '',
      description: '',
      salary: '',
      locationType: '',
      jobType: '',
      skills: ''
    })

    const handleChange = (e) => {
      setData((data) => {return  {...data, [e.target.name]: e.target.value}})
    }
    
    const handleSubmit = async (e) => {
      e.preventDefault()
      if(isEdit){
        const id = url.pathname.split("/")[2]
        console.log(id)
        const response = await updateJob(id, data)
        alert(response.data)
        if(response.status === 200){
          navigate("/jobs")
        }
      }
      else{
      const response = await createJob(data)
      alert(response.data)
      if(response.status == 201){
        navigate('/jobs')
      }
    }
    }
    useEffect(() => {
      const token = localStorage.getItem("token")
      if (!token) {
        navigate("/login")
      }else{
        
        if(isEdit){
          const id = url.pathname.split("/")[2]
          const response = getJobById(id)
          response.then((res) => {
            const skills = res.data.skills.join(', ')
            setData({...res.data, skills})
          })
        }
      }
    }, [])
    
  return (
    <>
        <h1>Add job description</h1>
        <form onSubmit={handleSubmit} style={{
          display: "flex",
          flexDirection: "column",
          gap: '1rem',
          width: '340px'
        }}>
            <div>
            <label htmlFor="companyName">Company Name</label>
            <input type="text" id='companyName' name='companyName' onChange={handleChange} value={data.companyName} placeholder='Enter your company name here' />
            </div>
            <div>
            <label htmlFor="title">Job Position</label>
            <input type="text" id='title' name='title' onChange={handleChange} value={data.title} placeholder='Enter job position' />
            </div>
            <div>
            <label htmlFor="salary">Monthly Salary</label>
            <input type="number" id='salary' name='salary' onChange={handleChange} value={data.salary} placeholder='Enter amount in rupees' />
            </div>
            <div>
            <label htmlFor="location">Location</label>
            <input type="text" id='location' name='location' onChange={handleChange} value={data.location} placeholder='Enter Location' />
            </div>
            <div>
            <label htmlFor="description">Job Description</label>
            <textarea name="description" id="description" onChange={handleChange} value={data.description} placeholder='Type the job description'></textarea>
            </div>
            <select name="locationType" id="locationType" onChange={handleChange} value={data.locationType} placeholder='Select'>
                <option value={""}>Select</option>
                <option value="remote">Remote</option>
                <option value="hybrid">Hybrid</option>
                <option value="onsite">Onsite</option>
            </select>
            <select name="jobType" id="jobType" onChange={handleChange} value={data.jobType} placeholder='Select'>
                <option value={""}>Select</option>
                <option value="fulltime">Full Time</option>
                <option value="parttime">Part Time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
            </select>
            <div>
            <label htmlFor="skills">Skills</label>
            <input type="text" name='skills' id='skills' onChange={handleChange} value={data.skills} placeholder='Add skills and separate it by comma' />
            {data.skills.split(',').map((skill, idx) => (
              <span key={idx}>{skill}</span>
            ))}
            </div>
            
            {isEdit ? <button type="submit">Update Job</button> : <button type="submit">+ Add Job</button>}
        </form>
    </>
  )
}

export default CreateJob