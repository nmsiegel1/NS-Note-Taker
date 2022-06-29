const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

const app = express();
const PORT = process.env.PORT || 3001;


// middlewear
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'))


// use api routes
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// listen
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});