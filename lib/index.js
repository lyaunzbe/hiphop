/** 
 * Exposes the Hiphop module
 *
 * @package hiphop
 * @author Ben Lyaunzon
 */

var Rapper = require('./rapper.js');

function Hiphop (opts) {
	this.roster = [];

	//Roster should work a bit like a cache
	//no need to make a request if the roster
	//already contains the rapper object.
	
}

Hiphop.prototype.mc = function (artist, callback) {
	// If the artist exists, return a Rapper object.
	// Otherwise, throw an error.

	Rapper.init(artist, function (err, rapper){
		if(err)  callback(err);
		callback(null, rapper);
	});
};

module.exports = new Hiphop();