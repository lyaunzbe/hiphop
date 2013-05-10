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
var Usher = hiphop.mc('Usher');

/**
 * Drop the beat!
 */
async.auto({
	jams: function (callback) {
		Usher.jams(callback);
	},

	songs: function (callback) {
		Usher.songs(callback);
	}

	song: function (callback) {
		Usher.song('Confessions', callback);
	}

	test: ['jams', 'songs', 'song', 'lyrics', function (callback, obj) {
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

