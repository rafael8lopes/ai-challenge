import type { DisputeReasonCategory, DisputeStatus } from '@/features/disputes/types'
import { getUrgencyLevel } from '@/features/disputes/utils/formatters'

export interface ChipStyle {
  bgcolor: string
  color: string
  border?: string
}

export function getReasonChipColor(category: DisputeReasonCategory): string {
  switch (category) {
    case 'fraud': return '#f44336'
    case 'service': return '#29b6f6'
    case 'processing': return '#ffc107'
    case 'authorization': return '#ab47bc'
    default: return '#8b949e'
  }
}

export function getStatusChipStyles(status: DisputeStatus): ChipStyle {
  switch (status) {
    case 'new': return { bgcolor: 'transparent', color: '#4caf50', border: '1px solid #4caf50' }
    case 'in-progress': return { bgcolor: '#1565c0', color: '#fff' }
    case 'submitted': return { bgcolor: 'transparent', color: '#ff9800', border: '1px solid #ff9800' }
    default: return { bgcolor: '#333', color: '#fff' }
  }
}

export function getDeadlineColor(daysRemaining: number): string {
  const urgency = getUrgencyLevel(daysRemaining)
  switch (urgency) {
    case 'critical': return '#f44336'
    case 'urgent': return '#ff9800'
    case 'moderate': return '#ffc107'
    case 'normal': return '#4caf50'
  }
}
