const applescript = require('applescript');

const newSong = function () {
  getNowPlaying('Name');
  getNowPlaying('Artist');
  getNowPlaying('Genre');
  getNextTanda();
};


// For grabbing the name, artist, genre of current song
function getNowPlaying(songAttribute) {
  let nowPlayingString = 'tell application "iTunes" to get ' + songAttribute + ' of current track';
  let nowPlayingElementId = 'nowPlaying' + songAttribute;
  applescript.execString(nowPlayingString, function(err, rtn) {
    if (err) {return}
    document.getElementById(nowPlayingElementId).innerHTML = (rtn) ;
  });
}



// External script: Get array with next-tanda artist and genre
function getNextTanda() {
applescript.execFile("applescript/getNextTanda.applescript", function(err, rtn) {
  if (err) {return}
  rtn.forEach(function(songName) {
    console.log(songName);
  });
});
}
