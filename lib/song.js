var client = require('./client.js');

function Song () {
	this.title
}

Song.prototype.init = function (name, callback) {
	var that = this;

	client.getSong(artist, function (err, result){

	});
};

module.exports = new Song();