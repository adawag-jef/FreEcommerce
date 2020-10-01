const passport = require("passport");
require("../passport")(passport);

module.exports = {
  isAdmin(req, res, next) {
    if (req.user.role === "admin") {
      next();
    } else {
      res
        .status(401)
        .json({ message: "Sorry only admin can access this endpoint" });
    }
  },

  userAuthenticate: passport.authenticate("jwt", { session: false }),
};
