const requireLogin = require('../middlewares/requireLogin')
const mongoose = require('mongoose');
const Spot = mongoose.model('spots');

module.exports = app => {
	app.post('/api/spots/add', requireLogin, (req, res) => {
		const { name, location, rating, minCondition, maxCondition } = req.body;

		const spot = new Spot({
			name: name,
			rating: rating,
			minCondition: conditionSchema,
			maxCondition: conditionSchema,
			_location: location,
			_user: req.user.id
		});
	});
};