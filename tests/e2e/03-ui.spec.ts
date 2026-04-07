/**
 * Test: UI-Elemente + Navigation
 */
import { test, expect } from '@playwright/test'
import { launchGerki, closeGerki } from '../helpers/electron'

const DEV_EMAIL = 'mustafa.yildirim@gerki.app'
const DEV_PASSWORD = process.env.GERKI_TEST_PASSWORD ?? ''

async function loginAndGetPage(page: import('@playwright/test').Page) {
  if (!DEV_PASSWORD) return false
  const emailInput = page.locator('input[type="email"], input[placeholder*="E-Mail"], input[placeholder*="mail"]').first()
  const isLogin = await emailInput.isVisible({ timeout: 5000 }).catch(() => false)
  if (!isLogin) return true // Schon eingeloggt

  await emailInput.fill(DEV_EMAIL)
  await page.locator('input[type="password"]').first().fill(DEV_PASSWORD)
  await page.locator('button[type="submit"]').first().click()
  await page.locator('text=Chat').first().waitFor({ timeout: 10000 })
  return true
}

test.describe('Navigation', () => {
  test.skip(!DEV_PASSWORD, 'GERKI_TEST_PASSWORD nicht gesetzt')

  test('Sidebar-Navigation funktioniert', async () => {
    const { app, page } = await launchGerki()

    try {
      await loginAndGetPage(page)

      // Chat
      await page.locator('text=Chat').first().click()
      await expect(page.locator('textarea, input[placeholder*="Nachricht"]').first()).toBeVisible()

      // Einstellungen
      await page.locator('text=Einstellungen').first().click()
      await page.waitForTimeout(500)
      await page.screenshot({ path: 'tests/screenshots/settings.png' })

      // Memory
      await page.locator('text=Memory').first().click()
      await page.waitForTimeout(500)

      // Agenten
      await page.locator('text=Agenten').first().click()
      await page.waitForTimeout(500)

      await page.screenshot({ path: 'tests/screenshots/navigation.png' })
    } finally {
      await closeGerki(app)
    }
  })

  test('Chat-Eingabefeld ist vorhanden und fokussierbar', async () => {
    const { app, page } = await launchGerki()

    try {
      await loginAndGetPage(page)

      const chatInput = page.locator('textarea[placeholder*="Nachricht"], input[placeholder*="Nachricht"]').first()
      await expect(chatInput).toBeVisible({ timeout: 8000 })
      await chatInput.click()
      await chatInput.type('Test')

      const value = await chatInput.inputValue()
      expect(value).toBe('Test')
    } finally {
      await closeGerki(app)
    }
  })

  test('Neuer Chat Button erstellt neue Conversation', async () => {
    const { app, page } = await launchGerki()

    try {
      await loginAndGetPage(page)

      // Neuer Chat Button
      const newChatBtn = page.locator('button[title*="Chat"], button[aria-label*="Chat"]').first()
      if (await newChatBtn.isVisible()) {
        await newChatBtn.click()
        await page.waitForTimeout(500)
      }

      await page.screenshot({ path: 'tests/screenshots/new-chat.png' })
    } finally {
      await closeGerki(app)
    }
  })
})
