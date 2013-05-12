var client = require('./client.js');

function Rapper (argument) {
	this.name;
	this.jams = [];
	this.songs = [];
	this.albums = [];
}

Rapper.prototype.init = function (artist, callback) {
	var that = this;

	client.getArtist(artist, function (err, result){
		if(err) callback(err);
		callback(null, result);
	});
};

module.exports = new Rapper();