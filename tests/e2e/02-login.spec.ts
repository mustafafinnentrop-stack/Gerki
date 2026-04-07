/**
 * Test: Login-Flow mit Dev-Account
 */
import { test, expect } from '@playwright/test'
import { launchGerki, closeGerki } from '../helpers/electron'

// Dev-Account (aus devAccounts.ts) — nur für Tests
const DEV_EMAIL = 'mustafa.yildirim@gerki.app'
const DEV_PASSWORD = process.env.GERKI_TEST_PASSWORD ?? ''

test.describe('Login', () => {
  test.skip(!DEV_PASSWORD, 'GERKI_TEST_PASSWORD nicht gesetzt — Login-Tests übersprungen')

  test('Login mit Dev-Account', async () => {
    const { app, page } = await launchGerki()

    try {
      // Login-Screen warten
      const emailInput = page.locator('input[type="email"], input[placeholder*="E-Mail"], input[placeholder*="mail"]').first()
      await emailInput.waitFor({ timeout: 10000 })

      await emailInput.fill(DEV_EMAIL)

      const pwInput = page.locator('input[type="password"]').first()
      await pwInput.fill(DEV_PASSWORD)

      await page.locator('button[type="submit"], button:has-text("Anmelden"), button:has-text("Login")').first().click()

      // Hauptapp sollte erscheinen
      await expect(page.locator('text=Chat').first()).toBeVisible({ timeout: 10000 })

      await page.screenshot({ path: 'tests/screenshots/login-success.png' })
    } finally {
      await closeGerki(app)
    }
  })

  test('Login mit falschen Credentials zeigt Fehler', async () => {
    const { app, page } = await launchGerki()

    try {
      const emailInput = page.locator('input[type="email"], input[placeholder*="E-Mail"], input[placeholder*="mail"]').first()
      await emailInput.waitFor({ timeout: 10000 })

      await emailInput.fill('falsch@test.de')
      await page.locator('input[type="password"]').first().fill('FalschesPasswort123!')
      await page.locator('button[type="submit"], button:has-text("Anmelden")').first().click()

      // Fehlermeldung sollte erscheinen
      const error = page.locator('[class*="red"], [class*="error"], text=Fehler, text=ungültig, text=falsch').first()
      await expect(error).toBeVisible({ timeout: 8000 })
    } finally {
      await closeGerki(app)
    }
  })
})
