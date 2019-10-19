var express = require('express')
var router = express.Router()

// // middleware that is specific to this router
// router.use(function timeLog (req, res, next) {
//   console.log('Time: ', Date.now())
//   next()
// })

// define the home page route


// shortnotaion  /siteName/siteName/.../siteName/system
// long notation /siteId/23/system


// select COLUMN_NAME, CONSTRAINT_NAME, REFERENCED_COLUMN_NAME, REFERENCED_TABLE_NAME
// from information_schema.KEY_COLUMN_USAGE
// where TABLE_NAME = 'site_register'

router.get('/system', function (req, res) {
  let r="";
  r=req.url;

  res.send(r);
})

module.exports = router