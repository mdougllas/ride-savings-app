const passport       = require("passport");
const uberStrategy = require('passport-uber-v2').Strategy;
const User = require('../models/user');
const Temp = require('../models/temp');
require("dotenv").config();


passport.serializeUser(function(user, cb) { cb(null, user); });
passport.deserializeUser(function(obj, cb) { cb(null, obj);  });

passport.use(new uberStrategy({
    clientID: process.env.UBER_USER_ID,
    clientSecret: process.env.UBER_SECRET,
    callbackURL: process.env.CALLBACK
  },
  (accessToken, refreshToken, profile, done) => {
    let {firstname: firstName, lastname: lastName, email, avatar: picture, id: uberId} = profile;
    console.log("HEY MOTHERFUCKER!!!!!!!!!!!!!!!!!!!", uberId);

    Temp.findOne({ uberId }, (err, temp) => {

      if (err) {
        console.log(err);
      }
      if (temp) {
        //return done(null, temp);
      }
      const newTemp = new Temp({
        uberId
      });

      newTemp.save((err) => {
        if (err) {
          console.log(err);
        }
        //done(null, newTemp);
      });  

    });


    User.findOne({ uberId }, (err, user) => {
  
      if (err) {
        return done(err);
      }
      if (user) {
        return done(null, user);
      }
      const newUser = new User({
        firstName,
        lastName,
        email,
        picture,
        uberId
      });
  
      newUser.save((err) => {
        if (err) {
          return done(err);
        }
        done(null, newUser);
      });
    });
}));

module.exports = passport;