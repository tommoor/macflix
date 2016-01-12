'use strict';
const ipcRenderer = require('electron').ipcRenderer;

var webview = document.getElementById('netflix');
webview.addEventListener('console-message', function(e) {
  console.log('Webview', e.message);
});

webview.addEventListener("dom-ready", function() {
  // TODO: Yes, this is messy - just playing with what styling is needed
  //webview.openDevTools();
  webview.insertCSS("#netflix-player .player-back-to-browsing { top: 35px; } #hdPinTarget { padding-left: 60px; } .akira-header>.logo{left: 50%;position: absolute; margin-left: -58px; top: 8px;");
});

ipcRenderer.on('keypress', function(event, arg) {
  switch(arg) {
    case 'MediaNextTrack':
      return webview.send('nextVideo');
    case 'MediaPlayPause':
      return webview.send('playOrPause');
  }
});