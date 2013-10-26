/**
 * Rapper Model
 * @package hiphop
 * @author Ben Lyaunzon
 */

/**
 * Dependencies
 */
var test = require('tap').test,
	async = require('async'),
	Hiphop = require(__dirname+'/../lib/index.js'),
	Rapper = require(__dirname+'/../lib/rapper.js'),
	Song   = require(__dirname+'/../lib/song.js');

/**
 * Unit tests for the Rapper model.
 * 
 * Rapper
 *  - about
 *  - songs
 *  - jams
 *  - albums
 *  - search
 *  - getSong
 *  - getAlbum
 */

var begin = Date.now();

async.auto({
	
	init : function (callback) {
		callback(null, new Hiphop('MF Doom'));
	},

	showtime : ['init', function (callback, obj) {
		var hiphop = obj.init;
		
		hiphop.showtime(function(err, mf_doom) {
			if(err) callback(err);
			callback(null, mf_doom);
		});
	}],

	about : ['showtime', function (callback, obj) {
		var doom = obj.showtime;
		
		callback(null, doom.about());

	}],

	songs :  ['showtime', function (callback, obj) {
		var doom = obj.showtime;

		callback(null, doom.songs());

	}],

	jams : ['showtime', function (callback, obj) {
		var doom = obj.showtime;

		callback(null, doom.jams());

	}],

	albums : ['showtime', function (callback, obj) {
		var doom = obj.showtime;

		callback(null, doom.albums());

	}],

	search : ['showtime', function (callback, obj) {
		var doom = obj.showtime;

		callback(null, doom.search('Beef Rapp'));

	}],

	getSong : ['search', function (callback, obj) {
		var doom = obj.showtime,
				song = obj.search[2];
		doom.getSong(song, function(err, result){
			if(err) callback(err);
			callback(err, result);
		});
	}],

	getAlbum : ['showtime', function (callback, obj) {
		var doom = obj.showtime;

		callback(null, null);

	}],

	test : ['getSong','getAlbum', function (callback, obj) {
		// Define test objects.
		var mf_doom  = obj.showtime,
			about    = obj.about,
			songs    = obj.songs,
			jams     = obj.jams,
			albums   = obj.albums,
			search 	 = obj.search,
			Beef_Rapp = obj.getSong,
			MM_Food  = obj.getAlbum;			
		
		test('Model definition', function (t) {
			t.ok(mf_doom, 'MF Doom should be valid');
			t.equal(typeof mf_doom, 'object', 'MF Doom should be an object');
			t.ok(mf_doom instanceof Rapper, 'MF Doom should be a rapper');
			t.ok(mf_doom._songList, 'MF Doom\'s songs should be populated');
			t.ok(mf_doom._jams, 'MF Doom\'s jams should be populated');
			t.ok(mf_doom._albumList, 'MF Doom\'s albums should be populated');
			t.end();
		});

		test('About', function (t) {
			t.ok(about, 'about should be valid');
			t.equal(typeof about, 'object', 'about should be an object');
			t.ok(about.raw, 'about should contain the raw description');
			t.ok(about.html, 'about should contain the html description');
			t.equal()
			t.end();
		});

		test('Songs', function (t) {
			t.ok(songs, 'songs should be valid');
			t.end();
		});

		test('Jams', function (t) {
			t.ok(jams, 'jams should be valid');
			t.end();
		});

		test('Albums', function (t) {
			t.ok(albums, 'albums should be valid');
			t.end();
		});

		test('Search', function (t) {
			t.ok(search, 'the search results should be valid');
			t.end();
		});

		test('Song', function (t) {
			t.ok(Beef_Rapp, 'the song should be valid');
			t.ok(Beef_Rapp instanceof Song, 'the song should be a Song object');
			t.end();
		});

		// test('Album', function (t) {
		// 	t.ok(MM_Food, 'the album should be valid');
		// 	t.end();
		// });

		// For timing
		// console.log('Tests completed in '+ ((Date.now()-begin)/1000)+' seconds.');

	}]
});	
