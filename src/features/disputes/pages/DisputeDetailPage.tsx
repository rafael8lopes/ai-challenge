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
  Stack,
  Link,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { useDisputeDetail } from '@/features/disputes/hooks/useDisputeDetail'
import {
  formatCurrency,
  getDaysRemaining,
  getUrgencyLevel,
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
import {
  getCaseStrength,
  getEvidenceChecklist,
  getEarnedPoints,
  getRiskSignals,
} from '@/features/disputes/utils/caseAssessment'
import { DetailField, DetailSection } from '@/features/disputes/components/detail/DetailField'
import { CaseStrengthCard } from '@/features/disputes/components/detail/CaseStrengthCard'
import { EvidenceChecklistCard } from '@/features/disputes/components/detail/EvidenceChecklistCard'
import { RiskSignalsCard } from '@/features/disputes/components/detail/RiskSignalsCard'
import { AnalystGuidanceCard } from '@/features/disputes/components/detail/AnalystGuidanceCard'
import { sectionLabelSx } from '@/features/disputes/utils/detailStyles'

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
  const urgency = getUrgencyLevel(daysRemaining)
  const reasonInfo = getReasonExplanation(dispute.reasonCode)
  const caseStrength = getCaseStrength(dispute.evidenceSignals)
  const checklist = getEvidenceChecklist(dispute.evidenceSignals)
  const { earned, total } = getEarnedPoints(checklist)
  const riskSignals = getRiskSignals(dispute)
  const deadlineLabel = daysRemaining <= 0 ? 'Overdue' : `${daysRemaining}d until deadline`
  const showDeadlineAlert = urgency === 'critical' || urgency === 'urgent'
  const hasHistory = dispute.customer.completedBookings > 0

  return (
    <Box component="main">
      {/* Action bar */}
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 2,
          bgcolor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider',
          px: 3,
          py: 1.25,
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          flexWrap: 'wrap',
        }}
      >
        <Link
          component="button"
          onClick={() => navigate('/')}
          underline="hover"
          color="text.secondary"
          sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, fontSize: '0.875rem' }}
        >
          <ArrowBackIcon sx={{ fontSize: 16 }} /> All Disputes
        </Link>
        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
          {dispute.id}
        </Typography>
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
          variant="outlined"
        />

        <Box sx={{ flexGrow: 1 }} />

        <Chip
          icon={<AccessTimeIcon />}
          label={deadlineLabel}
          color={getUrgencyColor(daysRemaining)}
          size="small"
          variant={getUrgencyColor(daysRemaining) === 'default' ? 'outlined' : 'filled'}
        />
        <Button variant="outlined" size="small">
          Assign to Me
        </Button>
        <Button variant="contained" color="success" size="small">
          Submit Response
        </Button>
      </Box>

      {/* Deadline alert */}
      {showDeadlineAlert && (
        <Alert severity="error" icon={<AccessTimeIcon />} sx={{ borderRadius: 0 }}>
          <strong>
            Response deadline{' '}
            {daysRemaining <= 0 ? 'has passed' : `in ${daysRemaining} day${daysRemaining === 1 ? '' : 's'}`}.
          </strong>{' '}
          Compile and submit evidence immediately to protect this{' '}
          {formatCurrency(dispute.amount, dispute.currency)} transaction.
        </Alert>
      )}

      <Box sx={{ maxWidth: 1400, mx: 'auto', p: 3 }}>
        <Grid container spacing={3}>
          {/* Left column */}
          <Grid size={{ xs: 12, md: 8 }}>
            {/* Dispute metadata */}
            <DetailSection title="DISPUTE METADATA">
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 5 }}>
                  <Stack spacing={1.5}>
                    <DetailField
                      label="Reason Code"
                      value={reasonInfo ? `${reasonInfo.code} — ${reasonInfo.title}` : dispute.reasonCode}
                    />
                    <DetailField label="Processor" value={dispute.processor} />
                    <DetailField label="Filed" value={formatDate(dispute.filedAt)} />
                    <DetailField
                      label="Deadline"
                      value={`${formatDate(dispute.responseDeadline)} (${daysRemaining <= 0 ? 'overdue' : `${daysRemaining}d`})`}
                      valueColor={urgency === 'critical' ? 'error.main' : undefined}
                    />
                    <DetailField
                      label="Disputed Amount"
                      value={formatCurrency(dispute.amount, dispute.currency)}
                    />
                  </Stack>
                </Grid>
                <Grid size={{ xs: 12, sm: 7 }}>
                  {reasonInfo && (
                    <Box sx={{ bgcolor: 'action.hover', borderRadius: 1, p: 2, height: '100%' }}>
                      <Typography
                        variant="caption"
                        sx={{ ...sectionLabelSx, letterSpacing: 0.6, display: 'block', mb: 1 }}
                      >
                        WHAT THIS MEANS
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {reasonInfo.explanation}
                      </Typography>
                    </Box>
                  )}
                </Grid>
              </Grid>
            </DetailSection>

            {/* Transaction details */}
            <DetailSection title="TRANSACTION DETAILS">
              <Grid container spacing={2.5}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Stack spacing={1.5}>
                    <DetailField label="Transaction Date" value={formatDateTime(dispute.transaction.date)} />
                    <DetailField label="Authorization Code" value={dispute.transaction.authorizationCode} mono />
                    <DetailField label="IP Address" value={dispute.transaction.ipAddress} mono />
                  </Stack>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Stack spacing={1.5}>
                    <DetailField label="Payment Method" value={dispute.transaction.paymentMethod} />
                    <DetailField label="Processor" value={dispute.transaction.processor} />
                    <DetailField
                      label="Verification"
                      value={
                        <Stack direction="row" spacing={1} sx={{ mt: 0.25 }}>
                          <Chip
                            label={`AVS ${dispute.transaction.avsMatch ? 'Match' : 'Mismatch'}`}
                            color={dispute.transaction.avsMatch ? 'success' : 'error'}
                            size="small"
                            variant="outlined"
                          />
                          <Chip
                            label={`CVV ${dispute.transaction.cvvMatch ? 'Match' : 'Mismatch'}`}
                            color={dispute.transaction.cvvMatch ? 'success' : 'error'}
                            size="small"
                            variant="outlined"
                          />
                        </Stack>
                      }
                    />
                  </Stack>
                </Grid>
              </Grid>
            </DetailSection>

            {/* Customer profile */}
            <DetailSection title="CUSTOMER PROFILE">
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Stack spacing={1.5}>
                    <DetailField label="Name" value={dispute.customer.name} />
                    <DetailField label="Email" value={dispute.customer.email} />
                    <DetailField label="Account Country" value={dispute.customer.country} />
                    <DetailField label="Account Created" value={formatDate(dispute.customer.accountCreatedAt)} />
                  </Stack>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box
                    sx={{
                      border: '1px solid',
                      borderColor: hasHistory ? 'success.main' : 'divider',
                      bgcolor: hasHistory ? 'rgba(76, 175, 80, 0.08)' : 'action.hover',
                      borderRadius: 1,
                      p: 2,
                      display: 'flex',
                      gap: 1.25,
                      alignItems: 'flex-start',
                    }}
                  >
                    <CheckCircleIcon
                      sx={{ fontSize: 20, color: hasHistory ? 'success.main' : 'text.disabled', mt: 0.2 }}
                    />
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {dispute.customer.completedBookings} prior booking
                        {dispute.customer.completedBookings === 1 ? '' : 's'}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {hasHistory
                          ? 'All completed successfully — established customer'
                          : 'New customer — no completed stays yet'}
                        {dispute.customer.priorDisputes === 0
                          ? ' · no prior disputes'
                          : ` · ${dispute.customer.priorDisputes} prior dispute(s)`}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </DetailSection>

            {/* Booking evidence */}
            <DetailSection title="BOOKING EVIDENCE">
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Stack spacing={1.5}>
                    <DetailField label="Property" value={dispute.booking.propertyName} />
                    <DetailField label="Location" value={dispute.booking.propertyLocation} />
                    <DetailField label="Check-In" value={formatDate(dispute.booking.checkIn)} />
                    <DetailField label="Check-Out" value={formatDate(dispute.booking.checkOut)} />
                    <DetailField
                      label="Guests / Nights"
                      value={`${dispute.booking.guestCount} guests · ${dispute.booking.totalNights} nights`}
                    />
                  </Stack>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography
                    variant="caption"
                    sx={{ ...sectionLabelSx, letterSpacing: 0.6, display: 'block', mb: 1.5 }}
                  >
                    HOST CONTACT
                  </Typography>
                  <Stack spacing={1.5}>
                    <DetailField label="Host" value={dispute.booking.hostName} />
                    <DetailField label="Email" value={dispute.booking.hostEmail} />
                    <DetailField label="Cancellation Policy" value={dispute.booking.cancellationPolicy} />
                  </Stack>
                  <Box
                    sx={{
                      mt: 2,
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 1,
                      p: 1.5,
                      bgcolor: 'action.hover',
                    }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      Contact the host immediately if check-in/check-out records are incomplete. Host testimony is
                      critical evidence for service disputes.
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </DetailSection>

            {/* Timeline */}
            <DetailSection title="TIMELINE OF EVENTS">
              <Stack spacing={0}>
                {dispute.timeline.map((event, index) => {
                  const isDispute = event.type === 'dispute_filed'
                  const isLast = index === dispute.timeline.length - 1
                  return (
                    <Box
                      key={event.id}
                      sx={{
                        display: 'flex',
                        gap: 2,
                        pb: isLast ? 0 : 2.5,
                        pl: 2,
                        borderLeft: '2px solid',
                        borderColor: isLast ? 'transparent' : 'divider',
                        position: 'relative',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          left: -5,
                          top: 3,
                          width: 10,
                          height: 10,
                          borderRadius: '50%',
                          bgcolor: isDispute ? 'error.main' : 'primary.main',
                        },
                      }}
                    >
                      <Box sx={{ flex: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {event.title}
                          </Typography>
                          {isDispute && (
                            <Chip
                              label="Critical Event"
                              color="error"
                              size="small"
                              sx={{ height: 18, fontSize: '0.65rem' }}
                            />
                          )}
                        </Box>
                        <Typography variant="caption" color="text.disabled" sx={{ display: 'block' }}>
                          {formatDateTime(event.timestamp)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {event.description}
                        </Typography>
                      </Box>
                    </Box>
                  )
                })}
              </Stack>
            </DetailSection>
          </Grid>

          {/* Right column */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ position: { md: 'sticky' }, top: { md: 80 } }}>
              <Stack spacing={2.5}>
                <Paper sx={{ p: 2.5 }}>
                  <CaseStrengthCard strength={caseStrength} />
                </Paper>
                <Paper sx={{ p: 2.5 }}>
                  <EvidenceChecklistCard items={checklist} earned={earned} total={total} />
                </Paper>
                <Paper sx={{ p: 2.5 }}>
                  <RiskSignalsCard signals={riskSignals} />
                </Paper>
                {reasonInfo && (
                  <Paper sx={{ p: 2.5, border: '1px solid', borderColor: 'error.main' }}>
                    <AnalystGuidanceCard reason={reasonInfo} />
                  </Paper>
                )}
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
