const bcrypt = require("bcryptjs");

const User = require("../models/user");

exports.getLogin = (req, res) => {
  if (req.session.isAuthenticated) {
    return res.redirect("/");
  }
  const message = req.flash("error")[0] ?? null;

  res.render("auth/login", {
    errorMessage: message
  });
}

exports.getSignup = (req, res) => {
  if (req.session.isAuthenticated) {
    return res.redirect("/");
  }
  const message = req.flash("error")[0] ?? null;

  res.render("auth/register", {
    errorMessage: message
  });
}

exports.postSignup = (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  User.findOne({email: email}).then((user) => {
    if (user) {
      req.flash(
        "error",
        "The email already exist."
      );
      return res.redirect("/signup");
    }
    if (password != confirmPassword) {
      req.flash(
        "error",
        "Password does not match."
      );
      return res.redirect("/signup");
    }
    return bcrypt.hash(password, 12).then((encryptedPassword) => {
      const user = new User({
        name: name,
        email: email,
        password: encryptedPassword
      });
      return user.save();
    }).then(result => {
      res.redirect("/login");
    }).catch((err) => {
      console.log(err);
      res.render("404");
    });

  }).catch((err) => {
    console.log(err);
    res.render("404");
  });
}

exports.postLogin = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({email:email}).then((user) => {
    if (!user) {
      req.flash(
        "error",
        "Invalid email."
      );
      return res.redirect("/login");
    }
    bcrypt.compare(password, user.password).then((passwordMatched) => {
      if (!passwordMatched) {
        req.flash(
          "error",
          "Incorrect password."
        );
        return res.redirect("/login");
      }
      req.session.isAuthenticated = true;
      req.session.user = user;
      return res.redirect("/");
    }).catch((err) => {
      console.log(err);
      res.render("404");
    });

  }).catch((err) => {
    console.log(err);
    res.render("404");
  });
}

exports.postLogout = (req, res) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect("/");
  });
}