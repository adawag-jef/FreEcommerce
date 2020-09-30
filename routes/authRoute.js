const express = require("express");
const passport = require("passport");

const router = express.Router();

require("../passport")(passport);

const AuthController = require("../controllers/AuthController");

router.get("/", AuthController.getAllUsers);
router.post("/register", AuthController.register);
router.post("/login", AuthController.logIn);
// router.get("/logout", AuthController.logOut);
// router.get(
//   "/profile",
//   passport.authenticate("jwt", { session: false }),
//   AuthController.profile
// );
router.get(
  "/user",
  passport.authenticate("jwt", { session: false }),
  AuthController.current
);

module.exports = router;
