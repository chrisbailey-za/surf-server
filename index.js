const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const axios = require('axios');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
const modelCreation = require('./services/modelCreation');
const cron = require('cron');
const mswCall = require('./services/mswCall');
const tideCall = require('./services/tideCall');

require('./models/User');
require('./models/Spot');
require('./models/Session');
require('./models/Rating');
require('./models/ForecastHist');
require('./models/ForecastTable');
require('./services/passport');


mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());


//returns function and immediately calls with the variable app

require('./routes/modelCreation')(app);
require('./routes/ratingRoutes')(app);

var CronJob = cron.CronJob;
new CronJob('* * * 23', function() {
  tideCall();
}, null, true, 'America/Los_Angeles');

new CronJob('* * * * ', function() {
  mswCall();
}, null, true, 'America/Los_Angeles');


const PORT = process.env.PORT || 5000;
app.listen(PORT);

