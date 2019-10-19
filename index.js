const express = require('express')
var mySystem = require('./routes/system/system')
const app = express()
const port = 3000

// app.get('/', (req, res) => res.send('Hello World!'))
app.use(function(req,res,next){
    
    let r="";
    r=req.url;


    let siteChain=req.url.split("/");

    if (siteChain[0]=="siteId"){
        req.sitesChain="";
        req.currSiteId=siteChain[0];
    }
    else{
        req.sitesChain=siteChain;
        req.currSiteId=0;
    }

    
    console.log(r)
    
    next();
})
app.use('/pakistan/islamabad/marketing/', mySystem)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

