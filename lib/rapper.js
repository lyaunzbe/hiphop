var client = require('./client.js'),
	_      = require('lodash'),
	async  = require('async');

function Rapper(artist) {
	this.name = artist;
	this._jams = [];
	this._songs = [];
	this._albums = [];
}


// Initializes the Rapper object(s) by scraping the
// artist(s) page.
Rapper.prototype.init = function (artist, callback) {
	var self = this;
	client.getArtist(artist, function (err, result) {
		if (err) {
			callback(err);
		}
		self.name = result.name;
		self._songs = result.songs;
		self._jams = result.jams;
		self._albums = result.albums;
		self._about = result.about;
		callback(null, self);
	});
};

// Returns an array of song json objects, including the title
// and RG url.
Rapper.prototype.songs = function () {
	return this._songs;
};

// Returns an array of json song objects (top 5), including 
// the title and RG url.
Rapper.prototype.jams = function () {
	return this._jams;
};

Rapper.prototype.about = function () {
	if (this._about) {
		return this._about;
	}
	return 'Not Available';
};

Rapper.prototype.albums = function () {
	// console.log(this._albums)
	return this._albums;
};
/**
 * Searches the rapper's discography w/
 * the lev. distance algorithm.
 *
 * @param  {String or Array} songs/albums    
 * @param  {Function} callback 
 * @return {Song/Album or Array}            
 */
Rapper.prototype.search = function (items) {
	var fSongs = [];
	// If it's just one song, stuff it into an array anyway
	if (!Array.isArray(items)) {
		songs = [items];
	}

	_.each(this._songs, function(x){
		_.each(items, function(y){	
			y = y.toLowerCase().trim();
			xsong = x.song.toLowerCase();
			var normalized = x.split('(')[0].trim();
			var dist = lev(normalized,y);
			if(dist < 3){
				fSongs.push(x);
			}
		});
	});
	// Format for consumption
	return fSongs;

	//TODO: Add support for albums
};

Rapper.prototype.getSongs = function(songs){

}

Rapper.prototype.getAlbum = function(albums) {

}

var lev = function(s, t) {
    var d = []; //2d matrix

    // Step 1
    var n = s.length;
    var m = t.length;

    if (n == 0) return m;
    if (m == 0) return n;

    //Create an array of arrays in javascript (a descending loop is quicker)
    for (var i = n; i >= 0; i--) d[i] = [];

    // Step 2
    for (var i = n; i >= 0; i--) d[i][0] = i;
    for (var j = m; j >= 0; j--) d[0][j] = j;

    // Step 3
    for (var i = 1; i <= n; i++) {
        var s_i = s.charAt(i - 1);

        // Step 4
        for (var j = 1; j <= m; j++) {

            //Check the jagged ld total so far
            if (i == j && d[i][j] > 4) return n;

            var t_j = t.charAt(j - 1);
            var cost = (s_i == t_j) ? 0 : 1; // Step 5

            //Calculate the minimum
            var mi = d[i - 1][j] + 1;
            var b = d[i][j - 1] + 1;
            var c = d[i - 1][j - 1] + cost;

            if (b < mi) mi = b;
            if (c < mi) mi = c;

            d[i][j] = mi; // Step 6

            //Damerau transposition
            if (i > 1 && j > 1 && s_i == t.charAt(j - 2) && s.charAt(i - 2) == t_j) {
                d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + cost);
            }
        }
    }

    // Step 7
    return d[n][m];
}


module.exports = Rapper;