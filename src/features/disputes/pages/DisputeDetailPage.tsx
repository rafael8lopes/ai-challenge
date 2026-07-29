import { useParams, useNavigate } from 'react-router-dom'
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Button,
  Paper,
  Grid2 as Grid,
  Chip,
  Divider,
  Stack,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import PersonIcon from '@mui/icons-material/Person'
import PaymentIcon from '@mui/icons-material/Payment'
import HomeIcon from '@mui/icons-material/Home'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import WarningIcon from '@mui/icons-material/Warning'
import ErrorIcon from '@mui/icons-material/Error'
import InfoIcon from '@mui/icons-material/Info'
import TimelineIcon from '@mui/icons-material/Timeline'
import ShieldIcon from '@mui/icons-material/Shield'
import { useDisputeDetail } from '@/features/disputes/hooks/useDisputeDetail'
import {
  formatCurrency,
  getDaysRemaining,
  getUrgencyColor,
  getStatusLabel,
  getStatusColor,
  formatDate,
  formatDateTime,
} from '@/features/disputes/utils/formatters'
import {
  getReasonExplanation,
  getReasonCategoryLabel,
  getReasonCategoryColor,
} from '@/features/disputes/utils/reasonCodes'
import type { EvidenceSignal } from '@/features/disputes/types'

function EvidenceStrengthIcon({ strength }: { strength: EvidenceSignal['strength'] }) {
  switch (strength) {
    case 'strong':
      return <CheckCircleIcon color="success" fontSize="small" />
    case 'moderate':
      return <InfoIcon color="info" fontSize="small" />
    case 'weak':
      return <WarningIcon color="warning" fontSize="small" />
    case 'missing':
      return <ErrorIcon color="error" fontSize="small" />
  }
}

