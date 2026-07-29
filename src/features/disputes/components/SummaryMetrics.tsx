import { Box, Typography } from '@mui/material'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import type { Dispute } from '@/features/disputes/types'
import { getDaysRemaining, getUrgencyLevel, getTotalExposureUsd } from '@/features/disputes/utils/formatters'

interface SummaryMetricsProps {
  disputes: Dispute[]
}

export function SummaryMetrics({ disputes }: SummaryMetricsProps) {
  const totalExposure = getTotalExposureUsd(disputes.map((d) => ({ amount: d.amount, currency: d.currency })))
  const critical = disputes.filter((d) => getUrgencyLevel(getDaysRemaining(d.responseDeadline)) === 'critical').length
  const urgent = disputes.filter((d) => getUrgencyLevel(getDaysRemaining(d.responseDeadline)) === 'urgent').length
  const unassigned = disputes.filter((d) => d.status === 'new').length

  const metrics = [
    {
      label: 'OPEN DISPUTES',
      value: disputes.length.toString(),
      sub: `${disputes.length} visible`,
      color: '#e6edf3',
    },
    {
      label: 'TOTAL EXPOSURE',
      value: `$${Math.round(totalExposure / 1000)}K`,
      sub: 'USD equivalent',
      color: '#e6edf3',
    },
    {
      label: 'CRITICAL',
      value: critical.toString(),
      sub: '< 2 days left',
      color: '#f44336',
      icon: true,
    },
    {
      label: 'URGENT',
      value: urgent.toString(),
      sub: '3–5 days left',
      color: '#ff9800',
    },
    {
      label: 'UNASSIGNED',
      value: unassigned.toString(),
      sub: 'status: new',
      color: '#5b9cf6',
    },
  ]

  return (
    <Box sx={{ display: 'flex', gap: 3, px: 3, py: 2.5, borderBottom: '1px solid', borderColor: 'divider' }}>
      {metrics.map((m) => (
        <Box key={m.label} sx={{ minWidth: 120 }}>
          <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500, letterSpacing: 0.5 }}>
            {m.label}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            {m.icon && <WarningAmberIcon sx={{ color: m.color, fontSize: 20 }} />}
            <Typography variant="h4" sx={{ color: m.color, fontWeight: 700, fontSize: '1.75rem' }}>
              {m.value}
            </Typography>
          </Box>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {m.sub}
          </Typography>
        </Box>
      ))}
    </Box>
  )
}
