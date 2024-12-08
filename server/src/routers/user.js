const express = require("express");
const router = express.Router();

// router.post("/register", "REGISTER");
// router.post("/login", "LOGIN");
router.get("/login", (req, res) => {
  res.send("Login route");
});

module.exports = router;
