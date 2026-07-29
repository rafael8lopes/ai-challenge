import { Box, Typography, TableCell, TableRow, Chip, Button } from '@mui/material'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useNavigate } from 'react-router-dom'
import type { Dispute } from '@/features/disputes/types'
import {
  formatCurrency,
  formatUsdEquivalent,
  getDaysRemaining,
  getStatusLabel,
  formatShortDate,
  getPaymentMethodIcon,
  getCountryCode,
} from '@/features/disputes/utils/formatters'
import { getReasonCategoryLabel } from '@/features/disputes/utils/reasonCodes'
import {
  getReasonChipColor,
  getStatusChipStyles,
  getDeadlineColor,
} from '@/features/disputes/utils/disputeTableStyles'

interface DisputeTableRowProps {
  dispute: Dispute
}

export function DisputeTableRow({ dispute }: DisputeTableRowProps) {
  const navigate = useNavigate()
  const daysRemaining = getDaysRemaining(dispute.responseDeadline)
  const deadlineColor = getDeadlineColor(daysRemaining)
  const reasonColor = getReasonChipColor(dispute.reasonCategory)
  const statusStyles = getStatusChipStyles(dispute.status)
  const usdEquiv = formatUsdEquivalent(dispute.amount, dispute.currency)

  function handleNavigate() {
    navigate(`/disputes/${dispute.id}`)
  }

  return (
    <TableRow
      hover
      sx={{
        cursor: 'pointer',
        '&:hover': { bgcolor: '#1c2128' },
        '& td': { borderBottom: '1px solid', borderColor: 'divider' },
      }}
      onClick={handleNavigate}
    >
      <TableCell>
        <Typography variant="caption" sx={{ color: 'text.secondary', fontFamily: 'monospace' }}>
          {dispute.id}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary', lineHeight: 1.3 }}>
          {dispute.customer.name}
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', lineHeight: 1.3 }}>
          {dispute.booking.propertyName}, {dispute.booking.propertyLocation.split(',').pop()?.trim()}
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.65rem' }}>
          {getCountryCode(dispute.customer.country)} · {dispute.processor}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
          {usdEquiv ?? formatCurrency(dispute.amount, dispute.currency)}
        </Typography>
        {usdEquiv && (
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {formatCurrency(dispute.amount, dispute.currency)}
          </Typography>
        )}
      </TableCell>
      <TableCell>
        <Typography variant="body2" sx={{ color: 'text.secondary', whiteSpace: 'nowrap' }}>
          {formatShortDate(dispute.transactionDate)}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          {getPaymentMethodIcon(dispute.paymentMethod)}
        </Typography>
      </TableCell>
      <TableCell>
        <Chip
          label={getReasonCategoryLabel(dispute.reasonCategory)}
          size="small"
          sx={{
            bgcolor: `${reasonColor}20`,
            color: reasonColor,
            border: `1px solid ${reasonColor}50`,
            fontWeight: 600,
            fontSize: '0.7rem',
            height: 24,
          }}
        />
      </TableCell>
      <TableCell>
        <Chip
          label={getStatusLabel(dispute.status)}
          size="small"
          sx={{
            ...statusStyles,
            fontWeight: 600,
            fontSize: '0.7rem',
            height: 24,
          }}
        />
      </TableCell>
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          {daysRemaining <= 5 && (
            <>
              <WarningAmberIcon sx={{ fontSize: 14, color: deadlineColor }} />
              <AccessTimeIcon sx={{ fontSize: 14, color: deadlineColor }} />
            </>
          )}
          <Typography variant="body2" sx={{ fontWeight: 600, color: deadlineColor, whiteSpace: 'nowrap' }}>
            {daysRemaining <= 0 ? 'Overdue' : `${daysRemaining}d left`}
          </Typography>
        </Box>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          {formatShortDate(dispute.responseDeadline)}
        </Typography>
      </TableCell>
      <TableCell>
        <Button
          size="small"
          endIcon={<ArrowForwardIcon sx={{ fontSize: 14 }} />}
          onClick={(e) => {
            e.stopPropagation()
            handleNavigate()
          }}
          sx={{
            textTransform: 'none',
            fontSize: '0.75rem',
            color: 'text.secondary',
            '&:hover': { color: '#5b9cf6' },
          }}
        >
          Review
        </Button>
      </TableCell>
    </TableRow>
  )
}
