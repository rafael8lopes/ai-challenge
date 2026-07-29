import { Box } from '@mui/material'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import ScheduleIcon from '@mui/icons-material/Schedule'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import type { Dispute, DisputeReasonCategory, DisputeStatus, UrgencyLevel } from '@/features/disputes/types'
import { getSidebarCounts } from '@/features/disputes/utils/formatters'
import { SidebarSection, type SidebarOption } from '@/features/disputes/components/sidebar/SidebarSection'

interface DisputeSidebarProps {
  disputes: Dispute[]
  selectedUrgency: UrgencyLevel | undefined
  selectedReason: DisputeReasonCategory | undefined
  selectedStatus: DisputeStatus | undefined
  onUrgencyChange: (urgency: UrgencyLevel | undefined) => void
  onReasonChange: (reason: DisputeReasonCategory | undefined) => void
  onStatusChange: (status: DisputeStatus | undefined) => void
}

export function DisputeSidebar({
  disputes,
  selectedUrgency,
  selectedReason,
  selectedStatus,
  onUrgencyChange,
  onReasonChange,
  onStatusChange,
}: DisputeSidebarProps) {
  const counts = getSidebarCounts(disputes)
  const total = disputes.length

  const urgencyOptions: SidebarOption<UrgencyLevel>[] = [
    { label: 'All urgency', count: total, value: undefined, color: '#5b9cf6' },
    {
      label: 'Critical',
      count: counts.urgency.critical,
      value: 'critical',
      color: '#f44336',
      icon: <ErrorOutlineIcon sx={{ fontSize: 16, color: '#f44336' }} />,
    },
    {
      label: 'Urgent',
      count: counts.urgency.urgent,
      value: 'urgent',
      color: '#ff9800',
      icon: <WarningAmberIcon sx={{ fontSize: 16, color: '#ff9800' }} />,
    },
    {
      label: 'Moderate',
      count: counts.urgency.moderate,
      value: 'moderate',
      color: '#ffc107',
      icon: <ScheduleIcon sx={{ fontSize: 16, color: '#ffc107' }} />,
    },
    {
      label: 'Normal',
      count: counts.urgency.normal,
      value: 'normal',
      color: '#4caf50',
      icon: <CheckCircleOutlineIcon sx={{ fontSize: 16, color: '#4caf50' }} />,
    },
  ]

  const reasonOptions: SidebarOption<DisputeReasonCategory>[] = [
    { label: 'All reasons', count: total, value: undefined, color: '#5b9cf6' },
    { label: 'Fraud', count: counts.reason.fraud, value: 'fraud', color: '#f44336' },
    { label: 'Service', count: counts.reason.service, value: 'service', color: '#29b6f6' },
    { label: 'Processing', count: counts.reason.processing, value: 'processing', color: '#ffc107' },
    { label: 'Authorization', count: counts.reason.authorization, value: 'authorization', color: '#ab47bc' },
  ]

  const statusOptions: SidebarOption<DisputeStatus>[] = [
    { label: 'All status', count: total, value: undefined, color: '#5b9cf6' },
    { label: 'New', count: counts.status['new'], value: 'new', color: '#4caf50' },
    { label: 'In Progress', count: counts.status['in-progress'], value: 'in-progress', color: '#5b9cf6' },
    { label: 'Submitted', count: counts.status['submitted'], value: 'submitted', color: '#ff9800' },
  ]

  return (
    <Box sx={{ width: 200, flexShrink: 0, py: 2, px: 1.5 }}>
      <SidebarSection
        title="URGENCY"
        options={urgencyOptions}
        selected={selectedUrgency}
        onChange={onUrgencyChange}
      />
      <SidebarSection
        title="REASON"
        options={reasonOptions}
        selected={selectedReason}
        onChange={onReasonChange}
      />
      <SidebarSection
        title="STATUS"
        options={statusOptions}
        selected={selectedStatus}
        onChange={onStatusChange}
        last
      />
    </Box>
  )
}
