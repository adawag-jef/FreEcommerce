const express = require("express");
const router = express.Router();

const auth = require("../utilities/auth");
const AuthController = require("../controllers/AuthController");

router.get("/", AuthController.getAllUsers);
router.post("/register", AuthController.register);
router.post("/login", AuthController.logIn);
router.get("/user", auth.userAuthenticate, AuthController.current);
// router.get("/logout", AuthController.logOut);
// router.get(
//   "/profile",
//   passport.authenticate("jwt", { session: false }),
//   AuthController.profile
// );

module.exports = router;
