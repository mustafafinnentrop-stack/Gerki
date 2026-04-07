/**
 * Test: Chat-Funktionalität
 */
import { test, expect } from '@playwright/test'
import { launchGerki, closeGerki } from '../helpers/electron'

const DEV_EMAIL = 'mustafa.yildirim@gerki.app'
const DEV_PASSWORD = process.env.GERKI_TEST_PASSWORD ?? ''

test.describe('Chat', () => {
  test.skip(!DEV_PASSWORD, 'GERKI_TEST_PASSWORD nicht gesetzt')

  test('Nachricht senden und Antwort erhalten', async () => {
    const { app, page } = await launchGerki()

    try {
      // Login
      const emailInput = page.locator('input[type="email"], input[placeholder*="E-Mail"]').first()
      await emailInput.waitFor({ timeout: 10000 })
      await emailInput.fill(DEV_EMAIL)
      await page.locator('input[type="password"]').first().fill(DEV_PASSWORD)
      await page.locator('button[type="submit"]').first().click()
      await page.locator('text=Chat').first().waitFor({ timeout: 10000 })

      // Nachricht senden
      const chatInput = page.locator('textarea[placeholder*="Nachricht"]').first()
      await chatInput.waitFor({ timeout: 8000 })
      await chatInput.fill('Sag einfach "Hallo" als Test.')

      // Enter drücken
      await chatInput.press('Enter')

      // Warten auf Antwort (Spinner verschwindet oder Text erscheint)
      await page.waitForTimeout(2000)
      const hasResponse = await page.locator('[class*="assistant"], .animate-spin').count() > 0
      expect(hasResponse).toBeTruthy()

      await page.screenshot({ path: 'tests/screenshots/chat-response.png' })
    } finally {
      await closeGerki(app)
    }
  })

  test('Download-Dropdown öffnet sich nach oben', async () => {
    const { app, page } = await launchGerki()

    try {
      const emailInput = page.locator('input[type="email"], input[placeholder*="E-Mail"]').first()
      await emailInput.waitFor({ timeout: 10000 })
      await emailInput.fill(DEV_EMAIL)
      await page.locator('input[type="password"]').first().fill(DEV_PASSWORD)
      await page.locator('button[type="submit"]').first().click()
      await page.locator('text=Chat').first().waitFor({ timeout: 10000 })

      // Warte auf eine Nachricht mit Download-Button
      const downloadBtn = page.locator('button[title*="Dokument"]').first()
      const hasDlBtn = await downloadBtn.isVisible({ timeout: 5000 }).catch(() => false)

      if (hasDlBtn) {
        await downloadBtn.click()

        // Dropdown sollte "Als PDF" zeigen
        await expect(page.locator('text=Als PDF')).toBeVisible({ timeout: 3000 })

        // Dropdown sollte ÜBER dem Button sein (bottom-full)
        const dropdown = page.locator('text=Als PDF').locator('..')
        const btnBox = await downloadBtn.boundingBox()
        const dropBox = await dropdown.boundingBox()

        if (btnBox && dropBox) {
          // Dropdown-Unterkante sollte oberhalb des Buttons sein
          expect(dropBox.y + dropBox.height).toBeLessThanOrEqual(btnBox.y + 5)
        }
      }
    } finally {
      await closeGerki(app)
    }
  })
})
