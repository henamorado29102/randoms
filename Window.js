'use strict'

const { BrowserWindow } = require('electron')
const path = require('path')

// default window settings
const defaultProps = {
  width: 700,
  height: 660,
  show: false,

  // update for electron V5+
  webPreferences: {
    nodeIntegration: true,
    preload: path.join(__dirname, 'preload.js')
  }
}

class Window extends BrowserWindow {
  constructor ({ file, ...windowSettings }) {
    // calls new BrowserWindow with these props
    super({ ...defaultProps, ...windowSettings })

    this.webContents.openDevTools()

    // load the html and open devtools
    this.loadFile(file)
    // this.webContents.openDevTools()

    // gracefully show when ready to prevent flickering
    this.once('ready-to-show', () => {
      this.show()
    })


  }
}

module.exports = Window