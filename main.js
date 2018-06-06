console.log('main process working');

//handle setupevents as quickly as possible
 const setupEvents = require('./installers/windows/setupEvents')
 if (setupEvents.handleSquirrelEvent()) {
    // squirrel event handled and app will exit in 1000ms, so don't do anything else
    return;
 }

// Module to control application life.
const electron = require("electron")    
const {ipcMain} = require('electron')
const path = require("path");
const url = require("url");

const app = electron.app; 
const Menu = electron.Menu;
const BrowserWindow = electron.BrowserWindow;

let win;

function createWindow(){
    win = new BrowserWindow({
        width: 1366,
        height: 700,
        show: false,
        icon: path.join(__dirname, 'assets/icons/png/64x64.png')
    }); 
    
    win.loadURL('http://167.99.67.186:3010/signin');

    const template = [ {role:'exit'}];

    //const menu = Menu.buildFromTemplate(template);
    //Menu.setApplicationMenu(menu);

    // win.loadURL(url.format({
    //     pathname: path.join(__dirname, 'index.html'),
    //     protocol: 'file',
    //     slashes: true
    // }));

    //win.webContents.openDevTools();
    win.once('ready-to-show', () => {
        win.show();
    });

    win.on('closed', () => {
        win = null
    });
    
}

app.on('ready', createWindow);

app.on('window-all-close', () => {
    if(process.platform !== 'darwin'){
        app.quit();
    }
});

app.on('activate', () => {
    if(win === null){
        createWindow();
    }
});