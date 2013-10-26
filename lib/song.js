var client = require('./client.js');

function Song (opts) {
	this.title = opts.song;
  this.url = opts.href;
  this.lyrics = [];
};

Song.prototype.init = function (callback) {
	var self = this;

	client.getSong({ title: self.title, url: self.url }, 
    function (err, result){
      if(err){
        callback(err);
      }
      self.lyrics = result.lyrics;
      callback(null, self);
	});
};

Song.prototype.lyrics = function(){
  return this.lyrics;
};

module.exports = Song;