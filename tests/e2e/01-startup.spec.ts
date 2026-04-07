/**
 * Test: App-Start + Login-Screen
 */
import { test, expect } from '@playwright/test'
import { launchGerki, closeGerki } from '../helpers/electron'

test.describe('App Start', () => {
  test('App startet und zeigt Login- oder Hauptscreen', async () => {
    const { app, page } = await launchGerki()

    try {
      // App sollte innerhalb von 10s etwas anzeigen
      await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {})

      // Entweder Login-Screen oder Hauptapp
      const hasLogin = await page.locator('input[type="email"], input[type="text"][placeholder*="mail"]').count() > 0
      const hasApp = await page.locator('text=Chat, text=Agenten, text=Gerki').count() > 0
      const hasLoading = await page.locator('.animate-spin').count() > 0

      expect(hasLogin || hasApp || hasLoading).toBeTruthy()

      // Screenshot für Dokumentation
      await page.screenshot({ path: 'tests/screenshots/startup.png', fullPage: true })
    } finally {
      await closeGerki(app)
    }
  })

  test('Fenster hat korrekte Mindestgröße', async () => {
    const { app, page } = await launchGerki()

    try {
      const size = await page.evaluate(() => ({
        width: window.innerWidth,
        height: window.innerHeight,
      }))

      expect(size.width).toBeGreaterThanOrEqual(900)
      expect(size.height).toBeGreaterThanOrEqual(600)
    } finally {
      await closeGerki(app)
    }
  })

  test('Kein JavaScript-Crash im Renderer', async () => {
    const { app, page } = await launchGerki()
    const errors: string[] = []

    page.on('pageerror', (err) => errors.push(err.message))
    await page.waitForTimeout(3000)

    try {
      expect(errors).toHaveLength(0)
    } finally {
      await closeGerki(app)
    }
  })
})
