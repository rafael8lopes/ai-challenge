export type DisputeReasonCategory = 'fraud' | 'service' | 'processing' | 'authorization'

export type DisputeStatus = 'new' | 'in-progress' | 'submitted'

export type Currency = 'USD' | 'MXN' | 'BRL' | 'COP'

export type EvidenceStrength = 'strong' | 'moderate' | 'weak' | 'missing'

export interface CustomerProfile {
  id: string
  name: string
  email: string
  country: string
  accountCreatedAt: string
  totalBookings: number
  completedBookings: number
  priorDisputes: number
}

export interface BookingDetails {
  id: string
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
  type: string
  label: string
  available: boolean
  value?: string
  strength: EvidenceStrength
}

export interface TransactionDetails {
  id: string
  date: string
  amount: number
  currency: Currency
  paymentMethod: string
  processor: string
  authorizationCode: string
  ipAddress: string
  deviceFingerprint: string
  country: string
  avsMatch: boolean
  cvvMatch: boolean
}

export interface Dispute {
  id: string
  transactionId: string
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
  sortBy: 'deadline' | 'amount' | 'filedAt'
  sortOrder: 'asc' | 'desc'
}
