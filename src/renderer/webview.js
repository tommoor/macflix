'use strict';
const $ = require('jquery');
const BrowserWindow = require('electron').remote.BrowserWindow;
const ipcWebview = require('electron').ipcRenderer;

window.chrome = {}

ipcWebview.on('playOrPause', function(event, arg) {
  $('.player-control-button.player-play-pause').click();
});
