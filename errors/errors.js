
const error={};

error.errorLogger=(error, request, response, next) => {
        console.log(`errorLogger ${error.message}`) 
        next(error) // calling next middleware
}

error.errorResponder= (error, request, response, next) => {

    response.header("Content-Type", 'application/json')
    const status = error.status || 400
    response.status(status).send(error.message)
}

  error.invalidPathHandler= (request, response, next) => {
    response.status(404)
    response.send('invalid path')
  }
  
  module.exports=error;