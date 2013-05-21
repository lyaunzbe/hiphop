/**
 * Hiphop Model
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
 * Unit tests for the Hiphop model.
 * 
 * Hiphop
 *  - init
 *  - showtime
 *  - roster
 *  - add
 *  - rm
 */

var begin = Date.now();

async.auto({
	init : function (callback) {
		callback(null, new Hiphop(['Masta Ace', 'Wu-Tang Clan']));
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

		callback(null, hiphop.add('Rakim'));
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
			roster   = obj.roster;

		test('Model definition', function (t) {
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
			showtime.forEach(function(rapper){
				t.equal(typeof rapper, 'object', rapper.name +' is a Rapper object');
			});
			t.end();
		});

		test('Add', function (t) {
			t.ok(add, 'add should be valid');
			t.ok(Array.isArray(add), 'add should be an array representing the roster list');
			t.equal(add.length, 3, 'the roster list should now contain three rappers');
			t.equal(add.pop(), 'Rakim', 'ensure that the appropriate rapper was really added');
			t.end();
		});

		test('Remove', function (t) {
			t.ok(rm, 'rm should be valid');
			t.equal(typeof rm, 'object', 'rm is a Rapper object');
			t.equal(rm.name, 'Wu-Tang Clan', 'ensure that the appropriate rapper was removed');
			t.end();
		});

		test('Roster', function (t) {
			t.ok(roster, 'roster should be valid');
			t.ok(Array.isArray(roster), 'roster should be an array representing the roster list');
			t.equal(typeof roster[0], 'string', 'roster should contain strings of rapper names');
			t.equal(roster.length, 2, 'the roster list should now contain two rappers');
			t.end();
		});

		// console.log('Tests completed in '+ ((Date.now()-begin)/1000)+' seconds.');

	}]
});	
