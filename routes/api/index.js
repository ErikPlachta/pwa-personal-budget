//------------------------------------------------------------------------------
//-- Imports
const router = require('express').Router();

const entryRoutes = require('./entry-routes');

//------------------------------------------------------------------------------
//-- Routing
router.use('/entry', entryRoutes);

//-- if gets here when rounting, throw 404
router.use((req, res) => {
    // console.log(`//-- Calling a ${req.method} in controllers/api/index.js`);
    res.status(404).json({
      request:  { method: req.method, params: req.params, path: "./api", },
      response: { status: 404, message: "API rquest failure. Page not found." }
    })
    .end();
  });

//-- Exporting express router with api routes up to ../index.js
module.exports = router;