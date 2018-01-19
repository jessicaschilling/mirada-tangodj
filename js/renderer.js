// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

// IPC renderer so the theme menus (and others) can talk to this render window
const { ipcRenderer } = require('electron');

// For AppleScript
const applescript = require('applescript');

// jQuery for fade transitions
const $ = require('jQuery');

// Preferences storage and recall
const Store = require('electron-store');
const store = new Store();

//Switch themes by renaming classes in the DOM
function switchTheme(themeName) {
  ['background', 'nowPlaying', 'nextTanda', 'ribbon', 'interstitial', "afterCumparsita", "playerStoppedPaused"].forEach(function( id ) {document.getElementById( id ).className = (themeName);});
   };

// Switch out stopped/paused image
function changeImage(imageFilePath) {
  document.getElementById("playerStoppedPaused").innerHTML = ("<img src=\"" + imageFilePath + "\">");
};
