//------------------------------------------------------------------------------
const router = require('express').Router();
// const { WebUser } = require('../models');
// // Import the custom middleware
// const withAuth = require('../utils/auth');


//------------------------------------------------------------------------------
//-- ROUTES

// //-- GET all POSTS for homepage
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'))
})

// Bad URL send home

router.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'))
})


module.exports = router;
