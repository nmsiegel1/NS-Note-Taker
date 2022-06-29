const router = require('express').Router();
const noteRoutes = require('../apiRoutes/noteRoutes');

// use routes
router.use(noteRoutes);

module.exports = router;