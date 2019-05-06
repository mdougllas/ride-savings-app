const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  $home = true;
  res.render('index');
});

module.exports = router;
