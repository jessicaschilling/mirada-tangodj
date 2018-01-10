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
  isPlayerStoppedPaused();
  isCortina();
};

// Do all the things at once
newSong();

// Get the name, artist, genre of current song
function getNowPlaying(songAttribute) {
  let nowPlayingString = 'tell application "iTunes" to get ' + songAttribute + ' of current track';
  let nowPlayingElementId = 'nowPlaying' + songAttribute;
  applescript.execString(nowPlayingString, function(err, rtn) {
    if (err) {return}
    document.getElementById(nowPlayingElementId).innerHTML = rtn ;
  });
}

// External script: Get array with next-tanda artist and genre and write to both cortina and nextTanda divs
function getNextTanda() {
  applescript.execFile("applescript/getNextTanda.applescript", function(err, rtn) {
    if (err) {return}
    if (rtn) {
      // Write to the cortina div
      document.getElementById("cortinaNextTandaArtist").innerHTML = rtn[ARTIST];
      document.getElementById("cortinaNextTandaGenre").innerHTML = rtn[GENRE];

      // Write to the nextTanda div, with text appends as needed
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

      // // If a cortina, show cortina div and hide nowNext div
      // if (rtn[GENRE] == "Cortina" )  {
      //   document.getElementById("interstitial").style.display = "flex";
      //   document.getElementById("nowNext").style.display = "none";
      // }
      // else {
      //   document.getElementById("interstitial").style.display = "none";
      //   document.getElementById("nowNext").style.display = "block";
      // }

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

// Display image in overlay if player state is stopped or paused
function isPlayerStoppedPaused() {
  applescript.execString('tell application "iTunes" to get player state', function(err, rtn) {
    if (err) {return}
    if (rtn !== "playing")  {
      document.getElementById("overlay").classList.add("playerStoppedPaused")
    }
    else {
      document.getElementById("overlay").classList.remove("playerStoppedPaused")
    }
  });
}

// Display full-screen next-tanda info in overlay if current song is a cortina
function isCortina() {
  applescript.execString('tell application "iTunes" to get genre of current track', function(err, rtn) {
    if (err) {return}
    if (rtn == "Cortina")  {
      document.getElementById("interstitial").style.display = "flex";
      document.getElementById("nowNext").style.display = "none";
    }
    else {
      document.getElementById("interstitial").style.display = "none";
      document.getElementById("nowNext").style.display = "block";
    }
  });
}
