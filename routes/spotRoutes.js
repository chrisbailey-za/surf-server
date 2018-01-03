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
			notification: quality > 2 ? true : false,
			notificationVal: 100 - quality*5,
			_user: req.user.id
		});
	
	try {
		await spot.save( async (err, spotInstance) => {
			req.user.spots.push({spotId: spotInstance.id, name: spotInstance.spotName});
			const user = await req.user.save();
			res.send({user:user, id:spotInstance.id});
		});	
		
	} catch (err) {
		res.status(422).send(err);
	}

	})

	app.get('/api/spots/fetchAll', requireLogin, async (req, res) => {
		const spots = await Spot.find({ _user: req.user.id })
			.select()

		res.send(spots);
	})

	app.get('/api/spots/fetchNotifications', requireLogin, async (req, res) => {
		const spots = await Spot.find({ _user: req.user.id })
			.select('spotName notification notificationVal')

		res.send(spots);
	})
};