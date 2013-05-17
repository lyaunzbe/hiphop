/**
 * Tests
 *
 * @package hiphop
 * @author Ben Lyaunzon
 */

/**
 * Dependencies
 */
var test = require('tape'),
	async = require('async'),
	Hiphop = require(__dirname+'/../lib/index.js');

/**
 * Functional tests for the Hiphop object.
 * 
 * Hiphop
 *  - init
 *  - showtime
 *  - roster
 *  - add
 *  - rm
 */
async.auto({
	init : function (callback) {
		callback(null, new Hiphop(['Usher', 'Wu-Tang Clan']));
	},

	showtime : ['init', function (callback, obj) {
		var hiphop = obj.init;

		hiphop.showtime(function(err, rappers) {
			if(err) callback(err);
			callback(null,rappers);
		});
	}],

	add : ['showtime', function (callback, obj) {
		var hiphop = obj.init;

		hiphop.add('Rakim', function(err, rapper){
			if(err) callback(err);
			callback(null, rapper);
		});
		
	}],

	rm :  ['add', function (callback, obj) {
		var hiphop = obj.init;

		callback(null, hiphop.rm('Wu-Tang Clan'));

	}],

	roster : ['rm', function (callback, obj) {
		var hiphop = obj.init;

		callback(null, hiphop.getRoster());
	}],

	test : ['roster', function (callback, obj) {
		var hiphop   = obj.init,
			showtime = obj.showtime,
			add      = obj.add,
			rm       = obj.rm,
			roster   = obj.roser;

		test('Module definition', function (t) {
			t.ok(hiphop, 'hiphop should be valid');
			t.equal(typeof hiphop, 'object', 'Module should be an object');
			t.equal(typeof hiphop.showtime, 'function', 'Method should be a function');
			t.equal(typeof hiphop.add, 'function', 'Method should be a function');
			t.equal(typeof hiphop.rm, 'function', 'Method should be a function');
			t.equal(typeof hiphop.getRoster, 'function', 'Method should be a function');
			t.end();
		});

		test('Showtime', function (t) {
			t.ok(showtime, 'showtime should be valid');
			t.ok(Array.isArray(showtime), 'showtime should be an array');
			t.equal(showtime.length, 2, 'showtime should contain two items');
			t.equal(typeof showtime.pop(), 'object', 'showtime contains objects');
			t.end();
		});

		test('Add', function (t) {

		});

		test('Remove', function (t) {

		});

		test('Roster', function (t) {

		});
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

