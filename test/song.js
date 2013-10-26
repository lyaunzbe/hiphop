/**
 * Song Model
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
 * Unit tests for the Song model.
 * 
 * Songs
 *  - lyrics
 */

var begin = Date.now();

async.auto({
  init : function (callback) {
    callback(null, new Hiphop('MF Doom'));
  },

  showtime : ['init', function (callback, obj) {
    var hiphop = obj.init;
    
    hiphop.showtime(function(err, doom) {
      if(err) callback(err);
      var Beef_rapp = doom.search('Beef Rapp')[2];

      doom.getSong(Beef_rapp, function(err, song){
          if(err) callback(err);
          callback(null, song);
      });
    });
  }],

  lyrics: ['showtime', function (callback, obj) {
    var Beef_rapp = obj.showtime;

    callback(null, Beef_rapp.lyrics);
  }],

  test: ['lyrics', function (callback, obj) {
    // Define test objects
    var Beef_rapp = obj.showtime,
        lyrics = obj.lyrics;

    test('Model definition', function (t) {
      t.ok(Beef_rapp, 'Beef Rapp should be valid');
      t.equal(typeof Beef_rapp, 'object', 'Beef Rapp should be an object');
      t.ok(Beef_rapp instanceof Song, 'Beef Rapp should be an instance of Song');
      t.ok(Beef_rapp.lyrics, 'Beef Rapp\'s lyrics should be populated');
      t.end();
    });

    test('Lyrics', function (t) {
      t.ok(Array.isArray(lyrics), 'Lyrics should be an array');
      t.ok(lyrics.length > 0, 'Lyrics should be non-empty');
      t.end();
    })

  }]

});