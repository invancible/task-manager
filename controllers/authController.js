

exports.getLogin = (req, res) => {
  res.render("auth/login");
}

exports.getSignup = (req, res) => {
  res.render("auth/register");
}