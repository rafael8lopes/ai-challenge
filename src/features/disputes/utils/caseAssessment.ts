import type { Dispute, EvidenceSignal, EvidenceStrength } from '@/features/disputes/types'

export interface CaseStrength {
  score: number
  label: 'Strong' | 'Moderate' | 'Weak'
  color: 'success' | 'warning' | 'error'
  summary: string
}

export interface ChecklistItem {
  id: string
  label: string
  detail?: string
  met: boolean
  points: number
}

export interface RiskSignal {
  id: string
  label: string
  detail: string
  positive: boolean
}

const STRENGTH_WEIGHT: Record<EvidenceStrength, number> = {
  strong: 1,
  moderate: 0.6,
  weak: 0.3,
  missing: 0,
}

const STRENGTH_POINTS: Record<EvidenceStrength, number> = {
  strong: 20,
  moderate: 15,
  weak: 10,
  missing: 5,
}

export function getCaseStrength(signals: EvidenceSignal[]): CaseStrength {
  if (signals.length === 0) {
    return {
      score: 0,
      label: 'Weak',
      color: 'error',
      summary: 'No evidence collected yet. Start gathering documentation before the deadline.',
    }
  }

  const avg = signals.reduce((sum, signal) => sum + STRENGTH_WEIGHT[signal.strength], 0) / signals.length
  const score = Math.round(avg * 100)

  if (score >= 70) {
    return {
      score,
      label: 'Strong',
      color: 'success',
      summary: 'Your evidence package is solid. Prioritize submitting before the deadline.',
    }
  }
  if (score >= 45) {
    return {
      score,
      label: 'Moderate',
      color: 'warning',
      summary: 'Evidence is workable but has gaps. Strengthen the weak signals to improve your odds.',
    }
  }
  return {
    score,
    label: 'Weak',
    color: 'error',
    summary: 'Evidence is thin. Gather the recommended documentation urgently to have a chance.',
  }
}

export function getEvidenceChecklist(signals: EvidenceSignal[]): ChecklistItem[] {
  return signals.map((signal) => ({
    id: signal.id,
    label: signal.label,
    detail: signal.value,
    met: signal.strength === 'strong' || signal.strength === 'moderate',
    points: STRENGTH_POINTS[signal.strength],
  }))
}

export function getEarnedPoints(items: ChecklistItem[]): { earned: number; total: number } {
  return items.reduce(
    (acc, item) => ({
      earned: acc.earned + (item.met ? item.points : 0),
      total: acc.total + item.points,
    }),
    { earned: 0, total: 0 },
  )
}

export function getRiskSignals(dispute: Dispute): RiskSignal[] {
  const { transaction, customer } = dispute
  const ipMatches = transaction.country === customer.country

  return [
    {
      id: 'ip-country',
      label: 'IP country',
      detail: ipMatches ? `${transaction.country} — matches account` : `${transaction.country} — differs from account`,
      positive: ipMatches,
    },
    {
      id: 'avs',
      label: 'AVS verification',
      detail: transaction.avsMatch ? 'Billing address match' : 'Billing address mismatch',
      positive: transaction.avsMatch,
    },
    {
      id: 'cvv',
      label: 'CVV verification',
      detail: transaction.cvvMatch ? 'Security code match' : 'Security code mismatch',
      positive: transaction.cvvMatch,
    },
    {
      id: 'prior-disputes',
      label: 'Prior disputes',
      detail: customer.priorDisputes === 0 ? 'None on record' : `${customer.priorDisputes} on record`,
      positive: customer.priorDisputes === 0,
    },
    {
      id: 'history',
      label: 'Booking history',
      detail: customer.completedBookings > 0 ? `${customer.completedBookings} completed stays` : 'No completed stays yet',
      positive: customer.completedBookings > 0,
    },
  ]
}
