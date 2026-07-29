import { describe, expect, it } from 'vitest'
import {
  getCaseStrength,
  getEvidenceChecklist,
  getEarnedPoints,
  getRiskSignals,
} from '@/features/disputes/utils/caseAssessment'
import type { Dispute, EvidenceSignal } from '@/features/disputes/types'

const signal = (strength: EvidenceSignal['strength'], id = strength): EvidenceSignal => ({
  id,
  label: `${id} label`,
  value: 'v',
  strength,
})

describe('getCaseStrength', () => {
  it('returns Weak with score 0 for no signals', () => {
    const result = getCaseStrength([])
    expect(result).toMatchObject({ score: 0, label: 'Weak', color: 'error' })
  })

  it('returns Strong for all strong signals', () => {
    const result = getCaseStrength([signal('strong', 'a'), signal('strong', 'b')])
    expect(result.score).toBe(100)
    expect(result.label).toBe('Strong')
    expect(result.color).toBe('success')
  })

  it('returns Moderate in the 45-69 band', () => {
    // avg weight 0.6 -> score 60
    const result = getCaseStrength([signal('moderate', 'a'), signal('moderate', 'b')])
    expect(result.score).toBe(60)
    expect(result.label).toBe('Moderate')
    expect(result.color).toBe('warning')
  })

  it('returns Weak below 45', () => {
    const result = getCaseStrength([signal('weak', 'a'), signal('missing', 'b')])
    expect(result.label).toBe('Weak')
    expect(result.color).toBe('error')
  })
})

describe('getEvidenceChecklist', () => {
  it('marks strong/moderate as met and others unmet', () => {
    const items = getEvidenceChecklist([
      signal('strong', 'a'),
      signal('moderate', 'b'),
      signal('weak', 'c'),
      signal('missing', 'd'),
    ])
    expect(items.map((i) => i.met)).toEqual([true, true, false, false])
    expect(items.map((i) => i.points)).toEqual([20, 15, 10, 5])
  })
})

describe('getEarnedPoints', () => {
  it('sums earned points only for met items and total for all', () => {
    const items = getEvidenceChecklist([signal('strong', 'a'), signal('weak', 'b')])
    expect(getEarnedPoints(items)).toEqual({ earned: 20, total: 30 })
  })
})

describe('getRiskSignals', () => {
  const baseDispute = {
    transaction: { country: 'Mexico', avsMatch: true, cvvMatch: false },
    customer: { country: 'Mexico', priorDisputes: 0, completedBookings: 3 },
  } as Dispute

  it('flags positive and negative signals correctly', () => {
    const signals = getRiskSignals(baseDispute)
    const byId = Object.fromEntries(signals.map((s) => [s.id, s.positive]))
    expect(byId['ip-country']).toBe(true) // countries match
    expect(byId['avs']).toBe(true)
    expect(byId['cvv']).toBe(false)
    expect(byId['prior-disputes']).toBe(true)
    expect(byId['history']).toBe(true)
  })

  it('flags a mismatched IP country and prior disputes as negative', () => {
    const dispute = {
      transaction: { country: 'Brazil', avsMatch: false, cvvMatch: true },
      customer: { country: 'Mexico', priorDisputes: 2, completedBookings: 0 },
    } as Dispute

    const byId = Object.fromEntries(getRiskSignals(dispute).map((s) => [s.id, s.positive]))
    expect(byId['ip-country']).toBe(false)
    expect(byId['avs']).toBe(false)
    expect(byId['cvv']).toBe(true)
    expect(byId['prior-disputes']).toBe(false)
    expect(byId['history']).toBe(false)
  })
})
