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
	hiphop = require(__dirname+'/../lib/index.js');

/**
 * Mic check 1..2..1..2
 */
var showtime = function(err, rapper){

	console.log(rapper);
	Usher = rapper;


	async.auto({
		jams: function (callback) {
			// Usher.jams(callback);
			callback(null,null);
		},

		songs: function (callback) {
			// Usher.songs(callback);
			callback(null,null);

		},

		song: function (callback) {
			// Usher.song('Confessions', callback);
			callback(null,null);

		},

		test: ['jams', 'songs', 'song', 'lyrics', function (callback, obj) {
			console.log(obj);

			test('Rapper', function (t) {

			});

			test('Jams', function (t) {

			});

			test('Songs', function (t) {

			});

			test('Song', function (t) {

			});
		}]
	});
}

/**
 * Drop the beat!
 */
hiphop.mc('Usher', showtime);

