//Switch themes by renaming classes in the DOM
function switchTheme(themeName) {
  ['background', 'nowPlaying', 'nextTanda', 'ribbon', 'interstitial', "afterCumparsita"].forEach(function( id ) {document.getElementById( id ).className = (themeName);});
};
