var client = require('./client.js');

function Song () {
	this.name;
	this.about;
	this.jams = [];
	this.songs = [];
	this.albums = [];
}

Song.prototype.init = function (name, callback) {
	var that = this;

	client.getSong(artist, function (err, result){

	});
};

module.exports = new Song();