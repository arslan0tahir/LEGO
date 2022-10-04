const length=4


const makeid=function (length) {
    var result           = '';
    var characters       = 'abcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

const requestUid=()=>{
  return `${makeid(length)}-${makeid(length)}-${makeid(length)}`
}

module.exports=requestUid