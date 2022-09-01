var express = require('express');
var expressApp=require('../../libraries/expressApp.js')
var signinLdapCtrl=require('../../controllers/auth/signinLdap')
var router = express.Router({mergeParams: true})

app=expressApp.app;
app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});


router.post('/',async function (req, res) {
    let authResult=await signinLdapCtrl.ldapAuthenticate(req.body.userName,req.body.password)
    res.send(authResult)
})


router.get('/', function (req, res) {
    res.send({ title: 'At Signin' })
})

module.exports = router