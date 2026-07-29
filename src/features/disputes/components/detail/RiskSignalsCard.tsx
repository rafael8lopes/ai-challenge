import { Box, Typography, Stack } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import type { RiskSignal } from '@/features/disputes/utils/caseAssessment'

interface RiskSignalsCardProps {
  signals: RiskSignal[]
}

export function RiskSignalsCard({ signals }: RiskSignalsCardProps) {
  return (
    <Box component="section" aria-label="Risk signals">
      <Typography
        variant="caption"
        sx={{ color: 'text.secondary', fontWeight: 700, letterSpacing: 0.8, display: 'block', mb: 1.5 }}
      >
        RISK SIGNALS
      </Typography>

      <Stack spacing={1.25}>
        {signals.map((signal) => (
          <Box key={signal.id} sx={{ display: 'flex', gap: 1.25, alignItems: 'flex-start' }}>
            {signal.positive ? (
              <CheckCircleIcon sx={{ fontSize: 18, color: 'success.main', mt: 0.2 }} />
            ) : (
              <ErrorOutlineIcon sx={{ fontSize: 18, color: 'error.main', mt: 0.2 }} />
            )}
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="body2" sx={{ fontWeight: 500, color: signal.positive ? 'text.primary' : 'error.main' }}>
                {signal.label}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {signal.detail}
              </Typography>
            </Box>
          </Box>
        ))}
      </Stack>
    </Box>
  )
}
