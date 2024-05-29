const Job = require("../models/job");

const createJob = async (req, res, next) => {
  try {
    const {
      title,
      companyName,
      location,
      salary,
      description,
      locationType,
      jobType,
      skills,
    } = req.body;
    if (
      !title ||
      !companyName ||
      !location ||
      !salary ||
      !description ||
      !locationType ||
      !jobType ||
      !skills
    ) {
      return res.status(400).send("Please fill all the fields");
    }
    const skillsArray = skills.split(",").map((skill) => skill.trim());
    const newJob = new Job({
      title,
      companyName,
      location,
      salary,
      description,
      locationType,
      jobType,
      skills: skillsArray,
      refUserId: req.userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await newJob.save();
    res.status(201).send("Job created successfully");
  } catch (err) {
    return res.status(400).json({ msg: err.message });
  }
};

const getAllJob = async (req, res, next) => {
  try {
    const jobs = await Job.find()
      .select(["title", "companyName", "location", "skills"])
      .sort({ createdAt: -1 });
    // .populate("refUserId")
    // .populate("skills")
    // .exec();
    res.status(200).json(jobs);
  } catch (err) {
    return res.status(400).json({ msg: err.message });
  }
};

const getJobById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id);
    if (!job) {
      res.status(404).send("Job not found!");
    }
    res.status(200).send(job);
  } catch (err) {
    next(err);
  }
};

const updateJob = async (req, res, next) => {
  try {
    const { jobnumber } = req.params;
    const job = await Job.findById(jobnumber);
    const skillsArray = req.body.skills
      ? req.body.skills.split(",").map((skill) => skill.trim())
      : null;

    const updateJob = await Job.findByIdAndUpdate(
      jobnumber,
      {
        title: req.body.title || job.title,
        companyName: req.body.companyName || job.companyName,
        location: req.body.location || job.location,
        salary: req.body.salary || job.salary,
        description: req.body.description || job.description,
        locationType: req.body.locationType || job.locationType,
        jobType: req.body.jobType || job.jobType,
        skills: skillsArray || job.skills,
        updatedAt: new Date(),
        createdAt: job.createdAt,
      },
      { new: true }
    );
    res.status(200).send(updateJob);
  } catch (err) {
    next(err);
  }
};
module.exports = { createJob, getAllJob, getJobById, updateJob };
