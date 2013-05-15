var client = require('./client.js');

function Rapper (argument) {
	this.name;
	this.about;
	this.jams = [];
	this.songs = [];
	this.albums = [];
}

Rapper.prototype.init = function (artist, callback) {
	var that = this;

	client.getArtist(artist, function (err, result){
		if(err) callback(err);
		that.name = result.name;
		that.songs = result.songs;
		that.jams = result.jams
		that.albums = result.albums;
		that.about = result.about;
		callback(null, that);
	});
};

module.exports = new Rapper();