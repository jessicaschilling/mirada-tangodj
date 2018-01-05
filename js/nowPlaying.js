var applescript = require('applescript');

// Get the name
getNowPlaying('Name');

// Get the artist
getNowPlaying('Artist');

// Get the genre
getNowPlaying('Genre');

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
//Listen for track changes
const {systemPreferences} = require('electron');

systemPreferences.subscribeNotification('com.apple.iTunes.playerInfo', () => {
  console.log('song changed')
})
