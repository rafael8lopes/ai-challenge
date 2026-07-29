import { Box, Typography, Stack } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import type { ChecklistItem } from '@/features/disputes/utils/caseAssessment'
import { sectionLabelSx } from '@/features/disputes/utils/detailStyles'

interface EvidenceChecklistCardProps {
  items: ChecklistItem[]
  earned: number
  total: number
}

export function EvidenceChecklistCard({ items, earned, total }: EvidenceChecklistCardProps) {
  return (
    <Box component="section" aria-label="Evidence checklist">
      <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', mb: 1.5 }}>
        <Typography variant="caption" sx={sectionLabelSx}>
          EVIDENCE CHECKLIST
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
          {earned}/{total} pts
        </Typography>
      </Box>

      <Stack spacing={1.25}>
        {items.map((item) => (
          <Box key={item.id} sx={{ display: 'flex', gap: 1.25, alignItems: 'flex-start' }}>
            {item.met ? (
              <CheckCircleIcon sx={{ fontSize: 18, color: 'success.main', mt: 0.2 }} />
            ) : (
              <WarningAmberIcon sx={{ fontSize: 18, color: 'warning.main', mt: 0.2 }} />
            )}
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="body2" sx={{ fontWeight: 500, color: item.met ? 'text.primary' : 'warning.main' }}>
                {item.label}
              </Typography>
              {item.detail && (
                <Typography variant="caption" color="text.secondary">
                  {item.detail}
                </Typography>
              )}
            </Box>
            <Typography
              variant="caption"
              sx={{ color: item.met ? 'success.main' : 'text.disabled', fontWeight: 600, whiteSpace: 'nowrap' }}
            >
              {item.points}pt
            </Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  )
}
