// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

// IPC renderer so the theme menus (and others) can talk to this render window
const { ipcRenderer } = require('electron')
