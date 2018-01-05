var applescript = require('applescript');

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

// Get the name
getNowPlaying('Name');

// Get the artist
getNowPlaying('Artist');

// Get the genre
getNowPlaying('Genre');
