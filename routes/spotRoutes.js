const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const Spot = mongoose.model('spots');

module.exports = app => {
	app.post('/api/spots/add', requireLogin, async (req, res) => {

		const { spotName, location, quality, minCondition, maxCondition } = req.body;

		const spot = new Spot({
			spotName: spotName,
			quality: quality,
			minCondition: minCondition,
			maxCondition: maxCondition,
			location: location,
			_user: req.user.id
		});
		
	try {
		await spot.save();
		req.user.spots.push(spotName);
		const user = await req.user.save();
		
		res.send(user);
	} catch (err) {
		res.status(422).send(err);
	}

	});
};