const applescript = require('applescript');

const newSong = function () {
  console.log('newSong');
  // Get the name, artist, genre of current song
  getNowPlaying('Name');
  getNowPlaying('Artist');
  getNowPlaying('Genre');
};



function getNowPlaying(songAttribute) {
  let nowPlayingString = 'tell application "iTunes" to get ' + songAttribute + ' of current track';
  let nowPlayingElementId = 'nowPlaying' + songAttribute;
  applescript.execString(nowPlayingString, function(err, rtn) {
    if (err) {
    }
    if (rtn) {
        document.getElementById(nowPlayingElementId).innerHTML = (rtn) ;
    }
  });
}
