/**
 * Loads all router files that will be used in the application. This way,
 * we only need to require this one file in our app.js
 */
var router = require('express').Router();

// Routes are seperated into modules
router.use('/wells', require('./wells'));

module.exports = router;
