import { Box, Typography, Stack } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import PriorityHighIcon from '@mui/icons-material/PriorityHigh'
import type { ReasonCodeInfo } from '@/features/disputes/utils/reasonCodes'

interface AnalystGuidanceCardProps {
  reason: ReasonCodeInfo
}

export function AnalystGuidanceCard({ reason }: AnalystGuidanceCardProps) {
  return (
    <Box component="section" aria-label="Analyst guidance">
      <Typography
        variant="caption"
        sx={{ color: 'text.secondary', fontWeight: 700, letterSpacing: 0.8, display: 'block', mb: 1 }}
      >
        ANALYST GUIDANCE · {reason.code}
      </Typography>

      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'error.main', mb: 2 }}>
        {reason.headline}
      </Typography>

      <Typography
        variant="caption"
        sx={{ color: 'text.secondary', fontWeight: 700, letterSpacing: 0.6, display: 'block', mb: 1 }}
      >
        KEY EVIDENCE TO GATHER
      </Typography>
      <Stack spacing={0.75} sx={{ mb: 2 }}>
        {reason.evidenceGuidance.map((item) => (
          <Box key={item} sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
            <CheckIcon sx={{ fontSize: 16, color: 'success.main', mt: 0.2 }} />
            <Typography variant="caption" color="text.secondary">
              {item}
            </Typography>
          </Box>
        ))}
      </Stack>

      <Typography
        variant="caption"
        sx={{ color: 'text.secondary', fontWeight: 700, letterSpacing: 0.6, display: 'block', mb: 1 }}
      >
        WATCH OUT FOR
      </Typography>
      <Stack spacing={0.75}>
        {reason.watchFor.map((item) => (
          <Box key={item} sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
            <PriorityHighIcon sx={{ fontSize: 16, color: 'warning.main', mt: 0.2 }} />
            <Typography variant="caption" color="text.secondary">
              {item}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  )
}
