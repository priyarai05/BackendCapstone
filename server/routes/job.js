const express = require("express");
const { verifyAuth } = require("../middleware/verifyAuth");
const {
  createJob,
  getAllJob,
  getJobById,
  updateJob,
} = require("../controllers/job");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send("Job Route");
});

router.post("/create", verifyAuth, createJob);
router.get("/all", getAllJob);
router.get("/view/:id", getJobById);
router.patch("/update/:jobnumber", verifyAuth, updateJob);
module.exports = router;
