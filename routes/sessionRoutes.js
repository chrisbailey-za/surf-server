const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const Session = mongoose.model('sessions');

module.exports = app => {
	app.post('/api/sessions/add', requireLogin, async (req, res) => {

		const { daytime, pseudo, comments, condition, spot } = req.body;

		const session = new Session({
			daytime: daytime,
			condition: condition,
			pseudo: pseudo,
			comments: comments,
			_user: req.user.id,
			_spot: spot
		});

	try {
		await session.save();
		res.send(req.user);	
		
	} catch (err) {
		res.status(422).send(err);
	}

	});
};