const jwt = require("jsonwebtoken");

let User = require("../models/User");

const AuthController = {
  async getAllUsers(req, res, next) {
    const users = await User.find({}).select("-password");
    return res.status(200).json({ users });
  },

  register(req, res, next) {
    if (!req.body.username || !req.body.email || !req.body.password) {
      res.json({
        success: false,
        msg: "Please pass username, email and password.",
      });
    } else {
      var newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        role: "user",
      });
      // save the user
      newUser.save(function (err) {
        if (err) {
          console.log(err.message);
          return res.json({ success: false, msg: "Username already exists." });
        }
        res.json({ success: true, msg: "Successful created new user." });
      });
    }
  },

  async logIn(req, res, next) {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      res.status(401).send({
        success: false,
        msg: "Authentication failed. User not found.",
      });
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
          });
          // return the information including token as JSON
          res.json({
            success: true,
            token: token,
            user: {
              username: user.username,
              email: user.email,
              id: user.id,
              role: user.role,
            },
          });
        } else {
          res.status(401).send({
            success: false,
            msg: "Authentication failed. Wrong password.",
          });
        }
      });
    }
  },

  // logOut(req, res, next) {
  //   req.logout();
  //   res.status(200).send({ success: true, msg: "Successfully Logout." });
  // },

  profile(req, res, next) {
    return res.status(200).send({ success: true, msg: req.user });
  },

  current(req, res, next) {
    return res.status(200).json({
      user: {
        username: req.user.username,
        email: req.user.email,
        id: req.user.id,
        role: req.user.role,
      },
    });
  },
};

module.exports = AuthController;
