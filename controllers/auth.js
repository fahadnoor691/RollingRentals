const User = require("../models/user");
const bcrypt = require("bcryptjs");
const Owner = require("../models/owner");

exports.getOwnerSignUP = (req, res, next) => {
  res.render("auth/ownerSignUp", {
    pageTitle: "Sign Up",
    path: "/signup",
  });
};

exports.getOwnerLogin = (req, res, next) => {
  res.render("auth/ownerLogin", {
    pageTitle: "Sign Up",
    path: "/signup",
  });
};

exports.getSignUP = (req, res, next) => {
  res.render("auth/sign-up", {
    pageTitle: "Sign Up",
    path: "/signup",
  });
};

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Sign Up",
    path: "/signup",
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
        return res.redirect("/login");
      }
      bcrypt
        .compare(password, user.password)
        .then((doMatch) => {
          if (doMatch) {
            return res.redirect("/cars");
          }
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
      bcrypt
        .compare(password, user.password)
        .then((doMatch) => {
          if (doMatch) {
            return res.redirect("/owner/add-car");
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
