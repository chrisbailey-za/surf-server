const requireLogin = require('../middlewares/requireLogin')
const mongoose = require('mongoose');
const Spot = mongoose.model('spots');

module.exports = app => {
	app.get('http://magicseaweed.com/api/YOURAPIKEY/forecast/?spot_id=848&fields=timestamp,wind.*,swell.*', 
		(req, res) => {
		const mswData = req.body;
		console.log(mswData);
		res.json(mswData);
		
		// const spot = new Spot({
		// 	name: name,
		// 	rating: rating,
		// 	minCondition: conditionSchema,
		// 	maxCondition: conditionSchema,
		// 	_location: location,
		// 	_user: req.user.id
		// });
	});
};