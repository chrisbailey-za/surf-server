const mongoose = require('mongoose');
const Spot = mongoose.model("spots");

module.exports = app => {
	app.get('/api/location', async (req, res) => {
		 const response = await Spot.find({ _id: req.query.spot})
		 	.select('location')

		 res.send(response);
	});
};