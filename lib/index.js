/** 
 * Exposes the Hiphop module
 *
 * @package hiphop
 * @author Ben Lyaunzon
 */

var Rapper = require('./rapper.js'),
	_      = require('lodash'),
	async  = require('async');

function Hiphop(args) {
	var self = this;

	this.roster = {};

	if (!Array.isArray(args)) {
		args = [args];
	}

	this.rosterList = args;

	_.each(this.rosterList, function (obj) {
		self.roster[obj] = {};
	});

	//Roster should work a bit like a cache
	//no need to make a request if the roster
	//already contains the rapper object.
}

/**
 * Showtime delivers the rappers. Give it nothing,
 * it'll return the entire roster of initiated Rapper
 * objects. If you want a specific Rapper(s), give it a
 * string or array of artist names.
 * @param  {String or Aray}		[opts]		
 * @param  {Function}           callback 
 * @return {String or Array}             
 */
Hiphop.prototype.showtime = function (opts, callback) {
	// If the artist exists, return a Rapper object.
	// Otherwise, throw an error.
	var self    = this,
		results = [],
		artists;

	if ((typeof opts === 'function') && !callback) {
		callback = opts;
		artists = this.rosterList;
	} else {
		if (!Array.isArray(opts)) {
			opts = [opts];
		}
		artists = opts;
	}



	async.each(artists, function (artist, callback) {
		// Add roster cache lookup, to avoid duplicate
		// crawls.
		Rapper.init(artist, function (err, rapper) {
			if (err) {
				callback(err);
			}
			self.roster[artist] = rapper;
			results.push(rapper);
			callback(null);
		});
	}, function (err) {
		if (err) {
			callback(err);
		}

		if (results.length === 1) {
			callback(null, _.first(results));
		} else {
			callback(null, results);
		}
	});
};

/**
 * Return the list of rappers in the roster
 * @return {Array} rosterList
 */
Hiphop.prototype.getRoster = function () {
	return this.rosterList;
};

/**
 * Adds a new rapper(s) to the rosterList. Optionally 
 * provide a callback to initialize the rapper(s) and return
 * them.
 * @param {Array or String} artists 
 * @param {function} callback
 * @return {Array or Rapper or Array of Rappers} 
 */
Hiphop.prototype.add = function (artists, callback) {
	if (!Array.isArray(artists)) {
		artists = [artists];
	}

	// Adds new artists, but only if they are unique
	this.rosterList = _.uniq(this.rosterList.concat(artists));

	if (callback) {
		this.showtime(artists, function (err, results) {
			if (err) {
				callback(err);
			}
			callback(null, results);
		});
	} else {
		return this.rosterList;
	}
};

/**
 * Returns the updated list of rappers, but, optionally,
 * with a callback you also recieve the removed rapper(s) object.
 * @retrun {[Array or Rapper]}
 */
Hiphop.prototype.rm = function (artists) {
	var self = this,
		rappers = [];

	if (!Array.isArray(artists)) {
		artists = [artists];
	}

	_.each(artists, function (artist) {
		rappers.push(self.roster[artist]);
	});

	this.rosterList = _.difference(this.rosterList, artists);
	
	if (rappers.length === 1) {
		return _.first(rappers);
	} else {
		return rappers;
	}

};

module.exports = Hiphop;