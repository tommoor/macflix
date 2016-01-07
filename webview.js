var $ = require('jquery');
var BrowserWindow = require('electron').remote.BrowserWindow;
console.log(BrowserWindow);

$(function(){
  $(document).on('click', 'a.playLink', function(ev){
    ev.preventDefault();
    ev.stopPropagation();
    var href = $(this).attr('href');
    
    if (href && href.match(/\/watch\//i)) {

      var playWindow = new BrowserWindow({
        width: 600,
        height: 400,
        alwaysOnTop: true,
        titleBarStyle: 'hidden-inset',
        nodeIntegration: false,
        acceptFirstMouse: true
      });

      playWindow.loadURL('https://www.netflix.com' + href);
    }

    return false;
  });
});