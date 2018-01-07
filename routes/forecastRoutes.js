const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const Forecast = mongoose.model('forecast');

module.exports = app => {

	app.get('/api/forecast', requireLogin, async (req, res) => {
		const forecast = await Forecast.findOne({ 'forecastTable.location': req.query.spot })
			.select()

		res.send(forecast.forecastTable);
	})
};