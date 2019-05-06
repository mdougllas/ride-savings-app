const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Restaurants = require('../models/restaurants');
const Temp = require('../models/temp');

//router using all promises' results
router.get("/", ensureAuthenticated, (req, res) => {

//Promise to get restaurants from database
const getRestaurants =
  Restaurants.find()
    .then(restaurants => {
      return restaurants;
    })
    .catch(error => {
      console.log(error);
    })
;// Ends promise restaurants

//Promise to get user from database

const getTemp =
  Temp.findOne()
    .then(temp => {
      return temp;
    })
    .catch(error => {
      console.log(error);
    })
;// Ends promise temp


Promise.all([getRestaurants, getTemp])
    .then(results => {
      const restaurants = results[0];
      const temp = results[1].uberId;

      User.findOne({'uberId': temp})
      .then(user => {
        res.render("dashboard", {user, restaurants});
        Temp.collection.drop();
      })
      .catch(error => {
        console.log(error);
      })
    })
    .catch(error => {
      console.log(error)
    })
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  
  res.redirect('/');
}

module.exports = router;