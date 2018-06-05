console.log('main process working');

const electron = require("electron");

const app = electron.app; 
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const url = require("url");
const Menu = electron.Menu;

let win;

function createWindow(){
    win = new BrowserWindow({
        width:800,
        height: 600
    });
    win.loadURL('http://167.99.67.186:3010/');

    const template = [ {role:'exit'}];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    // win.loadURL(url.format({
    //     pathname: path.join(__dirname, 'index.html'),
    //     protocol: 'file',
    //     slashes: true
    // }));

    //win.webContents.openDevTools();

 

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