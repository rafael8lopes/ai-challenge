import { describe, expect, it } from 'vitest'
import {
  getReasonExplanation,
  getReasonCategoryLabel,
  getReasonCategoryColor,
} from '@/features/disputes/utils/reasonCodes'

describe('getReasonExplanation', () => {
  it('returns info for a known code', () => {
    const info = getReasonExplanation('10.4')
    expect(info?.category).toBe('fraud')
    expect(info?.evidenceGuidance.length).toBeGreaterThan(0)
    expect(info?.watchFor.length).toBeGreaterThan(0)
  })

  it('returns undefined for an unknown code', () => {
    expect(getReasonExplanation('99.9')).toBeUndefined()
  })
})

describe('getReasonCategoryLabel', () => {
  it('labels categories', () => {
    expect(getReasonCategoryLabel('processing')).toBe('Processing')
    expect(getReasonCategoryLabel('fraud')).toBe('Fraud')
  })
})

describe('getReasonCategoryColor', () => {
  it.each([
    ['fraud', 'error'],
    ['service', 'warning'],
    ['processing', 'info'],
    ['authorization', 'secondary'],
  ] as const)('maps %s to %s', (category, expected) => {
    expect(getReasonCategoryColor(category)).toBe(expected)
  })
})
