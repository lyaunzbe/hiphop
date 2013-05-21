var client = require('./client.js');

function Rapper (artist, callback) {
	this.name;
	this._about;
	this._jams = [];
	this._songs = [];
	this._albums = [];

	this.init(artist, function(err, rapper){
		if(err) callback(err);
		callback(null, rapper);
	})
}

// Initializes the Rapper object(s) by scraping the
// artist(s) page.
Rapper.prototype.init = function (artist, callback) {
	var that = this;
	client.getArtist(artist, function (err, result){
		if(err) callback(err);
		that.name = result.name;
		that._songs = result.songs;
		that._jams = result.jams
		that._albums = result.albums;
		that._about = result.about;
		callback(null, that);
	});
};

// Returns an array of song json objects, including the title
// and RG url.
Rapper.prototype.songs = function(){
	return this._songs;
}

// Returns an array of json song objects (top 5), including 
// the title and RG url.
Rapper.prototype.jams = function(){
	return this._jams;
}

Rapper.prototype.about = function(){
	if(this._about)
		return this._about;
	return 'Not Available'
}

Rapper.prototype.albums = function(){
	return this._albums;
}
/**
 * Returns the appropriate Song object(s)
 * 
 * @param  {String or Array} songs    
 * @param  {Function} callback 
 * @return {Song or Array}            
 */
Rapper.prototype.getSong = function(songs, callback){
	var fSongs = [];
	// If it's just one song, stuff it into an array anyway
	if(!Array.isArray(songs))
		songs = [songs];

	async.each(songs, function(song, callback){
		//Add each song to the array
		
	}, function(err){
		if(err) callback(err);

		if(fSongs.length == 1) callback(null, fSongs.pop());

		callback(null, fSongs);
	});
}

module.exports = Rapper;