const { secretOrKey } = require("../config/keys");

const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secretOrKey;

// 引入User
const User = require("../models/User");

// opts.issuer = "accounts.examplesoft.com";
// opts.audience = "yoursite.net";

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, async function (jwt_payload, done) {
      //   console.log(jwt_payload);
      const user = await User.findById(jwt_payload._id).lean().exec();
      if (user) {
        const { password, ...result } = user;
        return done(null, result);
      } else {
        return done(new Error("用户未登录"));
      }

      //   User.findOne({ id: jwt_payload.sub }, function (err, user) {
      //     if (err) {
      //       return done(err, false);
      //     }
      //     if (user) {
      //       return done(null, user);
      //     } else {
      //       return done(null, false);
      //       // or you could create a new account
      //     }
      //   });
    })
  );
};
