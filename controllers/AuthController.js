const jwt = require("jsonwebtoken");

let User = require("../models/User");
const ApiError = require("../error/api-error");

class AuthController {
  async getAllUsers(req, res, next) {
    const users = await User.find({}).select("-password");
    return res.status(200).json({ users });
  }

  async register(req, res, next) {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      role: "user",
    });
    // save the user
    try {
      const savedUser = await newUser.save();
      return savedUser;
    } catch (error) {
      next(error);
    }
  }

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
  }

  // logOut(req, res, next) {
  //   req.logout();
  //   res.status(200).send({ success: true, msg: "Successfully Logout." });
  // },

  profile(req, res, next) {
    return res.status(200).send({ success: true, msg: req.user });
  }

  current(req, res, next) {
    return res.status(200).json({
      user: {
        username: req.user.username,
        email: req.user.email,
        id: req.user.id,
        role: req.user.role,
      },
    });
  }
}

module.exports = new AuthController();
