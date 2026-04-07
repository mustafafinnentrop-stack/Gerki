/**
 * Electron Test Helper
 * Startet die Gerki App für E2E Tests
 */
import { _electron as electron, ElectronApplication, Page } from '@playwright/test'
import path from 'path'
import fs from 'fs'

export interface GerkiApp {
  app: ElectronApplication
  page: Page
}

export async function launchGerki(): Promise<GerkiApp> {
  const mainPath = path.join(__dirname, '../../out/main/index.js')
  if (!fs.existsSync(mainPath)) {
    throw new Error(`Build fehlt: ${mainPath} — bitte "npm run build" ausführen`)
  }

  const electronPath = require('electron') as unknown as string

  const app = await electron.launch({
    executablePath: electronPath,
    args: [
      mainPath,
      '--no-sandbox',
      '--disable-gpu',
      '--disable-dev-shm-usage',
      '--disable-software-rasterizer',
      '--disable-gpu-compositing',
      '--disable-gpu-rasterization',
      '--in-process-gpu',
    ],
    env: {
      ...process.env,
      NODE_ENV: 'production',
      ELECTRON_IS_DEV: '0',
    },
    timeout: 45000,
  })

  const page = await app.firstWindow()
  await page.waitForLoadState('domcontentloaded', { timeout: 20000 })

  return { app, page }
}

export async function closeGerki(app: ElectronApplication): Promise<void> {
  await app.close().catch(() => {})
}
