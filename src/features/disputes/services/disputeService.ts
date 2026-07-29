import type { Dispute, DisputeFilters } from '@/features/disputes/types'
import { disputes as mockDisputes } from '@/mocks/disputes'
import { getDaysRemaining, getUrgencyLevel } from '@/features/disputes/utils/formatters'

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function applyFilters(disputes: Dispute[], filters: DisputeFilters): Dispute[] {
  let result = [...disputes]

  if (filters.search) {
    const q = filters.search.toLowerCase()
    result = result.filter((d) =>
      d.customer.name.toLowerCase().includes(q) ||
      d.booking.propertyName.toLowerCase().includes(q) ||
      d.id.toLowerCase().includes(q)
    )
  }

  if (filters.urgency) {
    result = result.filter((d) => {
      const days = getDaysRemaining(d.responseDeadline)
      return getUrgencyLevel(days) === filters.urgency
    })
  }

  if (filters.reasonCategory) {
    result = result.filter((d) => d.reasonCategory === filters.reasonCategory)
  }

  if (filters.status) {
    result = result.filter((d) => d.status === filters.status)
  }

  result.sort((a, b) => {
    let comparison = 0

    switch (filters.sortBy) {
      case 'deadline':
        comparison = getDaysRemaining(a.responseDeadline) - getDaysRemaining(b.responseDeadline)
        break
      case 'amount':
        comparison = a.amount - b.amount
        break
      case 'filedAt':
        comparison = new Date(a.filedAt).getTime() - new Date(b.filedAt).getTime()
        break
    }

    return filters.sortOrder === 'asc' ? comparison : -comparison
  })

  return result
}

export const disputeService = {
  async getDisputes(filters: DisputeFilters): Promise<Dispute[]> {
    await delay(300)
    return applyFilters(mockDisputes, filters)
  },

  async getDisputeById(id: string): Promise<Dispute | undefined> {
    await delay(200)
    return mockDisputes.find((d) => d.id === id)
  },
}
