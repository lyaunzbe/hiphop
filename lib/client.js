/** 
 * API client
 *
 * @package hiphop
 * @author Ben Lyaunzon
 */

var cork    = require('cork'),
    cheerio = require('cheerio'),
    parser  = require('./parser.js'),
    async   = require('async');

var baseURL = 'http://rapgenius.com';

function Client() {
    cork.register('rg', {
        base: baseURL,
        method: 'get',
        headers : {
            'Accept': '*/*, application/x-javascript, text/javascript, text/html, application/xml, text/xml'
        }
    });

}


Client.prototype.getArtist = function (artist, callback) {
    var self = this;

    cork.request('rg', {
        uri: '/artists/' + artist
    }, function (err, body) {
        if (err) {
            callback(err);
        }
        //load body
        var $     = cheerio.load(body, {ignoreWhitespace: true}),
            hrefs = [];
        $('.pagination').find('a')
            .filter(function () {
                return !($(this).hasClass('next_page'));
            })
            .each(function () {
                hrefs.push($(this).attr('href'));
            });

        async.each(hrefs,
            function (href, callback) {
                self.songsPaginate(href, function (err, html) {
                    if (err) {
                        callback(err);
                    }
                    body = body.concat(html);
                    callback(null);
                });
            },
            function (err) {
                if (err) {
                    callback(err);
                }
                parser.artist(body, function (err, rapper) {
                    if (err) {
                        callback(err);
                    }
                    callback(null, rapper);
                });
            });
    });
};

Client.prototype.getSong = function(song, callback){
    var self = this;

    // cork.request('rg', {
    //     uri: 
    // }, function (err, body) {

    // }
}

Client.prototype.songsPaginate = function (href, callback) {
    cork.request('rg', {
        uri: href
    }, function (err, body) {
        if (err) {
            callback(err);
        }
        callback(null, body);
    });

};

module.exports = new Client();