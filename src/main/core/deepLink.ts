/**
 * Deep-Link Handler für gerki-app:// Protocol
 *
 * Flow:
 *  gerki.app/login?source=app → Google OAuth → gerki-app://auth?token=JWT
 *  Electron fängt die URL ab, speichert den Token und loggt den User ein.
 */

import { BrowserWindow } from 'electron'
import { storeDeepLinkToken } from './remoteAuth'

export async function handleDeepLink(url: string, mainWindow: BrowserWindow): Promise<void> {
  try {
    const parsed = new URL(url)

    // gerki-app://auth?token=JWT_TOKEN
    if (parsed.hostname === 'auth') {
      const token = parsed.searchParams.get('token')
      if (!token) return

      // Token speichern + User-Daten laden
      const user = await storeDeepLinkToken(token)

      if (user) {
        // Renderer informieren → App zeigt Hauptseite
        mainWindow.webContents.send('auth:deep-link-success', { user })
      } else {
        mainWindow.webContents.send('auth:deep-link-error', { error: 'Token ungültig' })
      }
    }
  } catch (err) {
    console.error('Deep-link parse error:', err)
  }
}
