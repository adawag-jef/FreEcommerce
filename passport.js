var JwtStrategy = require("passport-jwt").Strategy;

const User = require("./models/User");

const TokenExtractor = (req) => {
  let token = null;
  if (req && req.headers) {
    token = req.headers["authorization"].split(" ")[1];
  }
  return token;
};

let opts = {};
opts.jwtFromRequest = TokenExtractor;
opts.secretOrKey = process.env.JWT_SECRET;

module.exports = function (passport) {
  passport.use(
    new JwtStrategy(opts, async function (jwt_payload, done) {
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
