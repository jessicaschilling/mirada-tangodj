const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
// IPC listener for menu items
const {ipcMain} = require('electron')
// For the About dialog box
const dialog = require('electron').dialog
const path = require('path')
const url = require('url')
// For reworking menus that differ from standard
const Menu = electron.Menu
//For listening for track changes
const {systemPreferences} = require('electron');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600})

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));


  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// Custom menus
app.on('ready', function () {

  const menuTemplate = [
    {
      label: 'Mirada',
      submenu: [
        {
          label: 'About Mirada',
          click: () => {
            dialog.showMessageBox({ message: "Mirada v. 3.0\n\nA now-playing and next-tanda visualizer for tango DJs, made with love by Jessica 'La Vitrolera' Schilling",buttons: ["OK"] });
          }
        }, {
          type: 'separator'
        },{
          label: 'Player Source',
              submenu: [
                {
                  label: 'Embrace',
                  type: 'radio',
                  checked: (store.get('player') == "applescript/Embrace/"),
                  click: () => {
                    store.set('player', 'applescript/Embrace/');
                    mainWindow.loadURL(url.format({
                      pathname: path.join(__dirname, 'index.html'),
                      protocol: 'file:',
                      slashes: true
                    }));
                  }
                },
                {
                  label: 'iTunes',
                  type: 'radio',
                  checked: (store.get('player') == "applescript/iTunes/"),
                  click: () => {
                    store.set('player', 'applescript/iTunes/');
                    mainWindow.loadURL(url.format({
                      pathname: path.join(__dirname, 'index.html'),
                      protocol: 'file:',
                      slashes: true
                    }));
                  }
                }
              ]
          }, {
            type: 'separator'
          },{
          label: 'Theme',
          submenu: [
            {
              label: 'Dark',
              type: 'radio',
              checked: (store.get('selectedTheme') == "themeDark"),
              click: () => {
                store.set('selectedTheme', 'themeDark');
                mainWindow.webContents.executeJavaScript('switchTheme("' + (store.get('selectedTheme')) + '");');
              }
            },
            {
              label: 'Light',
              type: 'radio',
              checked: (store.get('selectedTheme') == "themeLight"),
              click: () => {
                store.set('selectedTheme', 'themeLight');
                mainWindow.webContents.executeJavaScript('switchTheme("' + (store.get('selectedTheme')) + '");');
              }
            },
            {
              label: 'Valentine',
              type: 'radio',
              checked: (store.get('selectedTheme') == "themeValentine"),
              click: () => {
                store.set('selectedTheme', 'themeValentine');
                mainWindow.webContents.executeJavaScript('switchTheme("' + (store.get('selectedTheme')) + '");');
              }
            },
            {
              label: 'Halloween',
              type: 'radio',
              checked: (store.get('selectedTheme') == "themeHalloween"),
              click: () => {
                store.set('selectedTheme', 'themeHalloween');
                mainWindow.webContents.executeJavaScript('switchTheme("' + (store.get('selectedTheme')) + '");');
              }
            },
            {
              label: 'Christmas',
              type: 'radio',
              checked: (store.get('selectedTheme') == "themeXmas"),
              click: () => {
                store.set('selectedTheme', 'themeXmas');
                mainWindow.webContents.executeJavaScript('switchTheme("' + (store.get('selectedTheme')) + '");');
              }
            }
          ]
          },{
            label: 'Paused/Stopped Image',
            submenu: [
              {
                label: 'Bandone\xF3n',
                type: 'radio',
                checked: (store.get('imageType') == "default"),
                click: () => {
                  mainWindow.webContents.executeJavaScript('changeImage("img/bandoneon.jpg");');
                  store.set('imageType', 'default');
                }
              },
              {
                label: 'Custom',
                type: 'radio',
                checked: (store.get('imageType') == "custom"),
                click: () => {
                  mainWindow.webContents.executeJavaScript('changeImage("' + (store.get('customImage')) + '");');
                  store.set('imageType', 'custom');
                }
              },
              {
                type: 'separator'
              },
              {
                label: 'Change Custom Image...',
                click: () => {
                  dialog.showOpenDialog({ filters: [
                    { name: 'Images', extensions: ['jpg', 'png', 'gif', 'svg'] }
                  ]},
                  function (selectedFile) {
                    if (selectedFile === undefined) return;
                    else store.set('customImage', selectedFile);
                    mainWindow.webContents.executeJavaScript('changeImage("' + (store.get('customImage')) + '");');
                    store.set('imageType', 'custom');
                    // Rebuild all the menus, this might be the wrong way to do this
                    const menu = Menu.buildFromTemplate(menuTemplate);
                    Menu.setApplicationMenu(menu);
                 });
                }
              }
            ]
        },
        {
          type: 'separator'
        },
        {
          label: 'Anonymize Alt Tandas in Preview',
          type: 'checkbox',
          checked: (store.get('anonymizeAlt') == "true"),
          click: () => {
            if (store.get('anonymizeAlt') == "true") {
              store.set('anonymizeAlt', 'false');
            }
            else {
              store.set('anonymizeAlt', 'true');
            }
            mainWindow.loadURL(url.format({
              pathname: path.join(__dirname, 'index.html'),
              protocol: 'file:',
              slashes: true
            }));
          }
      }, {
          type: 'separator'
        }, {
          role: 'quit'
        }
      ]
    },
    {
      label: 'View',
      submenu: [
        {role: 'reload'},
        {role: 'toggledevtools'},
        {type: 'separator'},
        {role: 'resetzoom'},
        {role: 'zoomin'},
        {role: 'zoomout'},
        {type: 'separator'},
        {role: 'togglefullscreen'}
      ]
    },
    {
      role: 'window',
      submenu: [
        {role: 'minimize'},
        {role: 'zoom'},
      ]
    },
  ];
  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
});

//Listen for track changes
// if (store.get('player') == "applescript/Embrace/") {
//   systemPreferences.subscribeNotification('com.iccir.Embrace.playerUpdate', () => {
//     // systemPreferences.subscribeNotification('com.apple.iTunes.playerInfo', () => {
//     mainWindow.webContents.executeJavaScript('trackChange()');
//   })
// }
systemPreferences.subscribeNotification('com.iccir.Embrace.playerUpdate', () => {
  // systemPreferences.subscribeNotification('com.apple.iTunes.playerInfo', () => {
  mainWindow.webContents.executeJavaScript('trackChange()');
})

//Preferences storage and recall
const Store = require('electron-store');
const store = new Store();
