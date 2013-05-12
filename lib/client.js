/** 
 * API client
 *
 * @package hiphop
 * @author Ben Lyaunzon
 */

var cork = require('cork'),
	parser = require('./parser.js');
	
var baseURL = 'http://rapgenius.com'

function Client () {
	var self = this;

	cork.register('rg', {
		base: baseURL,
		method: 'get',
		headers : {
			'Accept': '*/*, application/x-javascript, text/javascript, text/html, application/xml, text/xml'
		}
	});

}


Client.prototype.getArtist = function(artist, callback){
	cork.request('rg', {
		uri: '/artists/'+ artist
	}, function (err, body) {
		if(err) callback(err);
		
		parser.artist(body, function(err, dom){
			if(err) callback(err);
			callback(null, dom);
		})
	});
}

module.exports = new Client();