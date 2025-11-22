/** @format */

const { contextBridge, ipcRenderer } = require('electron')

// 안전한 API 노출
contextBridge.exposeInMainWorld('electronAPI', {
  platform: process.platform,
  versions: {
    node: process.versions.node,
    chrome: process.versions.chrome,
    electron: process.versions.electron,
  },
  // 필요시 추가 API
})

