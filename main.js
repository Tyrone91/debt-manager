const {app, BrowserWindow} = require('electron');

app.on("ready", () => {
    const window = new BrowserWindow({width: 600, height: 600});
    window.loadFile("index.html");
    console.log("hello?");
});

app.on("window-all-closed", () => {
    app.quit();
})
