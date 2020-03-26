const userModel = require('../../models/user')
module.exports = (req, res, next) => {
  const user = new userModel(req.body);
  var status = true;

  let email = req.body.email
  let password = req.body.password
  let errorList = { emailmessage: "", passwordmessage: "" }
  let emptytextFieldMessage = "Please Fill this Text Field"
  if ((email == null) || (email === "")) {
    status = false

    errorList.emailmessage = emptytextFieldMessage
  }
  if ((password == null) || (password === "")) {
    status = false

    errorList.passwordmessage = emptytextFieldMessage
  }

  if (!status) { res.status(202).json(errorList); }
  else {
    next()
  }
}
