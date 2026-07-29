import { Card, CardActionArea, CardContent, Box, Typography, Chip, Stack } from '@mui/material'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import { useNavigate } from 'react-router-dom'
import type { Dispute } from '@/features/disputes/types'
import { formatCurrency, getDaysRemaining, getUrgencyColor, getStatusLabel, getStatusColor, formatDate } from '@/features/disputes/utils/formatters'
import { getReasonCategoryLabel, getReasonCategoryColor } from '@/features/disputes/utils/reasonCodes'

interface DisputeCardProps {
  dispute: Dispute
}

export function DisputeCard({ dispute }: DisputeCardProps) {
  const navigate = useNavigate()
  const daysRemaining = getDaysRemaining(dispute.responseDeadline)
  const urgencyColor = getUrgencyColor(daysRemaining)

  return (
    <Card
      variant="outlined"
      sx={{
        borderLeft: 4,
        borderLeftColor: urgencyColor === 'error' ? 'error.main' : urgencyColor === 'warning' ? 'warning.main' : 'grey.300',
      }}
    >
      <CardActionArea onClick={() => navigate(`/disputes/${dispute.id}`)}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                {dispute.id}
              </Typography>
              <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
                {formatCurrency(dispute.amount, dispute.currency)}
              </Typography>
            </Box>
            <Stack direction="row" spacing={1} alignItems="center">
              <Chip
                label={getReasonCategoryLabel(dispute.reasonCategory)}
                color={getReasonCategoryColor(dispute.reasonCategory)}
                size="small"
                variant="outlined"
              />
              <Chip
                label={getStatusLabel(dispute.status)}
                color={getStatusColor(dispute.status)}
                size="small"
              />
            </Stack>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1.5 }}>
            <Box>
              <Typography variant="body2" color="text.secondary">
                {dispute.paymentMethod} · {dispute.processor}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Transaction: {formatDate(dispute.transactionDate)}
              </Typography>
            </Box>
            <Chip
              icon={<AccessTimeIcon />}
              label={daysRemaining <= 0 ? 'Overdue' : `${daysRemaining}d left`}
              color={urgencyColor}
              size="small"
              variant={urgencyColor === 'default' ? 'outlined' : 'filled'}
            />
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
