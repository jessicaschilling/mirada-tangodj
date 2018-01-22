// Turn the external AppleScript files into enormous strings
const nowPlayingInfoITunes = require('./applescript/iTunes/nowPlayingInfo');
store.set('nowPlayingInfoITunes', nowPlayingInfoITunes);
const nowPlayingInfoEmbrace = require('./applescript/embrace/nowPlayingInfo');
store.set('nowPlayingInfoEmbrace', nowPlayingInfoEmbrace);

// Run the external AppleScript and write its array results to the store
function getTrackInfo() {

  // See which player is the active one
  if (store.get('player') == "iTunes") {
    store.set('nowPlayingInfo', nowPlayingInfoITunes);
  }
  else {
    store.set('nowPlayingInfo', nowPlayingInfoEmbrace);
  }

  (async () => {
    const result = await runApplescript(store.get('nowPlayingInfo'));
    const rtn = result.split(", @@,")
    console.log(rtn);

    store.set('playerStoppedPaused', rtn[0]);
    store.set('nowPlayingName', rtn[1]);
    store.set('nowPlayingArtist', rtn[2]);
    store.set('nowPlayingGenre', rtn[3]);
    store.set('nowPlayingGrouping', rtn[4]);
    store.set('afterCumparsita', rtn[5]);
    store.set('songX', rtn[6]);
    store.set('songY', rtn[7]);

    // Clear next-tanda details if its first-song grouping contains "nnounc"
    if (rtn[10].match("nnounc")) {
      store.set('nextTandaArtist', "Announcements");
      store.set('nextTandaGenre', "");
    }
    else {
      store.set('nextTandaArtist', rtn[8]);
      store.set('nextTandaGenre', rtn[9]);
    }

    store.set('nextTandaGrouping', rtn[10]);
    console.log('1/5 NOW... ' + (store.get('nowPlayingName'))+ (store.get('nowPlayingArtist')) + (store.get('nowPlayingGenre'))+ (store.get('nowPlayingGrouping')));
    console.log('2/5 STATUS: ' + (store.get('playerStoppedPaused')));
    console.log('3/5 AFTER?: ' + (store.get('afterCumparsita')));
    console.log('4/5 SONG ' + (store.get('songX'))+ " of " + (store.get('songY')) );
    console.log('5/5 NEXT...'  + (store.get('nextTandaArtist'))+ (store.get('nextTandaGenre')) + (store.get('nextTandaGrouping')));
    changeDisplay();
    })();
}

// Write song counts to ribbon
function writeToRibbon() {
  document.getElementById("songX").innerHTML = store.get('songX');
  document.getElementById("songY").innerHTML = store.get('songY');
}

// Write now-playing info to now area
function writeToNow() {
  document.getElementById("nowPlayingArtist").innerHTML = store.get('nowPlayingArtist');
  document.getElementById("nowPlayingGenre").innerHTML = store.get('nowPlayingGenre');

  // Look backwards through rtn and add a <br> before the final ( if there is one
  let finalOpenParenPosition = store.get('nowPlayingName').lastIndexOf('(');
  if (finalOpenParenPosition > -1) {
          let modifiedForParen = store.get('nowPlayingName').substring(0, finalOpenParenPosition) + '<br/> (' + store.get('nowPlayingName').substring(finalOpenParenPosition + 1);
          document.getElementById("nowPlayingName").innerHTML = modifiedForParen ;
  }
  else {
    document.getElementById("nowPlayingName").innerHTML = store.get('nowPlayingName');
  }
}

// Write next-tanda info to next area
function writeToNext() {
  if (!store.get('nextTandaGenre').match("Last Tanda")) {
    if (store.get('anonymizeAlt') == "true" && store.get('nextTandaGrouping').match("#nu") )  {
      document.getElementById("nextTandaArtist").innerHTML = ("<strong>NEXT TANDA:&nbsp;&nbsp;</strong>Alternative&nbsp;&nbsp;");
    }
    else {
      document.getElementById("nextTandaArtist").innerHTML = ("<strong>NEXT TANDA:&nbsp;&nbsp;</strong>" + store.get('nextTandaArtist') + "&nbsp;&nbsp;");
    }
  }
    else {
      document.getElementById("nextTandaArtist").innerHTML = (store.get('nextTandaArtist') + "&nbsp;");
    }
    document.getElementById("nextTandaGenre").innerHTML = store.get('nextTandaGenre');
}

// Write title to announcement overlay
function writeToAnnouncement() {
  document.getElementById("announcementText").innerHTML = store.get('nowPlayingName') ;
}

// Write next-tanda info to cortina overlay
function writeToCortina() {
  if (store.get('anonymizeAlt') == "true" && store.get('nextTandaGrouping').match("#nu") ) {
    if (!store.get('nextTandaArtist').match("Last Tanda") && !store.get('nextTandaArtist').match("Announcements")) {
      document.getElementById("cortinaNextTandaArtist").innerHTML = "Alternative";
    }
    else {
      document.getElementById("cortinaNextTandaArtist").innerHTML = store.get('nextTandaArtist');
    }
  }
  else {
    document.getElementById("cortinaNextTandaArtist").innerHTML = store.get('nextTandaArtist');
  }
  document.getElementById("cortinaNextTandaGenre").innerHTML = store.get('nextTandaGenre');
}

// Change the display itself
function changeDisplay() {
  // If the player state is not playing
  if (store.get('playerStoppedPaused') !== "playing") {
    $( "#playerStoppedPaused" ).fadeIn( 300 );
    $( "#afterCumparsita" ).hide();
    $( "#nowNext" ).hide();
    $( "#cortina" ).hide();
    $( "#announcement" ).hide();
  }
  else {

    // If (player state is playing and) it is after Cumparsita
    if (store.get('afterCumparsita').match("yes") ) {
      $( "#playerStoppedPaused" ).hide();
      $( "#afterCumparsita" ).fadeIn( 300 );
      $( "#nowNext" ).hide();
      $( "#cortina" ).hide();
      $( "#announcement" ).hide();
    }
    else {

      // If (player state is playing and it is not after Cumparsita and) the current track is a regular song
      if (!store.get('nowPlayingGenre').match("ortina") ) {
        writeToNow();
        writeToRibbon();
        writeToNext();
        $( "#playerStoppedPaused" ).hide();
        $( "#afterCumparsita" ).hide();
        $( "#nowNext" ).fadeIn( 300 );
        $( "#cortina" ).hide();
        $( "#announcement" ).hide();
      }

      // If (player state is playing and it is not after Cumparsita and) the current track is a cortina
      if (store.get('nowPlayingGenre').match("ortina") ) {
        writeToCortina();
        $( "#playerStoppedPaused" ).hide();
        $( "#afterCumparsita" ).hide();
        $( "#nowNext" ).hide();
        $( "#cortina" ).fadeIn( 300 );
        $( "#announcement" ).hide();
      }

      // If (player state is playing and it is not after Cumparsita and) the current track is an announcement
      if (store.get('nowPlayingGrouping').match("nnounc") ) {
        writeToAnnouncement();
        $( "#playerStoppedPaused" ).hide();
        $( "#afterCumparsita" ).hide();
        $( "#nowNext" ).hide();
        $( "#cortina" ).hide();
        $( "#announcement" ).fadeIn( 300 );
      }
    }
  }
}
