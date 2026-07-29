import type { Currency, Dispute, DisputeReasonCategory, DisputeStatus, UrgencyLevel } from '@/features/disputes/types'

export function formatCurrency(amount: number, currency: Currency): string {
  const localeMap: Record<Currency, string> = {
    USD: 'en-US',
    MXN: 'es-MX',
    BRL: 'pt-BR',
    COP: 'es-CO',
  }

  return new Intl.NumberFormat(localeMap[currency], {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount)
}

export function formatUsdEquivalent(amount: number, currency: Currency): string | undefined {
  if (currency === 'USD') return undefined
  const rates: Record<Currency, number> = {
    USD: 1,
    MXN: 0.058,
    BRL: 0.19,
    COP: 0.00025,
  }
  const usd = amount * rates[currency]
  return `$${Math.round(usd).toLocaleString('en-US')}`
}

export function getTotalExposureUsd(amounts: { amount: number; currency: Currency }[]): number {
  const rates: Record<Currency, number> = {
    USD: 1,
    MXN: 0.058,
    BRL: 0.19,
    COP: 0.00025,
  }
  return amounts.reduce((sum, { amount, currency }) => sum + amount * rates[currency], 0)
}

export function getDaysRemaining(deadline: string): number {
  const now = new Date()
  now.setHours(0, 0, 0, 0)
  const deadlineDate = new Date(deadline)
  deadlineDate.setHours(0, 0, 0, 0)
  const diffMs = deadlineDate.getTime() - now.getTime()
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24))
}

export function getUrgencyLevel(daysRemaining: number): UrgencyLevel {
  if (daysRemaining <= 2) return 'critical'
  if (daysRemaining <= 5) return 'urgent'
  if (daysRemaining <= 10) return 'moderate'
  return 'normal'
}

export function getUrgencyColor(daysRemaining: number): 'error' | 'warning' | 'default' {
  const urgency = getUrgencyLevel(daysRemaining)
  if (urgency === 'critical') return 'error'
  if (urgency === 'urgent' || urgency === 'moderate') return 'warning'
  return 'default'
}

export function getStatusLabel(status: DisputeStatus): string {
  const labels: Record<DisputeStatus, string> = {
    'new': 'New',
    'in-progress': 'In Progress',
    'submitted': 'Submitted',
  }
  return labels[status]
}

export function getStatusColor(status: DisputeStatus): 'default' | 'primary' | 'success' {
  const colors: Record<DisputeStatus, 'default' | 'primary' | 'success'> = {
    'new': 'success',
    'in-progress': 'primary',
    'submitted': 'default',
  }
  return colors[status]
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function formatShortDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  })
}

export function formatDateTime(dateStr: string): string {
  return new Date(dateStr).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

export function getPaymentMethodIcon(method: string): string {
  if (method.toLowerCase().includes('visa')) return 'Visa'
  if (method.toLowerCase().includes('mastercard')) return 'Mastercard'
  if (method.toLowerCase().includes('amex')) return 'Amex'
  return 'Card'
}

export function getCountryCode(country: string): string {
  const map: Record<string, string> = {
    'Mexico': 'MX',
    'Brazil': 'BR',
    'Colombia': 'CO',
    'United States': 'US',
    'Canada': 'CA',
    'Argentina': 'AR',
    'Dominican Republic': 'DO',
    'Cuba': 'CU',
    'Jamaica': 'JM',
    'Peru': 'PE',
    'Panama': 'PA',
    'United Kingdom': 'UK',
    'Unknown': '??',
  }
  return map[country] ?? country.substring(0, 2).toUpperCase()
}

export interface SidebarCounts {
  urgency: Record<UrgencyLevel, number>
  reason: Record<DisputeReasonCategory, number>
  status: Record<DisputeStatus, number>
}

export function getSidebarCounts(disputes: Dispute[]): SidebarCounts {
  const urgency: Record<UrgencyLevel, number> = { critical: 0, urgent: 0, moderate: 0, normal: 0 }
  const reason: Record<DisputeReasonCategory, number> = { fraud: 0, service: 0, processing: 0, authorization: 0 }
  const status: Record<DisputeStatus, number> = { 'new': 0, 'in-progress': 0, 'submitted': 0 }

  for (const dispute of disputes) {
    urgency[getUrgencyLevel(getDaysRemaining(dispute.responseDeadline))] += 1
    reason[dispute.reasonCategory] += 1
    status[dispute.status] += 1
  }

  return { urgency, reason, status }
}
