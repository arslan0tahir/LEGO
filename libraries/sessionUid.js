const length=7
let tempId=''

const makeid=function (length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

let sessionUid=(createNew=0)=>{
  
      if (createNew){
          return tempId=makeid(7)        
      }
      else if (!createNew){
        
        if (tempId.length==0){
          return tempId=makeid(7)
        }
        else{
          return tempId
        }
      }
}

module.exports=sessionUid