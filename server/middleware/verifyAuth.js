const jwt = require("jsonwebtoken");

const verifyAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: "Authorization denied" });
    }
    //move secret to env
    const decode = jwt.verify(token, "secret");
    req.userId = decode.userId;
    next();
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
};

module.exports = { verifyAuth };
