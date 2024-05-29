const express = require("express");
const router = express.Router();
const { registerUser, loginUser, allUsers } = require("../controllers/user");

router.get("/", (req, res) => {
  res.status(200).send("Auth Route");
});

//take the email, name, mobile and password from the request body
//check if the user already exist in the database
//if not, create a new user and send the token back to the client
//hash the password using bcrypt
//save the user to the database

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/all", allUsers);

module.exports = router;
