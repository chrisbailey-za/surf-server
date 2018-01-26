const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const Ratings = mongoose.model('rating');

module.exports = app => {

	app.get('/api/ratings/fetchAll', requireLogin, async (req, res) => {
		const ratings = await Ratings.find({ _user: req.user.id })
			.select()

		res.send(ratings);
	})
};