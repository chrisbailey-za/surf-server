const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const axios = require('axios');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
const CronJob = require('cron').CronJob;
const mswCall = require('./services/mswCall');
const tideCall = require('./services/tideCall');
require('./models/User');
require('./models/Spot');
require('./models/Session');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());

app.use(
	cookieSession({
		maxAge: 90 * 24 * 60 * 60 * 1000,
		keys: [keys.cookieKey]
	})
);

app.use(passport.initialize());
app.use(passport.session());

//returns function and immediately calls with the variable app
require('./routes/authRoutes')(app);
require('./routes/spotRoutes')(app);
require('./routes/sessionRoutes')(app);
require('./routes/locationRoutes')(app);
require('./routes/conditionRoutes')(app);

if (process.env.NODE_ENV === 'production') {
	// Express will serve production assests like main.js file
 app.use(express.static('client/build'));

	// Express will serve the index.html file as default route
	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname,'client', 'build', 'index.html'));
	});
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);


	var tideCron = new CronJob('0 0 0 * * *', () => {
		 tideCall();
	});

	var mswCron = new CronJob('0 0 * * * *', () => {
	   mswCall()
	});

	tideCron.start();
	mswCron.start();