'use strict';
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const AppMenu = require('./menu');
const globalShortcut = electron.globalShortcut;
const path = require('path');
const shell = require('electron').shell;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let applicationMenu;

var plugin = path.join(__dirname, '..', '..', 'WidevineCDM', 'widevinecdmadapter.plugin');
electron.app.commandLine.appendSwitch('widevine-cdm-path', plugin);
electron.app.commandLine.appendSwitch('widevine-cdm-version', '1.4.8.866');

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
  applicationMenu = new AppMenu();
  
  applicationMenu.on('action', function(event, param) {
    switch(event) {
      case 'app.quit':
        return app.quit();
      case 'app.toggle_floating':
        return mainWindow.setAlwaysOnTop(!mainWindow.isAlwaysOnTop());
      case 'app.open_url':
        return shell.openExternal(param);
    }
  });
  
  mainWindow = new BrowserWindow({
    width: 800,
    height: 470,
    acceptFirstMouse: true,
    titleBarStyle: 'hidden-inset'
  });

  mainWindow.loadURL('file://' + __dirname + '/../index.html');
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
  //mainWindow.openDevTools();
  
  globalShortcut.register('MediaPlayPause', function() {
    mainWindow.webContents.send('keypress', 'MediaPlayPause');
  });
  globalShortcut.register('MediaNextTrack', function() {
    mainWindow.webContents.send('keypress', 'MediaNextTrack');
  });
});

app.on('will-quit', function() {
  globalShortcut.unregisterAll();
});