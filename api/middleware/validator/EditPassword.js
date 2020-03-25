const userModel = require('../../models/user')
const Validator = require("validator");

module.exports = (req, res, next) => {

  var status = true;
  let op = req.body.op
  let np = req.body.np
  let rnp = req.body.rnp
  
  let errorList = { oldpasswordmessage:"",npasswordmessage:"",rnpasswordmessage:""}
  let emptytextFieldMessage = "Please Fill this Text Field"
  if ((op == null) || (op === "")) {
    status = false
    
    errorList.oldpasswordmessage = emptytextFieldMessage
  }
  if ((np == null) || (np === "")) {
    status = false
    
    errorList.npasswordmessage = emptytextFieldMessage
  }
  if ((rnp == null) || (rnp === "")) {
    status = false
    
    errorList.rnpasswordmessage = emptytextFieldMessage
  }
  
  

  if (status) {
    if (!Validator.isLength(np, { min: 6, max: 30 })) {
        status = false
        
        errorList.npasswordmessage = "The password should at least consist of 6 characters"
    
        errorList.rnpasswordmessage = "The password should at least consist of 6 characters"
      }
      else {
        if (np != rnp) {
          status = false
          
          errorList.npasswordmessage  = "The password do not match"
         
          errorList.rnpasswordmessage = "The passwords do not match"
        }
      }

   

  }

  //console.log(name+" "+email+" "+password+" "+rpassword)

  if (!status) { res.status(202).json(errorList); }
  else {
    next()
  }

}
