const applescript = require('applescript');
const ARTIST = 0;
const GENRE = 1;
const SONGX = 0;
const SONGY = 1;

const newSong = function () {
  getNowPlaying('Name');
  getNowPlaying('Artist');
  getNowPlaying('Genre');
  getNextTanda();
  getSongCount();
};

newSong();

// For grabbing the name, artist, genre of current song
function getNowPlaying(songAttribute) {
  let nowPlayingString = 'tell application "iTunes" to get ' + songAttribute + ' of current track';
  let nowPlayingElementId = 'nowPlaying' + songAttribute;
  applescript.execString(nowPlayingString, function(err, rtn) {
    if (err) {return}
    document.getElementById(nowPlayingElementId).innerHTML = rtn ;
  });
}

// External script: Get array with next-tanda artist and genre
function getNextTanda() {
  applescript.execFile("applescript/getNextTanda.applescript", function(err, rtn) {
    if (err) {return}
    if (rtn[ARTIST].length >0) {
      document.getElementById("nextTandaArtist").innerHTML = ("<strong>NEXT TANDA:</strong> " + rtn[ARTIST]);
    }
    else {
      document.getElementById("nextTandaArtist").innerHTML = rtn[ARTIST];
    }
    if (rtn[GENRE].length >0 && !rtn[GENRE].match("Last Tanda") )  {
      document.getElementById("nextTandaGenre").innerHTML = ("&nbsp;&nbsp;|&nbsp;&nbsp;" + rtn[GENRE]);
    }
    else {
      document.getElementById("nextTandaGenre").innerHTML = rtn[GENRE];
    }
  });
}

// External script: Get array with X of Y count of current tanda
function getSongCount() {
  applescript.execFile("applescript/getSongCount.applescript", function(err, rtn) {
    if (err) {return}
      document.getElementById("songX").innerHTML = rtn[SONGX];
      document.getElementById("songY").innerHTML = rtn[SONGY];
  });
}
