/**
 * Plan-Enforcement für Gerki
 *
 * Pläne:
 *   free     – Testphase / kein aktives Abo → nur Ollama, nur general
 *   standard – 29,90 €/Mo → Ollama + Openclaw, Behördenpost + Dokumente
 *   pro      – Alias für standard (Legacy)
 *   business – 49,90 €/Mo → alle Modelle, 5 Agents
 *   enterprise – auf Anfrage → alle 8 Agents + Priority
 */

export type Plan = 'free' | 'standard' | 'pro' | 'business' | 'enterprise'

// Welche Skills sind pro Plan erlaubt?
const ALLOWED_SKILLS: Record<Plan, string[]> = {
  free:       ['general'],
  standard:   ['general', 'behoerdenpost', 'dokumenten-assistent'],
  pro:        ['general', 'behoerdenpost', 'dokumenten-assistent'],
  business:   ['general', 'behoerdenpost', 'dokumenten-assistent', 'rechtsberater', 'email-manager', 'hr-assistent', 'buchhaltung'],
  enterprise: ['general', 'behoerdenpost', 'dokumenten-assistent', 'rechtsberater', 'email-manager', 'hr-assistent', 'buchhaltung', 'marketing']
}

// Welche Modelle sind pro Plan erlaubt?
const ALLOWED_MODELS: Record<Plan, string[]> = {
  free:       ['ollama'],
  standard:   ['ollama'],
  pro:        ['ollama'],
  business:   ['ollama', 'claude', 'gpt-4', 'gpt-3.5'],
  enterprise: ['ollama', 'claude', 'gpt-4', 'gpt-3.5']
}

const PLAN_NAMES: Record<Plan, string> = {
  free:       'Testversion',
  standard:   'Standard',
  pro:        'Standard',
  business:   'Business',
  enterprise: 'Enterprise'
}

const UPGRADE_HINTS: Record<Plan, string> = {
  free:       'Upgrade auf Standard (29,90 €/Mo) um diesen Assistenten zu nutzen.',
  standard:   'Upgrade auf Business (49,90 €/Mo) um diesen Assistenten zu nutzen.',
  pro:        'Upgrade auf Business (49,90 €/Mo) um diesen Assistenten zu nutzen.',
  business:   'Kontaktiere uns für Enterprise-Zugang.',
  enterprise: ''
}

export function isSkillAllowed(plan: string, skillSlug: string): boolean {
  const p = (plan as Plan) in ALLOWED_SKILLS ? (plan as Plan) : 'free'
  return ALLOWED_SKILLS[p].includes(skillSlug)
}

export function isModelAllowed(plan: string, model: string): boolean {
  const p = (plan as Plan) in ALLOWED_MODELS ? (plan as Plan) : 'free'
  return ALLOWED_MODELS[p].includes(model)
}

export function getPlanName(plan: string): string {
  return PLAN_NAMES[(plan as Plan)] ?? 'Unbekannt'
}

export function getUpgradeHint(plan: string): string {
  return UPGRADE_HINTS[(plan as Plan)] ?? 'Upgrade erforderlich.'
}

export function checkAccess(
  plan: string,
  skillSlug: string,
  model: string
): { allowed: boolean; error?: string } {
  if (!isSkillAllowed(plan, skillSlug)) {
    const hint = getUpgradeHint(plan)
    return {
      allowed: false,
      error: `Der Assistent "${skillSlug}" ist in deinem ${getPlanName(plan)}-Plan nicht verfügbar. ${hint}`
    }
  }
  if (!isModelAllowed(plan, model)) {
    const hint = getUpgradeHint(plan)
    return {
      allowed: false,
      error: `Das Modell "${model}" ist in deinem ${getPlanName(plan)}-Plan nicht verfügbar. ${hint}`
    }
  }
  return { allowed: true }
}
