const logger=require('../logger/logger')
const errorMsg=require('./errorMsg').errorMsg
const error={};

error.errorLogger=(error, req, res, next) => {
  
  next(error)
}

error.errorResponder= (error, req, res, next) => {
    let msg='';
    let type='';

    res.header("Content-Type", 'application/json')

    logger.info("Error Handling Middleware called")
    logger.info('Path: ', req.path)
    logger.info('Error: ', error)

    if (error.TYPE && error.CUSTOM_MSG){
      msg=errorMsg[error.TYPE][error.CUSTOM_MSG];
      type=error.TYPE;
    }
    else{
      logger.error(error);
      res.status(500).send("Internal Error"); 
      next(error);
   
    }


    
    if (type=="SERVER_ERROR"){
      logger.error(error.LOGGER_IDENTITY + error.message); 
      res.status(500).send(msg);
    }

    else if (type=="SERVER_OFFLINE"){
      logger.error(error.LOGGER_IDENTITY + error.message); 
      res.status(503).send(msg);
    }
    else{
      logger.error(error)      
    }


          
    next(error) // calling next middleware




}

  error.invalidPathHandler= (req, res, next) => {
    // res.status(404)
    // res.send('invalid path')
  }
  
  module.exports=error;