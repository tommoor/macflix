'use strict';
const $ = require('jquery');
const BrowserWindow = require('electron').remote.BrowserWindow;
const ipcWebview = require('electron').ipcRenderer;

window.chrome = {}

ipcWebview.on('playOrPause', function(event, arg) {
  $('.player-control-button.player-play-pause').click();
});

ipcWebview.on('nextVideo', function() {
  $('.player-control-button.player-next-episode').click();
});

$(document).keyup(function(event) {
  switch(event.which) {
    case 27:
      $('.player-back-to-browsing').click();
      return;
  }
});