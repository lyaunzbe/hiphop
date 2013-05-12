/** 
 * Exposes the Hiphop module
 *
 * @package hiphop
 * @author Ben Lyaunzon
 */

var Rapper = require('./rapper.js'),
	_	   = require('lodash'),
	async  = require('async');

function Hiphop (args) {
	var self = this;

	this.roster = {};
	this.rosterList = [];
	this.rosterList.push(args);
	if(!Array.isArray(args))
		args = [args];
	_.each(args, function(obj){
		self.roster[obj] = {};
	});

	//Roster should work a bit like a cache
	//no need to make a request if the roster
	//already contains the rapper object.
	
}

Hiphop.prototype.showtime = function (callback) {
	// If the artist exists, return a Rapper object.
	// Otherwise, throw an error.
	var self = this;
	
	async.each(this.rosterList, function(artist, callback){
		Rapper.init(artist, function (err, rapper){
			if(err)  callback(err);
			self.roster[artist] = rapper;
			callback(null);
		});
	}, function(err){
		if(err) callback(err);
		callback(null, self.roster);
	});
};

module.exports = Hiphop;