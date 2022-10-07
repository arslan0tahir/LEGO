const e = require('express');
var httpContext = require('express-http-context');
const errorMsg=require('./errorMsg').errorMsg
const logger=require('../logger/logger');
const error={};


error.ERROR=(error,errorType,serverMessage='',clientMsgKey='',loggerIdentity)=>{


  error.message=serverMessage;
  error.TYPE=errorType;
  error.CUSTOM_MSG=clientMsgKey;
  error.LOGGER_IDENTITY=loggerIdentity;

  return error;  
}


error.errorLogger=(error, req, res, next) => {

  // if (error.LOGGER_IDENTITY){
  //   logger.error(error.LOGGER_IDENTITY + error.message); 
  //   logger.error("ERROR STACK",error)
  // }
  // else{
  //   logger.error(error)
  // }  
  next(error)
}


error.errorResponder= (error, req, res, next) => {
    let msg='';
    let type='';
    const requestId=httpContext.get('requestId')

    res.header("Content-Type", 'application/json')

    logger.info("ErrorHandling Middleware called")


    //### msg is a client side message
    //### error.message is a server side message

    if (error.TYPE && error.CUSTOM_MSG && error.LOGGER_IDENTITY){
      msg=`[ ${requestId} ] : ${errorMsg[error.TYPE][error.CUSTOM_MSG]}`;
      type=error.TYPE;
    }
    else{
      logger.error(error);
      res.status(500).send("Internal Error"); 
      next(error);   
    }

    

    //### if no server message is defined, client message and server message are same
    if (!error.message){
      error.message=msg
    }
    
    logger.error(error.LOGGER_IDENTITY + error.message); 

    if (type=="SERVER_ERROR"){      
      res.status(500).send(msg);
    }

    else if (type=="SERVER_OFFLINE"){
      res.status(503).send(msg);
    }
    else if (type=="FORBIDDEN"){
      res.status(403).send(msg);
    }
    else if (type=="INVALID_INPUT"){
      res.status(403).send(msg);
    }
    else{
      res.status(500).send("Uknown Error");      
    }
    
    

    return next(error) // calling next middleware
}

  error.invalidPathHandler= (req, res, next) => {
    // res.status(404)
    // res.send('invalid path')
  }
  
  module.exports=error;