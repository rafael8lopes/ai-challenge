import { Box, Typography, LinearProgress } from '@mui/material'
import type { CaseStrength } from '@/features/disputes/utils/caseAssessment'
import { sectionLabelSx } from '@/features/disputes/utils/detailStyles'

interface CaseStrengthCardProps {
  strength: CaseStrength
}

export function CaseStrengthCard({ strength }: CaseStrengthCardProps) {
  return (
    <Box component="section" aria-label="Case strength">
      <Typography
        variant="caption"
        sx={{ ...sectionLabelSx, display: 'block', mb: 1.5 }}
      >
        CASE STRENGTH
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="h3" sx={{ fontWeight: 700, color: `${strength.color}.main`, lineHeight: 1 }}>
          {strength.score}%
        </Typography>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: `${strength.color}.main` }}>
          {strength.label}
        </Typography>
      </Box>

      <LinearProgress
        variant="determinate"
        value={strength.score}
        color={strength.color}
        sx={{ height: 6, borderRadius: 3, mb: 1.5 }}
      />

      <Typography variant="caption" color="text.secondary">
        {strength.summary}
      </Typography>
    </Box>
  )
}
