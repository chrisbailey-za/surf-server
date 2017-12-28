const mongoose = require('mongoose');
const ForecastHistory = mongoose.model("forecastHistory");

module.exports = app => {
	app.get('/api/condition/history', async (req, res) => {
		const conditions = await ForecastHistory.find({ location: req.query.spot, dayTime: req.query.date })
			.select()

		res.send(conditions);
	});
};