export function DisputeDetailPage() {
  const { disputeId } = useParams<{ disputeId: string }>()
  const navigate = useNavigate()
  const { data: dispute, isLoading, error } = useDisputeDetail(disputeId ?? '')

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }} role="status">
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error" role="alert">Failed to load dispute details.</Alert>
      </Box>
    )
  }

  if (!dispute) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="warning">Dispute not found.</Alert>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/')} sx={{ mt: 2 }}>
          Back to list
        </Button>
      </Box>
    )
  }

  const daysRemaining = getDaysRemaining(dispute.responseDeadline)
  const reasonInfo = getReasonExplanation(dispute.reasonCode)

  return (
    <Box component="main" sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/')} sx={{ mb: 2 }}>
          Back to disputes
        </Button>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
              {dispute.id}
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 600, mt: 0.5 }}>
              {formatCurrency(dispute.amount, dispute.currency)}
            </Typography>
          </Box>
          <Stack direction="row" spacing={1} alignItems="center">
            <Chip
              label={getReasonCategoryLabel(dispute.reasonCategory)}
              color={getReasonCategoryColor(dispute.reasonCategory)}
              size="medium"
            />
            <Chip
              label={getStatusLabel(dispute.status)}
              color={getStatusColor(dispute.status)}
              size="medium"
            />
            <Chip
              icon={<AccessTimeIcon />}
              label={daysRemaining <= 0 ? 'Overdue' : `${daysRemaining} days left`}
              color={getUrgencyColor(daysRemaining)}
              size="medium"
              variant={getUrgencyColor(daysRemaining) === 'default' ? 'outlined' : 'filled'}
            />
          </Stack>
        </Box>
      </Box>

      {/* Reason Code Explanation */}
      {reasonInfo && (
        <Paper sx={{ p: 2.5, mb: 3, bgcolor: 'action.hover' }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Reason {reasonInfo.code}: {reasonInfo.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {reasonInfo.explanation}
          </Typography>
        </Paper>
      )}

      <Grid container spacing={3}>
        {/* Left column */}
        <Grid size={{ xs: 12, md: 7 }}>
          {/* Transaction Details */}
          <Paper sx={{ p: 2.5, mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <PaymentIcon color="primary" />
              <Typography variant="h6">Transaction Details</Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid size={{ xs: 6 }}>
                <Typography variant="caption" color="text.secondary">Date & Time</Typography>
                <Typography variant="body2">{formatDateTime(dispute.transaction.date)}</Typography>
              </Grid>
              <Grid size={{ xs: 6 }}>
                <Typography variant="caption" color="text.secondary">Amount</Typography>
                <Typography variant="body2">{formatCurrency(dispute.transaction.amount, dispute.transaction.currency)}</Typography>
              </Grid>
              <Grid size={{ xs: 6 }}>
                <Typography variant="caption" color="text.secondary">Payment Method</Typography>
                <Typography variant="body2">{dispute.transaction.paymentMethod}</Typography>
              </Grid>
              <Grid size={{ xs: 6 }}>
                <Typography variant="caption" color="text.secondary">Processor</Typography>
                <Typography variant="body2">{dispute.transaction.processor}</Typography>
              </Grid>
              <Grid size={{ xs: 6 }}>
                <Typography variant="caption" color="text.secondary">Auth Code</Typography>
                <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>{dispute.transaction.authorizationCode}</Typography>
              </Grid>
              <Grid size={{ xs: 6 }}>
                <Typography variant="caption" color="text.secondary">IP Address</Typography>
                <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>{dispute.transaction.ipAddress}</Typography>
              </Grid>
              <Grid size={{ xs: 6 }}>
                <Typography variant="caption" color="text.secondary">AVS Match</Typography>
                <Chip
                  label={dispute.transaction.avsMatch ? 'Match' : 'Mismatch'}
                  color={dispute.transaction.avsMatch ? 'success' : 'error'}
                  size="small"
                  variant="outlined"
                />
              </Grid>
              <Grid size={{ xs: 6 }}>
                <Typography variant="caption" color="text.secondary">CVV Match</Typography>
                <Chip
                  label={dispute.transaction.cvvMatch ? 'Match' : 'Mismatch'}
                  color={dispute.transaction.cvvMatch ? 'success' : 'error'}
                  size="small"
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </Paper>

          {/* Booking Details */}
          <Paper sx={{ p: 2.5, mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <HomeIcon color="primary" />
              <Typography variant="h6">Booking Details</Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12 }}>
                <Typography variant="caption" color="text.secondary">Property</Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>{dispute.booking.propertyName}</Typography>
                <Typography variant="body2" color="text.secondary">{dispute.booking.propertyLocation}</Typography>
              </Grid>
              <Grid size={{ xs: 6 }}>
                <Typography variant="caption" color="text.secondary">Check-In</Typography>
                <Typography variant="body2">{formatDate(dispute.booking.checkIn)}</Typography>
              </Grid>
              <Grid size={{ xs: 6 }}>
                <Typography variant="caption" color="text.secondary">Check-Out</Typography>
                <Typography variant="body2">{formatDate(dispute.booking.checkOut)}</Typography>
              </Grid>
              <Grid size={{ xs: 6 }}>
                <Typography variant="caption" color="text.secondary">Guests</Typography>
                <Typography variant="body2">{dispute.booking.guestCount}</Typography>
              </Grid>
              <Grid size={{ xs: 6 }}>
                <Typography variant="caption" color="text.secondary">Nights</Typography>
                <Typography variant="body2">{dispute.booking.totalNights}</Typography>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Typography variant="caption" color="text.secondary">Host</Typography>
                <Typography variant="body2">{dispute.booking.hostName} ({dispute.booking.hostEmail})</Typography>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Typography variant="caption" color="text.secondary">Cancellation Policy</Typography>
                <Typography variant="body2">{dispute.booking.cancellationPolicy}</Typography>
              </Grid>
            </Grid>
          </Paper>

          {/* Timeline */}
          <Paper sx={{ p: 2.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <TimelineIcon color="primary" />
              <Typography variant="h6">Event Timeline</Typography>
            </Box>
            <Stack spacing={0}>
              {dispute.timeline.map((event, index) => (
                <Box
                  key={event.id}
                  sx={{
                    display: 'flex',
                    gap: 2,
                    pb: 2,
                    pl: 2,
                    borderLeft: index < dispute.timeline.length - 1 ? '2px solid' : '2px solid transparent',
                    borderColor: index < dispute.timeline.length - 1 ? 'divider' : 'transparent',
                    position: 'relative',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      left: -5,
                      top: 4,
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      bgcolor: event.type === 'dispute_filed' ? 'error.main' : 'primary.main',
                    },
                  }}
                >
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {event.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {event.description}
                    </Typography>
                    <Typography variant="caption" color="text.disabled">
                      {formatDateTime(event.timestamp)}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Stack>
          </Paper>
        </Grid>

        {/* Right column */}
        <Grid size={{ xs: 12, md: 5 }}>
          {/* Customer Profile */}
          <Paper sx={{ p: 2.5, mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <PersonIcon color="primary" />
              <Typography variant="h6">Customer Profile</Typography>
            </Box>
            <Stack spacing={1.5}>
              <Box>
                <Typography variant="caption" color="text.secondary">Name</Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>{dispute.customer.name}</Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">Email</Typography>
                <Typography variant="body2">{dispute.customer.email}</Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">Country</Typography>
                <Typography variant="body2">{dispute.customer.country}</Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">Account Age</Typography>
                <Typography variant="body2">Since {formatDate(dispute.customer.accountCreatedAt)}</Typography>
              </Box>
              <Divider />
              <Box>
                <Typography variant="caption" color="text.secondary">Booking History</Typography>
                <Typography variant="body2">
                  {dispute.customer.completedBookings} of {dispute.customer.totalBookings} bookings completed
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">Prior Disputes</Typography>
                <Chip
                  label={dispute.customer.priorDisputes === 0 ? 'None' : `${dispute.customer.priorDisputes} prior`}
                  color={dispute.customer.priorDisputes === 0 ? 'success' : 'warning'}
                  size="small"
                  variant="outlined"
                />
              </Box>
            </Stack>
          </Paper>

          {/* Evidence Signals */}
          <Card variant="outlined" sx={{ mb: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <ShieldIcon color="primary" />
                <Typography variant="h6">Evidence Signals</Typography>
              </Box>
              <List dense disablePadding>
                {dispute.evidenceSignals.map((signal) => (
                  <ListItem key={signal.id} disablePadding sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <EvidenceStrengthIcon strength={signal.strength} />
                    </ListItemIcon>
                    <ListItemText
                      primary={signal.label}
                      secondary={signal.value}
                      primaryTypographyProps={{ variant: 'body2' }}
                      secondaryTypographyProps={{ variant: 'caption' }}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>

          {/* Reason Intelligence */}
          {reasonInfo && (
            <Paper sx={{ p: 2.5, bgcolor: 'primary.50', border: '1px solid', borderColor: 'primary.100' }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                Recommended Evidence for {reasonInfo.code}
              </Typography>
              <List dense disablePadding>
                {reasonInfo.evidenceGuidance.map((guidance, i) => (
                  <ListItem key={i} disablePadding sx={{ py: 0.3 }}>
                    <ListItemIcon sx={{ minWidth: 24 }}>
                      <Typography variant="body2" color="primary">•</Typography>
                    </ListItemIcon>
                    <ListItemText
                      primary={guidance}
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          )}
        </Grid>
      </Grid>
    </Box>
  )
}
