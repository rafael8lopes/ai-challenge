import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { applyFilters } from '@/features/disputes/services/disputeService'
import type { Dispute, DisputeFilters } from '@/features/disputes/types'

const base: DisputeFilters = { sortBy: 'amount', sortOrder: 'asc' }

function makeDispute(overrides: Partial<Dispute>): Dispute {
  return {
    id: 'D-1',
    amount: 100,
    currency: 'USD',
    reasonCode: '10.4',
    reasonCategory: 'fraud',
    status: 'new',
    responseDeadline: '2026-08-10',
    filedAt: '2026-07-20',
    transactionDate: '2026-07-01',
    paymentMethod: 'Visa ****4532',
    processor: 'EBANX',
    customer: {
      name: 'Ana Silva',
      email: 'ana@example.com',
      country: 'Brazil',
      accountCreatedAt: '2025-01-01',
      completedBookings: 2,
      priorDisputes: 0,
    },
    booking: {
      propertyName: 'Ocean View Villa',
      propertyLocation: 'Rio',
      checkIn: '2026-07-02',
      checkOut: '2026-07-05',
      guestCount: 2,
      totalNights: 3,
      hostName: 'Host',
      hostEmail: 'host@example.com',
      cancellationPolicy: 'flexible',
    },
    transaction: {
      date: '2026-07-01',
      paymentMethod: 'Visa ****4532',
      processor: 'EBANX',
      authorizationCode: 'AUTH1',
      ipAddress: '1.1.1.1',
      country: 'Brazil',
      avsMatch: true,
      cvvMatch: true,
    },
    timeline: [],
    evidenceSignals: [],
    ...overrides,
  }
}

const disputes: Dispute[] = [
  makeDispute({ id: 'D-1', amount: 300, status: 'new', reasonCategory: 'fraud', customer: { ...makeDispute({}).customer, name: 'Bruno Costa' } }),
  makeDispute({ id: 'D-2', amount: 100, status: 'submitted', reasonCategory: 'service', customer: { ...makeDispute({}).customer, name: 'Ana Silva' } }),
  makeDispute({ id: 'D-3', amount: 200, status: 'new', reasonCategory: 'fraud', customer: { ...makeDispute({}).customer, name: 'Carla Dias' } }),
]

describe('applyFilters', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-07-29T10:00:00Z'))
  })
  afterEach(() => vi.useRealTimers())

  it('does not mutate the input array', () => {
    const original = [...disputes]
    applyFilters(disputes, base)
    expect(disputes).toEqual(original)
  })

  it('sorts by amount ascending', () => {
    const result = applyFilters(disputes, base)
    expect(result.map((d) => d.amount)).toEqual([100, 200, 300])
  })

  it('sorts by amount descending', () => {
    const result = applyFilters(disputes, { ...base, sortOrder: 'desc' })
    expect(result.map((d) => d.amount)).toEqual([300, 200, 100])
  })

  it('filters by status', () => {
    const result = applyFilters(disputes, { ...base, status: 'new' })
    expect(result.every((d) => d.status === 'new')).toBe(true)
    expect(result).toHaveLength(2)
  })

  it('filters by reason category', () => {
    const result = applyFilters(disputes, { ...base, reasonCategory: 'service' })
    expect(result.map((d) => d.id)).toEqual(['D-2'])
  })

  it('searches by guest name case-insensitively', () => {
    const result = applyFilters(disputes, { ...base, search: 'ana' })
    expect(result.map((d) => d.id)).toEqual(['D-2'])
  })

  it('sorts by guest name', () => {
    const result = applyFilters(disputes, { ...base, sortBy: 'guest', sortOrder: 'asc' })
    expect(result.map((d) => d.customer.name)).toEqual(['Ana Silva', 'Bruno Costa', 'Carla Dias'])
  })
})
