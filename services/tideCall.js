const axios = require("axios");
const keys = require("../config/keys");
const mongoose = require("mongoose");
require('../models/Tidetable');

mongoose.connect(keys.mongoURI);

const Tide = mongoose.model('tides');

var now = new Date;

const options = 'https://www.worldtides.info/api?heights' +
			'&lat=' + -33.925 +
			'&lon=' + 18.424 +
			'&length=' + 604800 +
			'&start=' + (Math.round(now.getTime()/3600000)*3600-43200) +
			'&step=' + 3600 +
			'&datum=' + 'LAT' +
			'&key=' + [keys.wtidesKey];

const tideCall = async () => {
	const res = await axios.get(options);
	const tideData = res.data.heights;

	Tide.findOneAndUpdate({}, 
		{
			tideTable: tideData,
			date: tideData[0].dt * 1000
		}, 
		{upsert:true}, 
		function(err, doc){
				if (err) return res.send(500, { error: err });
			});
};


module.exports = tideCall();

//need to add 0.12 to compensate for difference in LAT and LLD.
//also need to compensate for GTM+2 by adding two hours