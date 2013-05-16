/**
 * Tests
 *
 * @package hiphop
 * @author Ben Lyaunzon
 */

/**
 * Stage setup
 */
var test = require('tape'),
	async = require('async'),
	Hiphop = require(__dirname+'/../lib/index.js');


async.auto({
	init : function (callback) {
		callback(null, new Hiphop(['Usher', 'Wu-Tang Clan']));
	},

	showtime : ['init', function (callback, obj) {
		var hiphop = obj.init;
		hiphop.showtime(function(err, rappers){
			if(err) callback(err);
			callback(null,rappers);
		});
	}],

	add : ['showtime', function (callback, obj){

	}],

	rm :  ['showtime', function (callback){

	}]
})
/**
 * Mic check 1..2..1..2
 */
// var showtime = function(err, rapper){

// 	Usher = rapper;

// 	async.auto({
// 		jams: function (callback) {
// 			// Usher.jams(callback);
// 			callback(null,null);
// 		},

// 		songs: function (callback) {
// 			// Usher.songs(callback);
// 			callback(null,null);

// 		},

// 		song: function (callback) {
// 			// Usher.song('Confessions', callback);
// 			callback(null,null);

// 		},

// 		test: ['jams', 'songs', 'song', 'lyrics', function (callback, obj) {
// 			console.log(obj);

// 			test('Rapper', function (t) {

// 			});

// 			test('Jams', function (t) {

// 			});

// 			test('Songs', function (t) {

// 			});

// 			test('Song', function (t) {

// 			});
// 		}]
// 	});
// }

