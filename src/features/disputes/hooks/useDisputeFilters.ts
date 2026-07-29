import { useState } from 'react'
import type { DisputeFilters, DisputeReasonCategory, DisputeStatus, UrgencyLevel } from '@/features/disputes/types'

const defaultFilters: DisputeFilters = {
  sortBy: 'deadline',
  sortOrder: 'asc',
  search: undefined,
  urgency: undefined,
  reasonCategory: undefined,
  status: undefined,
}

export function useDisputeFilters() {
  const [filters, setFilters] = useState<DisputeFilters>(defaultFilters)

  function setSearch(search: string | undefined) {
    setFilters((prev) => ({ ...prev, search: search || undefined }))
  }

  function setSortBy(sortBy: DisputeFilters['sortBy']) {
    setFilters((prev) => ({ ...prev, sortBy }))
  }

  function setSortOrder(sortOrder: DisputeFilters['sortOrder']) {
    setFilters((prev) => ({ ...prev, sortOrder }))
  }

  function setUrgency(urgency: UrgencyLevel | undefined) {
    setFilters((prev) => ({ ...prev, urgency }))
  }

  function setReasonCategory(reasonCategory: DisputeReasonCategory | undefined) {
    setFilters((prev) => ({ ...prev, reasonCategory }))
  }

  function setStatus(status: DisputeStatus | undefined) {
    setFilters((prev) => ({ ...prev, status }))
  }

  function resetFilters() {
    setFilters(defaultFilters)
  }

  return {
    filters,
    setSearch,
    setSortBy,
    setSortOrder,
    setUrgency,
    setReasonCategory,
    setStatus,
    resetFilters,
  }
}
