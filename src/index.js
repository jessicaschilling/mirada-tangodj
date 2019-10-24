import { app, BrowserWindow, Menu } from 'electron';
import { addBypassChecker } from 'electron-compile';

// Allow display of local images
addBypassChecker((filePath) => {
  return filePath.indexOf(app.getAppPath()) === -1 && (/.jpg/.test(filePath) || /.png/.test(filePath) || /.gif/.test(filePath) || /.svg/.test(filePath));
});

// IPC listener for menu items
const { ipcMain } = require('electron');
// For the About dialog box
const dialog = require('electron').dialog;
const path = require('path');
const url = require('url');

// For listening for track changes
const { systemPreferences } = require('electron');

// Preferences storage and recall, plus write defaults if blank (aka first run)
const Store = require('electron-store');

const store = new Store();
if (store.has('player') === false) {
  store.set('player', 'Embrace');
}
if (store.has('selectedTheme') === false) {
  store.set('selectedTheme', 'themeDark');
}
if (store.has('imageType') === false) {
  store.set('imageType', 'default');
}
if (store.has('anonymizeAlt') === false) {
  store.set('anonymizeAlt', 'false');
}

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
  });

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
// Custom menus
app.on('ready', function () {
  const menuTemplate = [
    {
      label: 'Mirada',
      submenu: [
        {
          label: 'About Mirada',
          click: () => {
            dialog.showMessageBox({ message: "Mirada v. 4.0\n\nA now-playing and next-tanda visualizer for tango DJs, made with love by Jessica 'La Vitrolera' Schilling", buttons: ["OK"] });
          }
        }, {
          type: 'separator'
        },{
          label: 'Player Source',
              submenu: [
                {
                  label: 'Embrace',
                  type: 'radio',
                  checked: (store.get('player') == "Embrace"),
                  click: () => {
                    store.set('player', 'Embrace');
                    systemPreferences.subscribeNotification('com.iccir.Embrace.playerUpdate', () => {
                      mainWindow.webContents.executeJavaScript('getTrackInfo()');
                    })
                    mainWindow.loadURL(`file://${__dirname}/index.html`);
                  }
                },
                {
                  label: 'Music',
                  type: 'radio',
                  checked: (store.get('player') == "Music"),
                  click: () => {
                    store.set('player', 'Music');
                    systemPreferences.subscribeNotification('com.apple.Music.playerInfo', () => {
                      mainWindow.webContents.executeJavaScript('getTrackInfo()');
                    })
                    mainWindow.loadURL(`file://${__dirname}/index.html`);
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
            mainWindow.loadURL(`file://${__dirname}/index.html`);
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
        { role: 'reload' },
        { role: 'toggledevtools' },
        { type: 'separator' },
        { role: 'resetzoom' },
        { role: 'zoomin' },
        { role: 'zoomout' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    {
      role: 'window',
      submenu: [
        { role: 'minimize' },
        { role: 'zoom' },
      ]
    },
  ];
  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
});

// Listen for track changes
if (store.get('player') == "Embrace") {
  systemPreferences.subscribeNotification('com.iccir.Embrace.playerUpdate', () => {
    mainWindow.webContents.executeJavaScript('getTrackInfo()');
  })
}
else
  systemPreferences.subscribeNotification('com.apple.Music.playerInfo', () => {
    mainWindow.webContents.executeJavaScript('getTrackInfo()');
  })
