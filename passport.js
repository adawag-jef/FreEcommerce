const { ExtractJwt, Strategy } = require("passport-jwt");

const User = require("./models/User");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("Bearer"),
  secretOrKey: process.env.JWT_SECRET,
};

module.exports = function (passport) {
  passport.use(
    new Strategy(options, async function (jwt_payload, done) {
      try {
        const user = await User.findById({ _id: jwt_payload.sub }).select(
          "-password"
        );
        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      } catch (err) {
        return done(err, false);
      }
    })
  );
};
