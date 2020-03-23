const userModel = require('../../models/user')
const Validator = require("validator");
module.exports = (req, res, next) => {
  const user = new userModel(req.body);
  var status = true;
  let name = user["name"]
  let email = user["email"]
  let password = user["password"]
  let rpassword = req.body.rpassword
  let errorList = { namestatus: true, namemessage: "", emailstatus: true, emailmessage: "", passwordstatus: true, passwordmessage: "", rpasswordstatus: true, rpasswordmessage: "" }
  let emptytextFieldMessage = "Please Fill this Text Field"
  if ((name == null) || (name === "")) {
    status = false
    errorList.namestatus = false
    errorList.namemessage = emptytextFieldMessage
  }
  if ((email == null) || (email === "")) {
    status = false
    errorList.emailstatus = false
    errorList.emailmessage = emptytextFieldMessage
  }
  if ((password == null) || (password === "")) {
    status = false
    errorList.passwordstatus = false
    errorList.passwordmessage = emptytextFieldMessage
  }
  if ((rpassword == null) || (rpassword === "")) {
    status = false
    errorList.rpasswordstatus = false
    errorList.rpasswordmessage = emptytextFieldMessage
  }

  if (status) {

    var re = /\S+@\S+\.\S+/;

    if (!re.test(email)) {
      status = false
      errorList.emailstatus = false
      errorList.emailmessage = "Please enter a valid email address"

    }

    if (!Validator.isLength(password, { min: 6, max: 30 })) {
      status = false
      errorList.passwordstatus = false
      errorList.passwordmessage = "The password should at least consist of 6 characters"
      errorList.rpasswordstatus = false
      errorList.rpasswordmessage = "The password should at least consist of 6 characters"
    }
    else {
      if (password != rpassword) {
        status = false
        errorList.passwordstatus = false
        errorList.passwordmessage = "The password do not match"
        errorList.rpasswordstatus = false
        errorList.rpasswordmessage = "The passwords do not match"
      }
    }
  }

  //console.log(name+" "+email+" "+password+" "+rpassword)

  if (!status) { res.status(202).json(errorList); }
  else {
    next()
  }

}
