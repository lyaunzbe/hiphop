var _          = require('lodash'),
	cheerio    = require('cheerio');

function escape(str) {
	return str.replace('\n', ' ').trim();
}

function Parser() {

}

Parser.prototype.artist = function (html, callback) {
	// Load html from request
	var $      = cheerio.load(html, {ignoreWhitespace : true}),
		_songs = [],
		songs  = [],
		artist = $('h1.artist', '#main'),
		_jams,
		jams   = [],
		albums = [],
		// Find about section, if one exists
		_about = $('.embedly').children().first(),
		about,
		name;
	// Does the rapper exist, or did RG return an artist 404?
	if (artist) {
		name = artist.text().trim();
	} else {
		callback('This rapper does not exist!');
	}

	// Extract the lists for popular songs and 'all songs'.
	// In the future, add pagination functionality
	// to really get all of the songs.
	$('.song_list').each(function () {
		var n = $(this).next()[0].name,
			p = $(this).prev()[0].name;
		if ((p && n) && (p === 'h3' && n === 'h3')) {
			_jams = $(this).find('a');
		} else {
			_songs.push($(this).find('a'));
		}
	});
	// Conver the jams list to song objects.
	$(_jams).each(function () {
		jams.push({
			href: $(this).attr('href'),
			song: $(this).find('span.title_with_artists').text().trim()

		});
	});
	// Conver the song lists to song objects.
	_.each(_songs, function (obj) {
		$(obj).each(function () {
			songs.push({
				href: $(this).attr('href'),
				song: $(this).find('span.title_with_artists').text().trim()
			});
		});
	});

	$('.album_list').find('a').each(function () {
		albums.push({
			href: $(this).attr('href'),
			song: $(this).text()
		});
	});

	if (_about) {
		about = {
			raw : escape($(_about).text()),
			html : $(_about).html()
		};
	} else {
		about = null;
	}

	callback(null, {
		name: name,
		jams: jams,
		songs: songs,
		albums: albums,
		about: about
	});
};

module.exports = new Parser();