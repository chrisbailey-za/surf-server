const passport = require('passport');

module.exports = app => {
	app.get(
		'/auth/google',
		passport.authenticate('google', {
			scope: ['profile']
		})
	);

	//has code, which is spotted by passport and handles appropriately
	app.get(
		'/auth/google/callback',
		passport.authenticate('google'),
		(req, res) => {
			res.redirect('/');
		}
	);

	app.get('/api/logout', (req, res) => {
		req.logout();
		res.redirect('/landing');
	});

	app.get('/api/current_user', (req, res) => {
		res.send(req.user);
	});
};
