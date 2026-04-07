# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 01-startup.spec.ts >> App Start >> Kein JavaScript-Crash im Renderer
- Location: tests/e2e/01-startup.spec.ts:45:7

# Error details

```
TimeoutError: electron.launch: Timeout 45000ms exceeded.
Call log:
  - <launching> /home/user/Gerki-App/node_modules/electron/dist/electron --inspect=0 --remote-debugging-port=0 /home/user/Gerki-App/out/main/index.js --no-sandbox --disable-gpu --disable-dev-shm-usage --disable-software-rasterizer --disable-gpu-compositing --disable-gpu-rasterization --in-process-gpu
  - <launched> pid=13256
  - [pid=13256][err] [13256:0407/043558.249891:ERROR:bus.cc(407)] Failed to connect to the bus: Failed to connect to socket /run/dbus/system_bus_socket: No such file or directory
  - [pid=13256][err] Debugger listening on ws://127.0.0.1:35365/00f126d2-5680-4862-83ca-37ed9b129146
  - [pid=13256][err] For help, see: https://nodejs.org/en/docs/inspector
  - <ws connecting> ws://127.0.0.1:35365/00f126d2-5680-4862-83ca-37ed9b129146
  - <ws connected> ws://127.0.0.1:35365/00f126d2-5680-4862-83ca-37ed9b129146
  - [pid=13256][err] Debugger attached.
  - [pid=13256][err] LaunchProcess: failed to execvp:
  - [pid=13256][err] xdg-settings
  - [pid=13256][err] [13256:0407/043558.863556:ERROR:bus.cc(407)] Failed to connect to the bus: Failed to connect to socket /run/dbus/system_bus_socket: No such file or directory
  - [pid=13256][err] [13256:0407/043558.876677:ERROR:bus.cc(407)] Failed to connect to the bus: Failed to connect to socket /run/dbus/system_bus_socket: No such file or directory
  - [pid=13256][err] [13256:0407/043558.877663:ERROR:bus.cc(407)] Failed to connect to the bus: Could not parse server address: Unknown address type (examples of valid types are "tcp" and on UNIX "unix")
  - [pid=13256][err] [13256:0407/043558.877684:ERROR:bus.cc(407)] Failed to connect to the bus: Could not parse server address: Unknown address type (examples of valid types are "tcp" and on UNIX "unix")
  - [pid=13256][err] [13256:0407/043558.877731:ERROR:bus.cc(407)] Failed to connect to the bus: Could not parse server address: Unknown address type (examples of valid types are "tcp" and on UNIX "unix")
  - [pid=13256][err] [13256:0407/043558.877749:ERROR:bus.cc(407)] Failed to connect to the bus: Could not parse server address: Unknown address type (examples of valid types are "tcp" and on UNIX "unix")
  - [pid=13256][err]
  - [pid=13256][err] DevTools listening on ws://127.0.0.1:44529/devtools/browser/465133ad-472c-4a4f-9720-4640676ed9f2
  - <ws connecting> ws://127.0.0.1:44529/devtools/browser/465133ad-472c-4a4f-9720-4640676ed9f2

```

# Test source

```ts
  1  | /**
  2  |  * Electron Test Helper
  3  |  * Startet die Gerki App für E2E Tests
  4  |  */
  5  | import { _electron as electron, ElectronApplication, Page } from '@playwright/test'
  6  | import path from 'path'
  7  | import fs from 'fs'
  8  | 
  9  | export interface GerkiApp {
  10 |   app: ElectronApplication
  11 |   page: Page
  12 | }
  13 | 
  14 | export async function launchGerki(): Promise<GerkiApp> {
  15 |   const mainPath = path.join(__dirname, '../../out/main/index.js')
  16 |   if (!fs.existsSync(mainPath)) {
  17 |     throw new Error(`Build fehlt: ${mainPath} — bitte "npm run build" ausführen`)
  18 |   }
  19 | 
  20 |   const electronPath = require('electron') as unknown as string
  21 | 
> 22 |   const app = await electron.launch({
     |               ^ TimeoutError: electron.launch: Timeout 45000ms exceeded.
  23 |     executablePath: electronPath,
  24 |     args: [
  25 |       mainPath,
  26 |       '--no-sandbox',
  27 |       '--disable-gpu',
  28 |       '--disable-dev-shm-usage',
  29 |       '--disable-software-rasterizer',
  30 |       '--disable-gpu-compositing',
  31 |       '--disable-gpu-rasterization',
  32 |       '--in-process-gpu',
  33 |     ],
  34 |     env: {
  35 |       ...process.env,
  36 |       NODE_ENV: 'production',
  37 |       ELECTRON_IS_DEV: '0',
  38 |     },
  39 |     timeout: 45000,
  40 |   })
  41 | 
  42 |   const page = await app.firstWindow()
  43 |   await page.waitForLoadState('domcontentloaded', { timeout: 20000 })
  44 | 
  45 |   return { app, page }
  46 | }
  47 | 
  48 | export async function closeGerki(app: ElectronApplication): Promise<void> {
  49 |   await app.close().catch(() => {})
  50 | }
  51 | 
```