const ipcRenderer = require('electron').ipcRenderer;

const webview = document.getElementById("webview");

webview.addEventListener('load-commit', function () {
    webview.send('prepare-view');
    //webview.openDevTools();    
});

ipcRenderer.on('player:action', function (event, message) {
    webview.send('player:action', message);
});

ipcRenderer.on('player:notification', function (event, message) {
    webview.send('player:notification', message);
});

ipcRenderer.on('navigate-back', () => {
    if (webview.canGoBack()) {
        webview.goBack();
    }
});

ipcRenderer.on('navigate-forward', () => {
    if (webview.canGoForward()) {
        webview.goForward();
    }
});

// on quit : reload to save last state
ipcRenderer.on('player:quit', () => {
    webview.reload();
});

