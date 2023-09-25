const User = require("../models/user");
const bcrypt = require("bcryptjs");
const Owner = require("../models/owner");

exports.getOwnerSignUP = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/ownerSignUp", {
    pageTitle: "Sign Up",
    path: "/signup",
    isAuthenticated: false,
  });
};

exports.getOwnerLogin = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/ownerLogin", {
    pageTitle: "Sign Up",
    path: "/signup",
    isAuthenticated: false,
  });
};

exports.getSignUP = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/sign-up", {
    pageTitle: "Sign Up",
    path: "/signup",
    isAuthenticated: false,
  });
};

exports.getLogin = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/login", {
    pageTitle: "Sign Up",
    path: "/signup",
    isAuthenticated: false,
  });
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  User.findOne({ email: email })
    .then((userDoc) => {
      if (userDoc) {
        return res.redirect("/signup");
      }
      return bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          const user = new User({
            email: email,
            password: hashedPassword,
            booking: { items: [] },
          });
          return user.save();
        })
        .then((result) => {
          res.redirect("/login");
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

// exports.postLogin = (req, res, next) => {
//   const email = req.body.email;
//   const password = req.body.password;
//   User.findOne({ email: email }).then((user) => {
//     if (!user) {
//       return res.redirect("/login");
//     }
//     bcrypt.compare(password, user.password).then((comp) => {
//       if (comp) {
//         return res.redirect("/cars");
//       }
//       res.redirect("/cars");
//     });
//   });
// };

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        req.flash("error", "Invalid email or password.");
        return res.redirect("/login");
      }

      bcrypt
        .compare(password, user.password)
        .then((doMatch) => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save((err) => {
              console.log(err);
              return res.redirect("/cars");
            });
          }
          req.flash("error", "Invalid email or password.");
          res.redirect("/login");
        })
        .catch((err) => {
          console.log(err);
          res.redirect("/login");
        });
    })
    .catch((err) => console.log(err));
};

exports.postOwnerLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  Owner.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.redirect("/owner/login");
      }
      req.session.isLoggedIn = true;
      req.session.owner = user;
      bcrypt
        .compare(password, user.password)
        .then((doMatch) => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.owner = user;
            return req.session.save((err) => {
              console.log(err);
              res.redirect("/owner/add-car");
            });
          }
          res.redirect("/owner/login");
        })
        .catch((err) => {
          console.log(err);
          res.redirect("/owner/login");
        });
    })
    .catch((err) => console.log(err));
};

exports.postOwnerSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  Owner.findOne({ email: email })
    .then((userDoc) => {
      if (userDoc) {
        return res.redirect("/owner/signup");
      }
      return bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          const user = new Owner({
            email: email,
            password: hashedPassword,
          });
          return user.save();
        })
        .then((result) => {
          res.redirect("/owner/login");
        });
    })
    .catch((err) => {
      console.log(err);
    });
};
