import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  formatUsdEquivalent,
  getTotalExposureUsd,
  getDaysRemaining,
  getUrgencyLevel,
  getUrgencyColor,
  getStatusLabel,
  getStatusColor,
  getCountryCode,
  getSidebarCounts,
} from '@/features/disputes/utils/formatters'
import type { Dispute } from '@/features/disputes/types'

describe('formatUsdEquivalent', () => {
  it('returns undefined for USD', () => {
    expect(formatUsdEquivalent(100, 'USD')).toBeUndefined()
  })

  it('converts MXN to a USD string', () => {
    expect(formatUsdEquivalent(1000, 'MXN')).toBe('$58.00')
  })
})

describe('getTotalExposureUsd', () => {
  it('sums mixed-currency amounts into USD', () => {
    const total = getTotalExposureUsd([
      { amount: 100, currency: 'USD' },
      { amount: 1000, currency: 'MXN' }, // 58
    ])
    expect(total).toBeCloseTo(158, 5)
  })

  it('returns 0 for an empty list', () => {
    expect(getTotalExposureUsd([])).toBe(0)
  })
})

describe('getDaysRemaining', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-07-29T10:00:00Z'))
  })
  afterEach(() => vi.useRealTimers())

  it('counts future days', () => {
    expect(getDaysRemaining('2026-08-01')).toBe(3)
  })

  it('returns 0 for today', () => {
    expect(getDaysRemaining('2026-07-29')).toBe(0)
  })

  it('returns negative for past deadlines', () => {
    expect(getDaysRemaining('2026-07-27')).toBe(-2)
  })
})

describe('getUrgencyLevel', () => {
  it.each([
    [2, 'critical'],
    [3, 'urgent'],
    [5, 'urgent'],
    [6, 'moderate'],
    [10, 'moderate'],
    [11, 'normal'],
  ] as const)('maps %i days to %s', (days, expected) => {
    expect(getUrgencyLevel(days)).toBe(expected)
  })
})

describe('getUrgencyColor', () => {
  it.each([
    [1, 'error'],
    [4, 'warning'],
    [8, 'warning'],
    [20, 'default'],
  ] as const)('maps %i days to %s', (days, expected) => {
    expect(getUrgencyColor(days)).toBe(expected)
  })
})

describe('status helpers', () => {
  it('labels statuses', () => {
    expect(getStatusLabel('in-progress')).toBe('In Progress')
    expect(getStatusLabel('new')).toBe('New')
  })

  it('colors statuses', () => {
    expect(getStatusColor('new')).toBe('success')
    expect(getStatusColor('submitted')).toBe('default')
  })
})

describe('getCountryCode', () => {
  it('maps known countries', () => {
    expect(getCountryCode('Mexico')).toBe('MX')
  })

  it('falls back to the first two chars uppercased', () => {
    expect(getCountryCode('Chile')).toBe('CH')
  })
})

describe('getSidebarCounts', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-07-29T10:00:00Z'))
  })
  afterEach(() => vi.useRealTimers())

  it('tallies urgency, reason, and status', () => {
    const disputes = [
      { responseDeadline: '2026-07-30', reasonCategory: 'fraud', status: 'new' },
      { responseDeadline: '2026-08-20', reasonCategory: 'service', status: 'submitted' },
    ] as Dispute[]

    const counts = getSidebarCounts(disputes)
    expect(counts.urgency.critical).toBe(1)
    expect(counts.urgency.normal).toBe(1)
    expect(counts.reason.fraud).toBe(1)
    expect(counts.reason.service).toBe(1)
    expect(counts.status.new).toBe(1)
    expect(counts.status.submitted).toBe(1)
  })
})
