export type DisputeReasonCategory = 'fraud' | 'service' | 'processing' | 'authorization'

export type DisputeStatus = 'new' | 'in-progress' | 'submitted'

export type Currency = 'USD' | 'MXN' | 'BRL' | 'COP'

export type EvidenceStrength = 'strong' | 'moderate' | 'weak' | 'missing'

export interface CustomerProfile {
  name: string
  email: string
  country: string
  accountCreatedAt: string
  completedBookings: number
  priorDisputes: number
}

export interface BookingDetails {
  propertyName: string
  propertyLocation: string
  checkIn: string
  checkOut: string
  guestCount: number
  totalNights: number
  hostName: string
  hostEmail: string
  cancellationPolicy: string
}

export interface TimelineEvent {
  id: string
  timestamp: string
  type: 'booking_created' | 'payment_authorized' | 'check_in' | 'check_out' | 'dispute_filed' | 'evidence_submitted' | 'communication' | 'cancellation'
  title: string
  description: string
}

export interface EvidenceSignal {
  id: string
  label: string
  value?: string
  strength: EvidenceStrength
}

export interface TransactionDetails {
  date: string
  paymentMethod: string
  processor: string
  authorizationCode: string
  ipAddress: string
  country: string
  avsMatch: boolean
  cvvMatch: boolean
}

export interface Dispute {
  id: string
  amount: number
  currency: Currency
  reasonCode: string
  reasonCategory: DisputeReasonCategory
  status: DisputeStatus
  responseDeadline: string
  filedAt: string
  transactionDate: string
  paymentMethod: string
  processor: string
  customer: CustomerProfile
  booking: BookingDetails
  transaction: TransactionDetails
  timeline: TimelineEvent[]
  evidenceSignals: EvidenceSignal[]
}

export type UrgencyLevel = 'critical' | 'urgent' | 'moderate' | 'normal'

export interface DisputeFilters {
  search?: string
  urgency?: UrgencyLevel
  reasonCategory?: DisputeReasonCategory
  status?: DisputeStatus
  sortBy: 'deadline' | 'amount' | 'filedAt' | 'guest' | 'method' | 'reason' | 'status'
  sortOrder: 'asc' | 'desc'
}
