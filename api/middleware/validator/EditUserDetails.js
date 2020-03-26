const userModel = require('../../models/user')
const Validator = require("validator");
module.exports = (req, res, next) => {

  var status = true;
  let name = req.body.name
  let email = req.body.email

  let errorList = { namemessage: "", emailmessage: "" }
  let emptytextFieldMessage = "Please Fill this Text Field"
  if ((name == null) || (name === "")) {
    status = false

    errorList.namemessage = emptytextFieldMessage
  }
  if ((email == null) || (email === "")) {
    status = false

    errorList.emailmessage = emptytextFieldMessage
  }

  if (status) {

    var re = /\S+@\S+\.\S+/;

    if (!re.test(email)) {
      status = false

      errorList.emailmessage = "Please enter a valid email address"

    }
  }

  //console.log(name+" "+email+" "+password+" "+rpassword)

  if (!status) { res.status(202).json(errorList); }
  else {
    next()
  }
}
