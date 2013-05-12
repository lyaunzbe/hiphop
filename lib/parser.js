var htmlparser = require('htmlparser2'),
	_		   = require('lodash'),
	cheerio    = require('cheerio');

function Parser (argument) {
	
}

Parser.prototype.artist = function (html, callback){
	$ = cheerio.load(html, {
		ignoreWhitespace: true
	});

	var _jams, _songs, artist = $('h1.artist', '#main');

	var jams   = [],
		songs  = [],
		albums = [],
		name;
	
	
	if(artist)
		name = artist.text().trim();
	else
		callback('This rapper does not exist!');

	$('.song_list', '#main').each(function(i){
		var n = $(this).next()[0].name,
			p = $(this).prev()[0].name;
		if((p && n) && (p === 'h3' && n == 'h3'))
			_jams = $(this).find('a');
		else
			_songs = $(this).find('a');
	});
	
	$(_jams).each(function(i){
		jams.push({
			href: $(this).attr('href'),
			song: $(this).find('span').text().trim()

		});
	});
	
	$(_songs).each(function(i){
		songs.push({
			href: $(this).attr('href'),
			song: $(this).find('span').text().trim()

		});
	});


	callback(null, {
		name: name,
		jams: jams,
		songs: songs,
		albums: albums
	});
}

module.exports = new Parser();