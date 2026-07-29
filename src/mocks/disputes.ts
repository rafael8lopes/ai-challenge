import type { Dispute } from '@/features/disputes/types'

export const disputes: Dispute[] = [
  {
    id: 'DSP-001',
    amount: 2450.00,
    currency: 'USD',
    reasonCode: '10.4',
    reasonCategory: 'fraud',
    status: 'new',
    responseDeadline: '2026-07-31',
    filedAt: '2026-07-20',
    transactionDate: '2026-07-05',
    paymentMethod: 'Visa ****4532',
    processor: 'EBANX',
    customer: {
      name: 'Carlos Mendez',
      email: 'carlos.mendez@email.com',
      country: 'Mexico',
      accountCreatedAt: '2025-03-15',
      completedBookings: 4,
      priorDisputes: 0
    },
    booking: {
      propertyName: 'Villa Paraíso',
      propertyLocation: 'Cancún, Mexico',
      checkIn: '2026-07-06',
      checkOut: '2026-07-12',
      guestCount: 4,
      totalNights: 6,
      hostName: 'María García',
      hostEmail: 'maria.garcia@host.com',
      cancellationPolicy: 'Moderate — full refund 5 days before check-in'
    },
    transaction: {
      date: '2026-07-05T14:23:00Z',
      paymentMethod: 'Visa ****4532',
      processor: 'EBANX',
      authorizationCode: 'AUTH-89234',
      ipAddress: '189.203.45.12',
      country: 'Mexico',
      avsMatch: true,
      cvvMatch: true
    },
    timeline: [
      { id: 'TL-001', timestamp: '2026-07-04T10:00:00Z', type: 'booking_created', title: 'Booking Created', description: 'Guest booked Villa Paraíso for 6 nights' },
      { id: 'TL-002', timestamp: '2026-07-05T14:23:00Z', type: 'payment_authorized', title: 'Payment Authorized', description: 'Visa ****4532 charged $2,450.00 via EBANX' },
      { id: 'TL-003', timestamp: '2026-07-06T15:30:00Z', type: 'check_in', title: 'Guest Checked In', description: 'Self check-in confirmed via smart lock' },
      { id: 'TL-004', timestamp: '2026-07-12T11:00:00Z', type: 'check_out', title: 'Guest Checked Out', description: 'Check-out confirmed, no damages reported' },
      { id: 'TL-005', timestamp: '2026-07-20T09:15:00Z', type: 'dispute_filed', title: 'Dispute Filed', description: 'Cardholder claims unauthorized transaction (10.4)' }
    ],
    evidenceSignals: [
      { id: 'ES-001', label: 'IP matches customer profile country', value: 'Mexico (189.203.45.12)', strength: 'strong' },
      { id: 'ES-002', label: 'Known device fingerprint', value: 'Device used in 3 prior bookings', strength: 'strong' },
      { id: 'ES-003', label: 'AVS verification passed', value: 'Full match', strength: 'strong' },
      { id: 'ES-004', label: 'Check-in confirmed', value: 'Smart lock access 2026-07-06', strength: 'strong' },
      { id: 'ES-005', label: 'Prior successful bookings', value: '4 completed without dispute', strength: 'strong' }
    ]
  },
  {
    id: 'DSP-002',
    amount: 890.00,
    currency: 'USD',
    reasonCode: '13.1',
    reasonCategory: 'service',
    status: 'new',
    responseDeadline: '2026-07-30',
    filedAt: '2026-07-18',
    transactionDate: '2026-06-28',
    paymentMethod: 'Mastercard ****8876',
    processor: 'dLocal',
    customer: {
      name: 'James Wilson',
      email: 'j.wilson@outlook.com',
      country: 'United States',
      accountCreatedAt: '2026-06-25',
      completedBookings: 0,
      priorDisputes: 0
    },
    booking: {
      propertyName: 'Beachfront Studio',
      propertyLocation: 'Playa del Carmen, Mexico',
      checkIn: '2026-07-01',
      checkOut: '2026-07-04',
      guestCount: 2,
      totalNights: 3,
      hostName: 'Roberto Sánchez',
      hostEmail: 'roberto.s@host.com',
      cancellationPolicy: 'Strict — 50% refund up to 1 week before'
    },
    transaction: {
      date: '2026-06-28T09:45:00Z',
      paymentMethod: 'Mastercard ****8876',
      processor: 'dLocal',
      authorizationCode: 'AUTH-55123',
      ipAddress: '72.134.90.201',
      country: 'United States',
      avsMatch: true,
      cvvMatch: true
    },
    timeline: [
      { id: 'TL-006', timestamp: '2026-06-25T18:30:00Z', type: 'booking_created', title: 'Booking Created', description: 'Guest booked Beachfront Studio for 3 nights' },
      { id: 'TL-007', timestamp: '2026-06-28T09:45:00Z', type: 'payment_authorized', title: 'Payment Authorized', description: 'Mastercard ****8876 charged $890.00 via dLocal' },
      { id: 'TL-008', timestamp: '2026-07-01T14:00:00Z', type: 'check_in', title: 'Guest Checked In', description: 'Check-in confirmed by host' },
      { id: 'TL-009', timestamp: '2026-07-04T10:30:00Z', type: 'check_out', title: 'Guest Checked Out', description: 'Early check-out, guest complained about noise' },
      { id: 'TL-010', timestamp: '2026-07-18T16:20:00Z', type: 'dispute_filed', title: 'Dispute Filed', description: 'Customer claims services not as described (13.1)' }
    ],
    evidenceSignals: [
      { id: 'ES-006', label: 'Check-in confirmed', value: 'Host confirmed 2026-07-01', strength: 'moderate' },
      { id: 'ES-007', label: 'Post-stay communication', strength: 'missing' },
      { id: 'ES-008', label: 'Cancellation policy accepted', value: 'Accepted at booking', strength: 'moderate' },
      { id: 'ES-009', label: 'Property condition photos', strength: 'missing' },
      { id: 'ES-010', label: 'Prior successful bookings', value: 'New customer, no history', strength: 'weak' }
    ]
  },
  {
    id: 'DSP-003',
    amount: 3200.00,
    currency: 'BRL',
    reasonCode: '10.5',
    reasonCategory: 'fraud',
    status: 'in-progress',
    responseDeadline: '2026-08-05',
    filedAt: '2026-07-22',
    transactionDate: '2026-07-10',
    paymentMethod: 'Visa ****2211',
    processor: 'EBANX',
    customer: {
      name: 'Ana Paula Silva',
      email: 'ana.silva@gmail.com',
      country: 'Brazil',
      accountCreatedAt: '2024-11-02',
      completedBookings: 8,
      priorDisputes: 0
    },
    booking: {
      propertyName: 'Copacabana Penthouse',
      propertyLocation: 'Rio de Janeiro, Brazil',
      checkIn: '2026-07-11',
      checkOut: '2026-07-15',
      guestCount: 2,
      totalNights: 4,
      hostName: 'Fernando Costa',
      hostEmail: 'fernando.costa@host.com',
      cancellationPolicy: 'Flexible — full refund 24h before check-in'
    },
    transaction: {
      date: '2026-07-10T11:30:00Z',
      paymentMethod: 'Visa ****2211',
      processor: 'EBANX',
      authorizationCode: 'AUTH-77890',
      ipAddress: '177.42.88.15',
      country: 'Brazil',
      avsMatch: true,
      cvvMatch: true
    },
    timeline: [
      { id: 'TL-011', timestamp: '2026-07-09T20:00:00Z', type: 'booking_created', title: 'Booking Created', description: 'Guest booked Copacabana Penthouse for 4 nights' },
      { id: 'TL-012', timestamp: '2026-07-10T11:30:00Z', type: 'payment_authorized', title: 'Payment Authorized', description: 'Visa ****2211 charged R$3,200.00 via EBANX' },
      { id: 'TL-013', timestamp: '2026-07-11T14:00:00Z', type: 'check_in', title: 'Guest Checked In', description: 'Check-in via building concierge' },
      { id: 'TL-014', timestamp: '2026-07-15T11:00:00Z', type: 'check_out', title: 'Guest Checked Out', description: 'Normal check-out, no issues' },
      { id: 'TL-015', timestamp: '2026-07-22T08:45:00Z', type: 'dispute_filed', title: 'Dispute Filed', description: 'Cardholder claims counterfeit transaction (10.5)' }
    ],
    evidenceSignals: [
      { id: 'ES-011', label: 'IP matches customer country', value: 'Brazil (177.42.88.15)', strength: 'strong' },
      { id: 'ES-012', label: 'Known device', value: 'Used in 6 prior bookings', strength: 'strong' },
      { id: 'ES-013', label: 'Check-in confirmed', value: 'Concierge record', strength: 'strong' },
      { id: 'ES-014', label: 'Prior bookings', value: '8 completed, 0 disputes', strength: 'strong' },
      { id: 'ES-015', label: 'CVV verified', value: 'Match', strength: 'strong' }
    ]
  },
  {
    id: 'DSP-004',
    amount: 1750.00,
    currency: 'COP',
    reasonCode: '12.1',
    reasonCategory: 'processing',
    status: 'new',
    responseDeadline: '2026-08-02',
    filedAt: '2026-07-23',
    transactionDate: '2026-07-12',
    paymentMethod: 'Visa ****9901',
    processor: 'PaymentEz',
    customer: {
      name: 'Diego Ramírez',
      email: 'diego.ramirez@hotmail.com',
      country: 'Colombia',
      accountCreatedAt: '2025-08-20',
      completedBookings: 3,
      priorDisputes: 0
    },
    booking: {
      propertyName: 'El Peñón Apartment',
      propertyLocation: 'Cartagena, Colombia',
      checkIn: '2026-07-13',
      checkOut: '2026-07-16',
      guestCount: 2,
      totalNights: 3,
      hostName: 'Lucia Herrera',
      hostEmail: 'lucia.h@host.com',
      cancellationPolicy: 'Moderate — full refund 5 days before check-in'
    },
    transaction: {
      date: '2026-07-12T16:10:00Z',
      paymentMethod: 'Visa ****9901',
      processor: 'PaymentEz',
      authorizationCode: 'AUTH-44321',
      ipAddress: '190.25.67.83',
      country: 'Colombia',
      avsMatch: true,
      cvvMatch: true
    },
    timeline: [
      { id: 'TL-016', timestamp: '2026-07-11T22:00:00Z', type: 'booking_created', title: 'Booking Created', description: 'Guest booked El Peñón Apartment for 3 nights' },
      { id: 'TL-017', timestamp: '2026-07-12T16:10:00Z', type: 'payment_authorized', title: 'Payment Authorized', description: 'Visa ****9901 charged COP 1,750,000 via PaymentEz' },
      { id: 'TL-018', timestamp: '2026-07-12T16:10:05Z', type: 'payment_authorized', title: 'Duplicate Charge Attempted', description: 'System timeout caused retry — second auth voided immediately' },
      { id: 'TL-019', timestamp: '2026-07-13T15:00:00Z', type: 'check_in', title: 'Guest Checked In', description: 'Key handoff with host' },
      { id: 'TL-020', timestamp: '2026-07-16T11:00:00Z', type: 'check_out', title: 'Guest Checked Out', description: 'Normal departure' },
      { id: 'TL-021', timestamp: '2026-07-23T10:30:00Z', type: 'dispute_filed', title: 'Dispute Filed', description: 'Customer claims duplicate charge (12.1)' }
    ],
    evidenceSignals: [
      { id: 'ES-016', label: 'Single charge confirmation', value: 'Only 1 settled charge, duplicate voided', strength: 'strong' },
      { id: 'ES-017', label: 'Void/reversal record', value: 'Voided within 5 seconds', strength: 'strong' },
      { id: 'ES-018', label: 'Processor confirmation', value: 'PaymentEz confirms single settlement', strength: 'strong' }
    ]
  },
  {
    id: 'DSP-005',
    amount: 580.00,
    currency: 'MXN',
    reasonCode: '13.3',
    reasonCategory: 'service',
    status: 'in-progress',
    responseDeadline: '2026-08-10',
    filedAt: '2026-07-25',
    transactionDate: '2026-07-01',
    paymentMethod: 'Amex ****3344',
    processor: 'dLocal',
    customer: {
      name: 'Patricia Morales',
      email: 'patricia.m@yahoo.com',
      country: 'Mexico',
      accountCreatedAt: '2025-12-10',
      completedBookings: 2,
      priorDisputes: 1
    },
    booking: {
      propertyName: 'Jungle Retreat Cabin',
      propertyLocation: 'Tulum, Mexico',
      checkIn: '2026-07-02',
      checkOut: '2026-07-05',
      guestCount: 3,
      totalNights: 3,
      hostName: 'Alejandro Vega',
      hostEmail: 'alejandro.v@host.com',
      cancellationPolicy: 'Strict — no refund within 7 days'
    },
    transaction: {
      date: '2026-07-01T08:15:00Z',
      paymentMethod: 'Amex ****3344',
      processor: 'dLocal',
      authorizationCode: 'AUTH-33456',
      ipAddress: '187.190.12.55',
      country: 'Mexico',
      avsMatch: true,
      cvvMatch: false
    },
    timeline: [
      { id: 'TL-022', timestamp: '2026-06-30T19:00:00Z', type: 'booking_created', title: 'Booking Created', description: 'Guest booked Jungle Retreat Cabin for 3 nights' },
      { id: 'TL-023', timestamp: '2026-07-01T08:15:00Z', type: 'payment_authorized', title: 'Payment Authorized', description: 'Amex ****3344 charged MXN 580 via dLocal' },
      { id: 'TL-024', timestamp: '2026-07-02T16:00:00Z', type: 'check_in', title: 'Guest Checked In', description: 'Self check-in with lockbox code' },
      { id: 'TL-025', timestamp: '2026-07-03T09:00:00Z', type: 'communication', title: 'Guest Complaint', description: 'Guest messaged host about broken A/C and insects' },
      { id: 'TL-026', timestamp: '2026-07-05T08:00:00Z', type: 'check_out', title: 'Early Check-Out', description: 'Guest left one day early due to dissatisfaction' },
      { id: 'TL-027', timestamp: '2026-07-25T14:00:00Z', type: 'dispute_filed', title: 'Dispute Filed', description: 'Customer claims property not as described (13.3)' }
    ],
    evidenceSignals: [
      { id: 'ES-019', label: 'Check-in confirmed', value: 'Lockbox accessed 2026-07-02', strength: 'moderate' },
      { id: 'ES-020', label: 'Guest messages', value: 'Complaint about A/C and insects on day 2', strength: 'weak' },
      { id: 'ES-021', label: 'Property listing photos', value: '12 photos, includes A/C unit', strength: 'moderate' },
      { id: 'ES-022', label: 'Host response to complaint', strength: 'missing' },
      { id: 'ES-023', label: 'Customer dispute history', value: '1 prior dispute (lost)', strength: 'weak' }
    ]
  },
  {
    id: 'DSP-006',
    amount: 3500.00,
    currency: 'USD',
    reasonCode: '11.3',
    reasonCategory: 'authorization',
    status: 'new',
    responseDeadline: '2026-08-01',
    filedAt: '2026-07-21',
    transactionDate: '2026-07-08',
    paymentMethod: 'Mastercard ****5567',
    processor: 'EBANX',
    customer: {
      name: 'Robert Chen',
      email: 'r.chen@gmail.com',
      country: 'United States',
      accountCreatedAt: '2026-07-07',
      completedBookings: 1,
      priorDisputes: 0
    },
    booking: {
      propertyName: 'Oceanview Villa',
      propertyLocation: 'Punta Cana, Dominican Republic',
      checkIn: '2026-07-09',
      checkOut: '2026-07-16',
      guestCount: 6,
      totalNights: 7,
      hostName: 'Isabella Torres',
      hostEmail: 'isabella.t@host.com',
      cancellationPolicy: 'Strict — 50% refund up to 1 week before'
    },
    transaction: {
      date: '2026-07-08T20:30:00Z',
      paymentMethod: 'Mastercard ****5567',
      processor: 'EBANX',
      authorizationCode: 'AUTH-99001',
      ipAddress: '45.67.89.123',
      country: 'United States',
      avsMatch: false,
      cvvMatch: true
    },
    timeline: [
      { id: 'TL-028', timestamp: '2026-07-07T23:00:00Z', type: 'booking_created', title: 'Booking Created', description: 'Guest booked Oceanview Villa for 7 nights' },
      { id: 'TL-029', timestamp: '2026-07-08T20:30:00Z', type: 'payment_authorized', title: 'Payment Authorized', description: 'Mastercard ****5567 charged $3,500.00 via EBANX' },
      { id: 'TL-030', timestamp: '2026-07-09T14:00:00Z', type: 'check_in', title: 'Guest Checked In', description: 'Met by property manager on site' },
      { id: 'TL-031', timestamp: '2026-07-16T11:00:00Z', type: 'check_out', title: 'Guest Checked Out', description: 'Normal departure, property in good condition' },
      { id: 'TL-032', timestamp: '2026-07-21T11:00:00Z', type: 'dispute_filed', title: 'Dispute Filed', description: 'Issuer claims no authorization obtained (11.3)' }
    ],
    evidenceSignals: [
      { id: 'ES-024', label: 'Authorization code present', value: 'AUTH-99001', strength: 'strong' },
      { id: 'ES-025', label: 'AVS verification', value: 'Mismatch — billing address differs', strength: 'weak' },
      { id: 'ES-026', label: 'Check-in confirmed', value: 'Property manager confirmed', strength: 'strong' },
      { id: 'ES-027', label: 'Customer history', value: 'New account, no history', strength: 'missing' }
    ]
  },
  {
    id: 'DSP-007',
    amount: 1200.00,
    currency: 'USD',
    reasonCode: '13.2',
    reasonCategory: 'service',
    status: 'submitted',
    responseDeadline: '2026-08-12',
    filedAt: '2026-07-19',
    transactionDate: '2026-06-15',
    paymentMethod: 'Visa ****7788',
    processor: 'dLocal',
    customer: {
      name: 'Sarah Thompson',
      email: 's.thompson@icloud.com',
      country: 'Canada',
      accountCreatedAt: '2025-01-20',
      completedBookings: 5,
      priorDisputes: 0
    },
    booking: {
      propertyName: 'Colonial Suite',
      propertyLocation: 'Havana, Cuba',
      checkIn: '2026-06-20',
      checkOut: '2026-06-25',
      guestCount: 2,
      totalNights: 5,
      hostName: 'Miguel Hernández',
      hostEmail: 'miguel.h@host.com',
      cancellationPolicy: 'Flexible — full refund 24h before check-in'
    },
    transaction: {
      date: '2026-06-15T12:00:00Z',
      paymentMethod: 'Visa ****7788',
      processor: 'dLocal',
      authorizationCode: 'AUTH-22334',
      ipAddress: '99.234.55.12',
      country: 'Canada',
      avsMatch: true,
      cvvMatch: true
    },
    timeline: [
      { id: 'TL-033', timestamp: '2026-06-14T15:00:00Z', type: 'booking_created', title: 'Booking Created', description: 'Guest booked Colonial Suite for 5 nights' },
      { id: 'TL-034', timestamp: '2026-06-15T12:00:00Z', type: 'payment_authorized', title: 'Payment Authorized', description: 'Visa ****7788 charged $1,200.00 via dLocal' },
      { id: 'TL-035', timestamp: '2026-06-18T08:00:00Z', type: 'cancellation', title: 'Booking Cancelled', description: 'Guest cancelled citing travel advisory change' },
      { id: 'TL-036', timestamp: '2026-06-18T08:05:00Z', type: 'communication', title: 'Refund Discussed', description: 'Host agreed to partial refund per policy' },
      { id: 'TL-037', timestamp: '2026-07-19T10:00:00Z', type: 'dispute_filed', title: 'Dispute Filed', description: 'Customer claims cancelled recurring/subscription (13.2)' },
      { id: 'TL-038', timestamp: '2026-07-26T16:00:00Z', type: 'evidence_submitted', title: 'Evidence Submitted', description: 'Cancellation policy and refund records submitted' }
    ],
    evidenceSignals: [
      { id: 'ES-028', label: 'Policy acceptance', value: 'Flexible policy accepted at booking', strength: 'strong' },
      { id: 'ES-029', label: 'Cancellation communication', value: 'Guest initiated cancellation via platform', strength: 'strong' },
      { id: 'ES-030', label: 'Partial refund issued', value: 'Refund of $600 processed 2026-06-19', strength: 'strong' }
    ]
  },
  {
    id: 'DSP-008',
    amount: 450.00,
    currency: 'MXN',
    reasonCode: '10.4',
    reasonCategory: 'fraud',
    status: 'new',
    responseDeadline: '2026-07-30',
    filedAt: '2026-07-16',
    transactionDate: '2026-07-02',
    paymentMethod: 'Visa ****1122',
    processor: 'PaymentEz',
    customer: {
      name: 'Unknown Cardholder',
      email: 'temp_8923@protonmail.com',
      country: 'Unknown',
      accountCreatedAt: '2026-07-01',
      completedBookings: 0,
      priorDisputes: 0
    },
    booking: {
      propertyName: 'Downtown Loft',
      propertyLocation: 'Mexico City, Mexico',
      checkIn: '2026-07-03',
      checkOut: '2026-07-05',
      guestCount: 1,
      totalNights: 2,
      hostName: 'Eduardo López',
      hostEmail: 'eduardo.l@host.com',
      cancellationPolicy: 'Moderate — full refund 5 days before check-in'
    },
    transaction: {
      date: '2026-07-02T03:15:00Z',
      paymentMethod: 'Visa ****1122',
      processor: 'PaymentEz',
      authorizationCode: 'AUTH-66789',
      ipAddress: '45.227.190.44',
      country: 'Panama',
      avsMatch: false,
      cvvMatch: false
    },
    timeline: [
      { id: 'TL-039', timestamp: '2026-07-01T23:50:00Z', type: 'booking_created', title: 'Booking Created', description: 'Account created and booking made within minutes' },
      { id: 'TL-040', timestamp: '2026-07-02T03:15:00Z', type: 'payment_authorized', title: 'Payment Authorized', description: 'Visa ****1122 charged MXN 450 via PaymentEz' },
      { id: 'TL-041', timestamp: '2026-07-03T00:00:00Z', type: 'check_in', title: 'No Check-In Recorded', description: 'Guest never arrived' },
      { id: 'TL-042', timestamp: '2026-07-16T07:30:00Z', type: 'dispute_filed', title: 'Dispute Filed', description: 'Cardholder claims unauthorized (10.4)' }
    ],
    evidenceSignals: [
      { id: 'ES-031', label: 'IP country mismatch', value: 'Panama IP, Mexico card', strength: 'weak' },
      { id: 'ES-032', label: 'Unknown device (VPN)', value: 'VPN detected', strength: 'weak' },
      { id: 'ES-033', label: 'AVS failed', value: 'No match', strength: 'weak' },
      { id: 'ES-034', label: 'CVV failed', value: 'No match', strength: 'weak' },
      { id: 'ES-035', label: 'No check-in', value: 'Guest never arrived', strength: 'missing' }
    ]
  },
  {
    id: 'DSP-009',
    amount: 980.00,
    currency: 'USD',
    reasonCode: '12.2',
    reasonCategory: 'processing',
    status: 'in-progress',
    responseDeadline: '2026-08-08',
    filedAt: '2026-07-24',
    transactionDate: '2026-07-05',
    paymentMethod: 'Mastercard ****4455',
    processor: 'EBANX',
    customer: {
      name: 'Laura Fernández',
      email: 'laura.f@gmail.com',
      country: 'Argentina',
      accountCreatedAt: '2025-05-14',
      completedBookings: 4,
      priorDisputes: 0
    },
    booking: {
      propertyName: 'Mountain Lodge',
      propertyLocation: 'Bariloche, Argentina',
      checkIn: '2026-07-06',
      checkOut: '2026-07-10',
      guestCount: 4,
      totalNights: 4,
      hostName: 'Martín Aguirre',
      hostEmail: 'martin.a@host.com',
      cancellationPolicy: 'Moderate — full refund 5 days before check-in'
    },
    transaction: {
      date: '2026-07-05T17:20:00Z',
      paymentMethod: 'Mastercard ****4455',
      processor: 'EBANX',
      authorizationCode: 'AUTH-11234',
      ipAddress: '181.46.33.90',
      country: 'Argentina',
      avsMatch: true,
      cvvMatch: true
    },
    timeline: [
      { id: 'TL-043', timestamp: '2026-07-04T21:00:00Z', type: 'booking_created', title: 'Booking Created', description: 'Guest booked Mountain Lodge for 4 nights' },
      { id: 'TL-044', timestamp: '2026-07-05T17:20:00Z', type: 'payment_authorized', title: 'Payment Authorized', description: 'Mastercard ****4455 charged $980.00 via EBANX' },
      { id: 'TL-045', timestamp: '2026-07-06T13:00:00Z', type: 'check_in', title: 'Guest Checked In', description: 'Met by host at property' },
      { id: 'TL-046', timestamp: '2026-07-10T10:00:00Z', type: 'check_out', title: 'Guest Checked Out', description: 'Normal check-out' },
      { id: 'TL-047', timestamp: '2026-07-24T09:00:00Z', type: 'dispute_filed', title: 'Dispute Filed', description: 'Customer claims incorrect amount charged (12.2)' }
    ],
    evidenceSignals: [
      { id: 'ES-036', label: 'Correct amount record', value: '$980 matches booking total', strength: 'strong' },
      { id: 'ES-037', label: 'Booking confirmation email', value: 'Sent with $980 total shown', strength: 'strong' },
      { id: 'ES-038', label: 'Itemized pricing', value: '4 nights × $220 + $100 cleaning fee', strength: 'strong' }
    ]
  },
  {
    id: 'DSP-010',
    amount: 1850.00,
    currency: 'BRL',
    reasonCode: '13.1',
    reasonCategory: 'service',
    status: 'new',
    responseDeadline: '2026-08-03',
    filedAt: '2026-07-26',
    transactionDate: '2026-07-10',
    paymentMethod: 'Mastercard ****6677',
    processor: 'EBANX',
    customer: {
      name: 'Ricardo Santos',
      email: 'ricardo.santos@outlook.com',
      country: 'Brazil',
      accountCreatedAt: '2026-01-05',
      completedBookings: 1,
      priorDisputes: 0
    },
    booking: {
      propertyName: 'Ilha Grande Beach House',
      propertyLocation: 'Ilha Grande, Brazil',
      checkIn: '2026-07-12',
      checkOut: '2026-07-17',
      guestCount: 5,
      totalNights: 5,
      hostName: 'Camila Oliveira',
      hostEmail: 'camila.o@host.com',
      cancellationPolicy: 'Strict — no refund within 7 days'
    },
    transaction: {
      date: '2026-07-10T14:45:00Z',
      paymentMethod: 'Mastercard ****6677',
      processor: 'EBANX',
      authorizationCode: 'AUTH-88543',
      ipAddress: '177.71.22.98',
      country: 'Brazil',
      avsMatch: true,
      cvvMatch: true
    },
    timeline: [
      { id: 'TL-048', timestamp: '2026-07-09T19:00:00Z', type: 'booking_created', title: 'Booking Created', description: 'Guest booked Ilha Grande Beach House for 5 nights' },
      { id: 'TL-049', timestamp: '2026-07-10T14:45:00Z', type: 'payment_authorized', title: 'Payment Authorized', description: 'Mastercard ****6677 charged R$1,850.00 via EBANX' },
      { id: 'TL-050', timestamp: '2026-07-12T00:00:00Z', type: 'check_in', title: 'No Check-In Recorded', description: 'Ferry cancelled due to weather — guest could not reach island' },
      { id: 'TL-051', timestamp: '2026-07-12T10:00:00Z', type: 'communication', title: 'Guest Contacted Host', description: 'Requested refund due to inability to access property' },
      { id: 'TL-052', timestamp: '2026-07-12T18:00:00Z', type: 'communication', title: 'Host Response', description: 'Declined refund citing strict cancellation policy' },
      { id: 'TL-053', timestamp: '2026-07-26T08:00:00Z', type: 'dispute_filed', title: 'Dispute Filed', description: 'Customer claims services not received (13.1)' }
    ],
    evidenceSignals: [
      { id: 'ES-039', label: 'Check-in confirmation', value: 'Guest never accessed property', strength: 'missing' },
      { id: 'ES-040', label: 'Communication record', value: 'Guest reported access issue same day', strength: 'weak' },
      { id: 'ES-041', label: 'Strict policy accepted', value: 'Accepted at booking time', strength: 'moderate' },
      { id: 'ES-042', label: 'Weather/ferry records', strength: 'missing' }
    ]
  },
  {
    id: 'DSP-011',
    amount: 2100.00,
    currency: 'USD',
    reasonCode: '10.4',
    reasonCategory: 'fraud',
    status: 'submitted',
    responseDeadline: '2026-08-15',
    filedAt: '2026-07-20',
    transactionDate: '2026-07-01',
    paymentMethod: 'Visa ****3399',
    processor: 'dLocal',
    customer: {
      name: 'Michael Brown',
      email: 'mbrown@email.com',
      country: 'United States',
      accountCreatedAt: '2024-06-10',
      completedBookings: 12,
      priorDisputes: 0
    },
    booking: {
      propertyName: 'Sunset Terrace',
      propertyLocation: 'San Juan, Puerto Rico',
      checkIn: '2026-07-02',
      checkOut: '2026-07-07',
      guestCount: 2,
      totalNights: 5,
      hostName: 'Carmen Rivera',
      hostEmail: 'carmen.r@host.com',
      cancellationPolicy: 'Flexible — full refund 24h before check-in'
    },
    transaction: {
      date: '2026-07-01T15:30:00Z',
      paymentMethod: 'Visa ****3399',
      processor: 'dLocal',
      authorizationCode: 'AUTH-77654',
      ipAddress: '72.45.123.88',
      country: 'United States',
      avsMatch: true,
      cvvMatch: true
    },
    timeline: [
      { id: 'TL-054', timestamp: '2026-06-30T20:00:00Z', type: 'booking_created', title: 'Booking Created', description: 'Guest booked Sunset Terrace for 5 nights' },
      { id: 'TL-055', timestamp: '2026-07-01T15:30:00Z', type: 'payment_authorized', title: 'Payment Authorized', description: 'Visa ****3399 charged $2,100.00 via dLocal' },
      { id: 'TL-056', timestamp: '2026-07-02T15:00:00Z', type: 'check_in', title: 'Guest Checked In', description: 'Digital key access confirmed' },
      { id: 'TL-057', timestamp: '2026-07-07T11:00:00Z', type: 'check_out', title: 'Guest Checked Out', description: 'Normal departure' },
      { id: 'TL-058', timestamp: '2026-07-20T12:00:00Z', type: 'dispute_filed', title: 'Dispute Filed', description: 'Cardholder claims unauthorized (10.4)' },
      { id: 'TL-059', timestamp: '2026-07-28T09:00:00Z', type: 'evidence_submitted', title: 'Evidence Submitted', description: 'Full evidence package with check-in records and prior history' }
    ],
    evidenceSignals: [
      { id: 'ES-043', label: 'IP matches profile', value: 'US IP, US card', strength: 'strong' },
      { id: 'ES-044', label: 'Known device', value: 'Used in 10 prior bookings', strength: 'strong' },
      { id: 'ES-045', label: 'Check-in confirmed', value: 'Digital key access log', strength: 'strong' },
      { id: 'ES-046', label: 'Extensive history', value: '12 bookings, 0 disputes', strength: 'strong' },
      { id: 'ES-047', label: 'AVS verified', value: 'Full match', strength: 'strong' }
    ]
  },
  {
    id: 'DSP-012',
    amount: 320.00,
    currency: 'COP',
    reasonCode: '11.1',
    reasonCategory: 'authorization',
    status: 'new',
    responseDeadline: '2026-08-04',
    filedAt: '2026-07-25',
    transactionDate: '2026-07-14',
    paymentMethod: 'Visa ****8800',
    processor: 'PaymentEz',
    customer: {
      name: 'Valentina Ospina',
      email: 'val.ospina@gmail.com',
      country: 'Colombia',
      accountCreatedAt: '2025-09-30',
      completedBookings: 3,
      priorDisputes: 0
    },
    booking: {
      propertyName: 'Coffee Country Finca',
      propertyLocation: 'Salento, Colombia',
      checkIn: '2026-07-15',
      checkOut: '2026-07-18',
      guestCount: 2,
      totalNights: 3,
      hostName: 'Andrés Mejía',
      hostEmail: 'andres.m@host.com',
      cancellationPolicy: 'Flexible — full refund 24h before check-in'
    },
    transaction: {
      date: '2026-07-14T10:00:00Z',
      paymentMethod: 'Visa ****8800',
      processor: 'PaymentEz',
      authorizationCode: 'AUTH-55678',
      ipAddress: '190.25.110.45',
      country: 'Colombia',
      avsMatch: true,
      cvvMatch: true
    },
    timeline: [
      { id: 'TL-060', timestamp: '2026-07-13T18:00:00Z', type: 'booking_created', title: 'Booking Created', description: 'Guest booked Coffee Country Finca for 3 nights' },
      { id: 'TL-061', timestamp: '2026-07-14T10:00:00Z', type: 'payment_authorized', title: 'Payment Authorized', description: 'Visa ****8800 charged COP 320,000 via PaymentEz' },
      { id: 'TL-062', timestamp: '2026-07-15T14:30:00Z', type: 'check_in', title: 'Guest Checked In', description: 'Host greeted guests personally' },
      { id: 'TL-063', timestamp: '2026-07-18T10:00:00Z', type: 'check_out', title: 'Guest Checked Out', description: 'Left positive review' },
      { id: 'TL-064', timestamp: '2026-07-25T13:00:00Z', type: 'dispute_filed', title: 'Dispute Filed', description: 'Card recovery bulletin — issuer flagged card (11.1)' }
    ],
    evidenceSignals: [
      { id: 'ES-048', label: 'Valid authorization', value: 'AUTH-55678 approved', strength: 'strong' },
      { id: 'ES-049', label: 'Service delivered', value: 'Check-in confirmed by host', strength: 'strong' },
      { id: 'ES-050', label: 'Customer history', value: '3 prior bookings, no issues', strength: 'strong' }
    ]
  },
  {
    id: 'DSP-013',
    amount: 1100.00,
    currency: 'USD',
    reasonCode: '13.1',
    reasonCategory: 'service',
    status: 'new',
    responseDeadline: '2026-07-31',
    filedAt: '2026-07-17',
    transactionDate: '2026-06-25',
    paymentMethod: 'Visa ****2244',
    processor: 'dLocal',
    customer: {
      name: 'Emily Johnson',
      email: 'emily.j@gmail.com',
      country: 'United States',
      accountCreatedAt: '2025-11-01',
      completedBookings: 1,
      priorDisputes: 0
    },
    booking: {
      propertyName: 'Historic Center Apartment',
      propertyLocation: 'Bogotá, Colombia',
      checkIn: '2026-06-28',
      checkOut: '2026-07-02',
      guestCount: 1,
      totalNights: 4,
      hostName: 'Sofia Castillo',
      hostEmail: 'sofia.c@host.com',
      cancellationPolicy: 'Moderate — full refund 5 days before check-in'
    },
    transaction: {
      date: '2026-06-25T11:00:00Z',
      paymentMethod: 'Visa ****2244',
      processor: 'dLocal',
      authorizationCode: 'AUTH-99876',
      ipAddress: '68.45.90.123',
      country: 'United States',
      avsMatch: true,
      cvvMatch: true
    },
    timeline: [
      { id: 'TL-065', timestamp: '2026-06-24T20:00:00Z', type: 'booking_created', title: 'Booking Created', description: 'Guest booked Historic Center Apartment for 4 nights' },
      { id: 'TL-066', timestamp: '2026-06-25T11:00:00Z', type: 'payment_authorized', title: 'Payment Authorized', description: 'Visa ****2244 charged $1,100.00 via dLocal' },
      { id: 'TL-067', timestamp: '2026-06-28T16:00:00Z', type: 'check_in', title: 'Guest Checked In', description: 'Key pickup from building security' },
      { id: 'TL-068', timestamp: '2026-07-02T09:00:00Z', type: 'check_out', title: 'Guest Checked Out', description: 'Normal check-out' },
      { id: 'TL-069', timestamp: '2026-07-17T14:30:00Z', type: 'dispute_filed', title: 'Dispute Filed', description: 'Customer claims services not received (13.1)' }
    ],
    evidenceSignals: [
      { id: 'ES-051', label: 'Check-in confirmed', value: 'Security desk record', strength: 'strong' },
      { id: 'ES-052', label: 'Stay communication', value: 'Guest messaged host about restaurant recommendations', strength: 'strong' },
      { id: 'ES-053', label: 'Check-out record', value: 'Key returned to security', strength: 'strong' },
      { id: 'ES-054', label: 'Post-stay photos', strength: 'missing' }
    ]
  },
  {
    id: 'DSP-014',
    amount: 750.00,
    currency: 'BRL',
    reasonCode: '10.4',
    reasonCategory: 'fraud',
    status: 'new',
    responseDeadline: '2026-08-06',
    filedAt: '2026-07-27',
    transactionDate: '2026-07-15',
    paymentMethod: 'Mastercard ****9911',
    processor: 'EBANX',
    customer: {
      name: 'Pedro Almeida',
      email: 'pedro.almeida@email.com.br',
      country: 'Brazil',
      accountCreatedAt: '2026-07-14',
      completedBookings: 0,
      priorDisputes: 0
    },
    booking: {
      propertyName: 'São Paulo Studio',
      propertyLocation: 'São Paulo, Brazil',
      checkIn: '2026-07-16',
      checkOut: '2026-07-18',
      guestCount: 1,
      totalNights: 2,
      hostName: 'Juliana Costa',
      hostEmail: 'juliana.c@host.com',
      cancellationPolicy: 'Flexible — full refund 24h before check-in'
    },
    transaction: {
      date: '2026-07-15T22:45:00Z',
      paymentMethod: 'Mastercard ****9911',
      processor: 'EBANX',
      authorizationCode: 'AUTH-33210',
      ipAddress: '45.170.88.200',
      country: 'Venezuela',
      avsMatch: false,
      cvvMatch: true
    },
    timeline: [
      { id: 'TL-070', timestamp: '2026-07-14T23:30:00Z', type: 'booking_created', title: 'Booking Created', description: 'New account created and booked same session' },
      { id: 'TL-071', timestamp: '2026-07-15T22:45:00Z', type: 'payment_authorized', title: 'Payment Authorized', description: 'Mastercard ****9911 charged R$750.00 via EBANX' },
      { id: 'TL-072', timestamp: '2026-07-16T00:00:00Z', type: 'check_in', title: 'No Check-In', description: 'No access recorded' },
      { id: 'TL-073', timestamp: '2026-07-27T07:00:00Z', type: 'dispute_filed', title: 'Dispute Filed', description: 'Cardholder claims unauthorized (10.4)' }
    ],
    evidenceSignals: [
      { id: 'ES-055', label: 'IP country mismatch', value: 'Venezuela IP, Brazil card', strength: 'weak' },
      { id: 'ES-056', label: 'Suspicious device', value: 'Never seen before', strength: 'weak' },
      { id: 'ES-057', label: 'AVS mismatch', value: 'Address does not match', strength: 'weak' },
      { id: 'ES-058', label: 'No delivery', value: 'No check-in recorded', strength: 'missing' },
      { id: 'ES-059', label: 'New account', value: 'Created 1 day before booking', strength: 'weak' }
    ]
  },
  {
    id: 'DSP-015',
    amount: 2800.00,
    currency: 'USD',
    reasonCode: '13.3',
    reasonCategory: 'service',
    status: 'in-progress',
    responseDeadline: '2026-08-09',
    filedAt: '2026-07-23',
    transactionDate: '2026-07-01',
    paymentMethod: 'Amex ****7766',
    processor: 'dLocal',
    customer: {
      name: 'David Martinez',
      email: 'd.martinez@business.com',
      country: 'United States',
      accountCreatedAt: '2024-03-15',
      completedBookings: 9,
      priorDisputes: 0
    },
    booking: {
      propertyName: 'Luxury Penthouse',
      propertyLocation: 'Panama City, Panama',
      checkIn: '2026-07-03',
      checkOut: '2026-07-10',
      guestCount: 4,
      totalNights: 7,
      hostName: 'Carlos Mendoza',
      hostEmail: 'carlos.mendoza@host.com',
      cancellationPolicy: 'Strict — 50% refund up to 1 week before'
    },
    transaction: {
      date: '2026-07-01T09:00:00Z',
      paymentMethod: 'Amex ****7766',
      processor: 'dLocal',
      authorizationCode: 'AUTH-44556',
      ipAddress: '73.22.145.90',
      country: 'United States',
      avsMatch: true,
      cvvMatch: true
    },
    timeline: [
      { id: 'TL-074', timestamp: '2026-06-29T14:00:00Z', type: 'booking_created', title: 'Booking Created', description: 'Guest booked Luxury Penthouse for 7 nights' },
      { id: 'TL-075', timestamp: '2026-07-01T09:00:00Z', type: 'payment_authorized', title: 'Payment Authorized', description: 'Amex ****7766 charged $2,800.00 via dLocal' },
      { id: 'TL-076', timestamp: '2026-07-03T16:00:00Z', type: 'check_in', title: 'Guest Checked In', description: 'Concierge-assisted check-in' },
      { id: 'TL-077', timestamp: '2026-07-04T10:00:00Z', type: 'communication', title: 'Guest Complaint', description: 'Pool maintenance ongoing, not available as advertised' },
      { id: 'TL-078', timestamp: '2026-07-05T08:00:00Z', type: 'communication', title: 'Host Apology', description: 'Host offered 1-night refund compensation' },
      { id: 'TL-079', timestamp: '2026-07-10T11:00:00Z', type: 'check_out', title: 'Guest Checked Out', description: 'Completed stay despite complaint' },
      { id: 'TL-080', timestamp: '2026-07-23T10:00:00Z', type: 'dispute_filed', title: 'Dispute Filed', description: 'Customer claims property not as described (13.3)' }
    ],
    evidenceSignals: [
      { id: 'ES-060', label: 'Check-in confirmed', value: 'Concierge-assisted', strength: 'strong' },
      { id: 'ES-061', label: 'Complaint & resolution', value: 'Host offered partial refund', strength: 'moderate' },
      { id: 'ES-062', label: 'Guest completed full stay', value: '7 of 7 nights used', strength: 'strong' },
      { id: 'ES-063', label: 'Loyal customer', value: '9 prior bookings', strength: 'strong' },
      { id: 'ES-064', label: 'Compensation offered', value: '1-night refund ($400)', strength: 'moderate' }
    ]
  },
  {
    id: 'DSP-016',
    amount: 180.00,
    currency: 'MXN',
    reasonCode: '12.1',
    reasonCategory: 'processing',
    status: 'submitted',
    responseDeadline: '2026-08-14',
    filedAt: '2026-07-21',
    transactionDate: '2026-07-08',
    paymentMethod: 'Visa ****5500',
    processor: 'PaymentEz',
    customer: {
      name: 'Gabriela Ruiz',
      email: 'gabi.ruiz@hotmail.com',
      country: 'Mexico',
      accountCreatedAt: '2025-06-15',
      completedBookings: 4,
      priorDisputes: 0
    },
    booking: {
      propertyName: 'Centro Histórico Room',
      propertyLocation: 'Oaxaca, Mexico',
      checkIn: '2026-07-09',
      checkOut: '2026-07-11',
      guestCount: 1,
      totalNights: 2,
      hostName: 'Rosa Mendoza',
      hostEmail: 'rosa.m@host.com',
      cancellationPolicy: 'Flexible — full refund 24h before check-in'
    },
    transaction: {
      date: '2026-07-08T19:30:00Z',
      paymentMethod: 'Visa ****5500',
      processor: 'PaymentEz',
      authorizationCode: 'AUTH-12321',
      ipAddress: '187.152.44.67',
      country: 'Mexico',
      avsMatch: true,
      cvvMatch: true
    },
    timeline: [
      { id: 'TL-081', timestamp: '2026-07-07T21:00:00Z', type: 'booking_created', title: 'Booking Created', description: 'Guest booked Centro Histórico Room for 2 nights' },
      { id: 'TL-082', timestamp: '2026-07-08T19:30:00Z', type: 'payment_authorized', title: 'Payment Authorized', description: 'Visa ****5500 charged MXN 180 via PaymentEz' },
      { id: 'TL-083', timestamp: '2026-07-08T19:30:02Z', type: 'payment_authorized', title: 'Duplicate Auth', description: 'Network glitch caused second authorization — immediately reversed' },
      { id: 'TL-084', timestamp: '2026-07-09T14:00:00Z', type: 'check_in', title: 'Guest Checked In', description: 'Host met guest at property' },
      { id: 'TL-085', timestamp: '2026-07-11T10:00:00Z', type: 'check_out', title: 'Guest Checked Out', description: 'Normal departure' },
      { id: 'TL-086', timestamp: '2026-07-21T09:00:00Z', type: 'dispute_filed', title: 'Dispute Filed', description: 'Customer sees duplicate charge (12.1)' },
      { id: 'TL-087', timestamp: '2026-07-27T14:00:00Z', type: 'evidence_submitted', title: 'Evidence Submitted', description: 'Transaction logs and void record submitted' }
    ],
    evidenceSignals: [
      { id: 'ES-065', label: 'Single settlement', value: 'One charge settled, one voided', strength: 'strong' },
      { id: 'ES-066', label: 'Immediate void', value: 'Second charge voided in 2 seconds', strength: 'strong' },
      { id: 'ES-067', label: 'PaymentEz confirmation', value: 'Confirms single net charge', strength: 'strong' }
    ]
  },
  {
    id: 'DSP-017',
    amount: 1450.00,
    currency: 'USD',
    reasonCode: '10.4',
    reasonCategory: 'fraud',
    status: 'new',
    responseDeadline: '2026-08-07',
    filedAt: '2026-07-28',
    transactionDate: '2026-07-18',
    paymentMethod: 'Mastercard ****2233',
    processor: 'EBANX',
    customer: {
      name: 'Thomas Anderson',
      email: 'thomas.a@protonmail.com',
      country: 'United Kingdom',
      accountCreatedAt: '2026-07-17',
      completedBookings: 1,
      priorDisputes: 0
    },
    booking: {
      propertyName: 'Boutique Hotel Suite',
      propertyLocation: 'Medellín, Colombia',
      checkIn: '2026-07-19',
      checkOut: '2026-07-23',
      guestCount: 2,
      totalNights: 4,
      hostName: 'Juan Pablo García',
      hostEmail: 'jp.garcia@host.com',
      cancellationPolicy: 'Moderate — full refund 5 days before check-in'
    },
    transaction: {
      date: '2026-07-18T01:30:00Z',
      paymentMethod: 'Mastercard ****2233',
      processor: 'EBANX',
      authorizationCode: 'AUTH-88990',
      ipAddress: '185.220.101.45',
      country: 'Germany',
      avsMatch: false,
      cvvMatch: true
    },
    timeline: [
      { id: 'TL-088', timestamp: '2026-07-17T23:45:00Z', type: 'booking_created', title: 'Booking Created', description: 'New account, booked Boutique Hotel Suite' },
      { id: 'TL-089', timestamp: '2026-07-18T01:30:00Z', type: 'payment_authorized', title: 'Payment Authorized', description: 'Mastercard ****2233 charged $1,450.00 via EBANX' },
      { id: 'TL-090', timestamp: '2026-07-19T15:00:00Z', type: 'check_in', title: 'Guest Checked In', description: 'Check-in via hotel reception' },
      { id: 'TL-091', timestamp: '2026-07-23T11:00:00Z', type: 'check_out', title: 'Guest Checked Out', description: 'Normal check-out' },
      { id: 'TL-092', timestamp: '2026-07-28T06:00:00Z', type: 'dispute_filed', title: 'Dispute Filed', description: 'Cardholder claims unauthorized (10.4)' }
    ],
    evidenceSignals: [
      { id: 'ES-068', label: 'IP location suspicious', value: 'Germany (Tor exit node), UK card', strength: 'weak' },
      { id: 'ES-069', label: 'Tor browser detected', value: 'Known Tor exit node IP', strength: 'weak' },
      { id: 'ES-070', label: 'AVS mismatch', value: 'Address mismatch', strength: 'weak' },
      { id: 'ES-071', label: 'Hotel check-in record', value: 'Reception confirmed guest', strength: 'moderate' },
      { id: 'ES-072', label: 'No history', value: 'Brand new account', strength: 'missing' }
    ]
  },
  {
    id: 'DSP-018',
    amount: 620.00,
    currency: 'COP',
    reasonCode: '13.2',
    reasonCategory: 'service',
    status: 'new',
    responseDeadline: '2026-08-11',
    filedAt: '2026-07-28',
    transactionDate: '2026-07-05',
    paymentMethod: 'Visa ****4466',
    processor: 'PaymentEz',
    customer: {
      name: 'Natalia Vargas',
      email: 'natalia.v@outlook.com',
      country: 'Colombia',
      accountCreatedAt: '2025-04-20',
      completedBookings: 4,
      priorDisputes: 0
    },
    booking: {
      propertyName: 'Lakeside Cabin',
      propertyLocation: 'Guatapé, Colombia',
      checkIn: '2026-07-07',
      checkOut: '2026-07-10',
      guestCount: 3,
      totalNights: 3,
      hostName: 'Felipe Ríos',
      hostEmail: 'felipe.r@host.com',
      cancellationPolicy: 'Moderate — full refund 5 days before check-in'
    },
    transaction: {
      date: '2026-07-05T13:20:00Z',
      paymentMethod: 'Visa ****4466',
      processor: 'PaymentEz',
      authorizationCode: 'AUTH-77123',
      ipAddress: '190.25.88.12',
      country: 'Colombia',
      avsMatch: true,
      cvvMatch: true
    },
    timeline: [
      { id: 'TL-093', timestamp: '2026-07-04T20:00:00Z', type: 'booking_created', title: 'Booking Created', description: 'Guest booked Lakeside Cabin for 3 nights' },
      { id: 'TL-094', timestamp: '2026-07-05T13:20:00Z', type: 'payment_authorized', title: 'Payment Authorized', description: 'Visa ****4466 charged COP 620,000 via PaymentEz' },
      { id: 'TL-095', timestamp: '2026-07-06T08:00:00Z', type: 'cancellation', title: 'Booking Cancelled', description: 'Guest cancelled 1 day before check-in' },
      { id: 'TL-096', timestamp: '2026-07-06T08:05:00Z', type: 'communication', title: 'Refund Request', description: 'Guest requested full refund, host declined per policy' },
      { id: 'TL-097', timestamp: '2026-07-28T11:00:00Z', type: 'dispute_filed', title: 'Dispute Filed', description: 'Customer claims cancelled recurring charge (13.2)' }
    ],
    evidenceSignals: [
      { id: 'ES-073', label: 'Policy accepted', value: 'Moderate policy — cancelled within 5-day window', strength: 'strong' },
      { id: 'ES-074', label: 'Cancellation within policy', value: 'Cancelled 1 day before, no refund per policy', strength: 'strong' },
      { id: 'ES-075', label: 'Guest acknowledged policy', value: 'Guest messaged requesting exception', strength: 'moderate' },
      { id: 'ES-076', label: 'Not recurring', value: 'One-time booking charge', strength: 'strong' }
    ]
  },
  {
    id: 'DSP-019',
    amount: 95.00,
    currency: 'USD',
    reasonCode: '10.4',
    reasonCategory: 'fraud',
    status: 'submitted',
    responseDeadline: '2026-08-13',
    filedAt: '2026-07-22',
    transactionDate: '2026-07-10',
    paymentMethod: 'Visa ****1199',
    processor: 'dLocal',
    customer: {
      name: 'Jennifer Lee',
      email: 'jennifer.lee@gmail.com',
      country: 'United States',
      accountCreatedAt: '2023-08-01',
      completedBookings: 15,
      priorDisputes: 0
    },
    booking: {
      propertyName: 'Budget Hostel Bed',
      propertyLocation: 'Lima, Peru',
      checkIn: '2026-07-11',
      checkOut: '2026-07-12',
      guestCount: 1,
      totalNights: 1,
      hostName: 'Marco Flores',
      hostEmail: 'marco.f@host.com',
      cancellationPolicy: 'Flexible — full refund 24h before check-in'
    },
    transaction: {
      date: '2026-07-10T16:00:00Z',
      paymentMethod: 'Visa ****1199',
      processor: 'dLocal',
      authorizationCode: 'AUTH-55443',
      ipAddress: '73.88.12.45',
      country: 'United States',
      avsMatch: true,
      cvvMatch: true
    },
    timeline: [
      { id: 'TL-098', timestamp: '2026-07-10T15:30:00Z', type: 'booking_created', title: 'Booking Created', description: 'Guest booked Budget Hostel Bed for 1 night' },
      { id: 'TL-099', timestamp: '2026-07-10T16:00:00Z', type: 'payment_authorized', title: 'Payment Authorized', description: 'Visa ****1199 charged $95.00 via dLocal' },
      { id: 'TL-100', timestamp: '2026-07-11T20:00:00Z', type: 'check_in', title: 'Guest Checked In', description: 'Hostel reception check-in' },
      { id: 'TL-101', timestamp: '2026-07-12T08:00:00Z', type: 'check_out', title: 'Guest Checked Out', description: 'Normal departure' },
      { id: 'TL-102', timestamp: '2026-07-22T09:30:00Z', type: 'dispute_filed', title: 'Dispute Filed', description: 'Cardholder claims unauthorized (10.4)' },
      { id: 'TL-103', timestamp: '2026-07-29T10:00:00Z', type: 'evidence_submitted', title: 'Evidence Submitted', description: 'Comprehensive evidence with 15-booking history' }
    ],
    evidenceSignals: [
      { id: 'ES-077', label: 'IP matches profile', value: 'US IP, US card', strength: 'strong' },
      { id: 'ES-078', label: 'Known device', value: 'Same iPhone used for 2+ years', strength: 'strong' },
      { id: 'ES-079', label: 'Extensive history', value: '15 bookings, 0 disputes, 3-year customer', strength: 'strong' },
      { id: 'ES-080', label: 'Hostel check-in', value: 'Reception record with ID verification', strength: 'strong' }
    ]
  },
  {
    id: 'DSP-020',
    amount: 1680.00,
    currency: 'MXN',
    reasonCode: '11.3',
    reasonCategory: 'authorization',
    status: 'new',
    responseDeadline: '2026-08-02',
    filedAt: '2026-07-26',
    transactionDate: '2026-07-15',
    paymentMethod: 'Visa ****6688',
    processor: 'EBANX',
    customer: {
      name: 'Alejandra Gutiérrez',
      email: 'alejandra.g@yahoo.com',
      country: 'Mexico',
      accountCreatedAt: '2025-07-01',
      completedBookings: 3,
      priorDisputes: 0
    },
    booking: {
      propertyName: 'Riviera Maya Condo',
      propertyLocation: 'Playa del Carmen, Mexico',
      checkIn: '2026-07-16',
      checkOut: '2026-07-20',
      guestCount: 3,
      totalNights: 4,
      hostName: 'Raúl Domínguez',
      hostEmail: 'raul.d@host.com',
      cancellationPolicy: 'Moderate — full refund 5 days before check-in'
    },
    transaction: {
      date: '2026-07-15T10:00:00Z',
      paymentMethod: 'Visa ****6688',
      processor: 'EBANX',
      authorizationCode: 'AUTH-44332',
      ipAddress: '189.203.100.77',
      country: 'Mexico',
      avsMatch: true,
      cvvMatch: true
    },
    timeline: [
      { id: 'TL-104', timestamp: '2026-07-14T19:00:00Z', type: 'booking_created', title: 'Booking Created', description: 'Guest booked Riviera Maya Condo for 4 nights' },
      { id: 'TL-105', timestamp: '2026-07-15T10:00:00Z', type: 'payment_authorized', title: 'Payment Authorized', description: 'Visa ****6688 charged MXN 1,680 via EBANX' },
      { id: 'TL-106', timestamp: '2026-07-16T16:00:00Z', type: 'check_in', title: 'Guest Checked In', description: 'Self check-in with digital lock' },
      { id: 'TL-107', timestamp: '2026-07-20T10:00:00Z', type: 'check_out', title: 'Guest Checked Out', description: 'Normal departure' },
      { id: 'TL-108', timestamp: '2026-07-26T15:00:00Z', type: 'dispute_filed', title: 'Dispute Filed', description: 'Issuer claims no authorization (11.3)' }
    ],
    evidenceSignals: [
      { id: 'ES-081', label: 'Authorization present', value: 'AUTH-44332 approved by issuer', strength: 'strong' },
      { id: 'ES-082', label: 'AVS verified', value: 'Full match', strength: 'strong' },
      { id: 'ES-083', label: 'CVV verified', value: 'Match', strength: 'strong' },
      { id: 'ES-084', label: 'Service delivered', value: 'Digital lock access confirmed', strength: 'strong' }
    ]
  },
  {
    id: 'DSP-021',
    amount: 520.00,
    currency: 'BRL',
    reasonCode: '13.1',
    reasonCategory: 'service',
    status: 'new',
    responseDeadline: '2026-07-31',
    filedAt: '2026-07-19',
    transactionDate: '2026-07-01',
    paymentMethod: 'Mastercard ****3322',
    processor: 'EBANX',
    customer: {
      name: 'Marcos Pereira',
      email: 'marcos.p@gmail.com',
      country: 'Brazil',
      accountCreatedAt: '2026-06-28',
      completedBookings: 0,
      priorDisputes: 0
    },
    booking: {
      propertyName: 'Florianópolis Beach Flat',
      propertyLocation: 'Florianópolis, Brazil',
      checkIn: '2026-07-03',
      checkOut: '2026-07-07',
      guestCount: 2,
      totalNights: 4,
      hostName: 'Beatriz Lima',
      hostEmail: 'beatriz.l@host.com',
      cancellationPolicy: 'Strict — no refund within 7 days'
    },
    transaction: {
      date: '2026-07-01T07:30:00Z',
      paymentMethod: 'Mastercard ****3322',
      processor: 'EBANX',
      authorizationCode: 'AUTH-66554',
      ipAddress: '200.155.42.88',
      country: 'Brazil',
      avsMatch: true,
      cvvMatch: true
    },
    timeline: [
      { id: 'TL-109', timestamp: '2026-06-30T22:00:00Z', type: 'booking_created', title: 'Booking Created', description: 'Guest booked Florianópolis Beach Flat for 4 nights' },
      { id: 'TL-110', timestamp: '2026-07-01T07:30:00Z', type: 'payment_authorized', title: 'Payment Authorized', description: 'Mastercard ****3322 charged R$520.00 via EBANX' },
      { id: 'TL-111', timestamp: '2026-07-03T00:00:00Z', type: 'check_in', title: 'Check-In Not Confirmed', description: 'Host unresponsive, guest could not access property' },
      { id: 'TL-112', timestamp: '2026-07-03T14:00:00Z', type: 'communication', title: 'Guest Reached Out', description: 'Multiple messages to host with no response' },
      { id: 'TL-113', timestamp: '2026-07-03T20:00:00Z', type: 'communication', title: 'Platform Support', description: 'Guest contacted support, relocated to alternative accommodation' },
      { id: 'TL-114', timestamp: '2026-07-19T08:00:00Z', type: 'dispute_filed', title: 'Dispute Filed', description: 'Customer claims service not provided (13.1)' }
    ],
    evidenceSignals: [
      { id: 'ES-085', label: 'Check-in not confirmed', value: 'Guest could not access property', strength: 'missing' },
      { id: 'ES-086', label: 'Communication attempts', value: 'Guest tried to reach host multiple times', strength: 'weak' },
      { id: 'ES-087', label: 'Host unresponsive', value: 'No response from host', strength: 'missing' },
      { id: 'ES-088', label: 'Platform relocated guest', value: 'Support team intervened', strength: 'weak' }
    ]
  },
  {
    id: 'DSP-022',
    amount: 3100.00,
    currency: 'USD',
    reasonCode: '10.4',
    reasonCategory: 'fraud',
    status: 'in-progress',
    responseDeadline: '2026-08-10',
    filedAt: '2026-07-27',
    transactionDate: '2026-07-14',
    paymentMethod: 'Visa ****7744',
    processor: 'dLocal',
    customer: {
      name: 'Amanda Clark',
      email: 'amanda.c@email.com',
      country: 'United States',
      accountCreatedAt: '2024-12-01',
      completedBookings: 7,
      priorDisputes: 0
    },
    booking: {
      propertyName: 'Beachfront Villa',
      propertyLocation: 'Montego Bay, Jamaica',
      checkIn: '2026-07-15',
      checkOut: '2026-07-22',
      guestCount: 5,
      totalNights: 7,
      hostName: 'Patrick Williams',
      hostEmail: 'patrick.w@host.com',
      cancellationPolicy: 'Strict — 50% refund up to 1 week before'
    },
    transaction: {
      date: '2026-07-14T12:00:00Z',
      paymentMethod: 'Visa ****7744',
      processor: 'dLocal',
      authorizationCode: 'AUTH-99112',
      ipAddress: '68.33.44.55',
      country: 'United States',
      avsMatch: true,
      cvvMatch: true
    },
    timeline: [
      { id: 'TL-115', timestamp: '2026-07-13T18:00:00Z', type: 'booking_created', title: 'Booking Created', description: 'Guest booked Beachfront Villa for 7 nights' },
      { id: 'TL-116', timestamp: '2026-07-14T12:00:00Z', type: 'payment_authorized', title: 'Payment Authorized', description: 'Visa ****7744 charged $3,100.00 via dLocal' },
      { id: 'TL-117', timestamp: '2026-07-15T14:00:00Z', type: 'check_in', title: 'Guest Checked In', description: 'Airport transfer arranged, villa keys at reception' },
      { id: 'TL-118', timestamp: '2026-07-22T10:00:00Z', type: 'check_out', title: 'Guest Checked Out', description: 'Property returned in excellent condition' },
      { id: 'TL-119', timestamp: '2026-07-27T11:00:00Z', type: 'dispute_filed', title: 'Dispute Filed', description: 'Cardholder claims unauthorized (10.4)' }
    ],
    evidenceSignals: [
      { id: 'ES-089', label: 'IP matches profile', value: 'US IP, US card', strength: 'strong' },
      { id: 'ES-090', label: 'Known device', value: 'MacBook used in 5 prior bookings', strength: 'strong' },
      { id: 'ES-091', label: 'Check-in confirmed', value: 'Airport transfer + villa keys', strength: 'strong' },
      { id: 'ES-092', label: 'Established customer', value: '7 bookings, 0 disputes', strength: 'strong' },
      { id: 'ES-093', label: 'AVS verified', value: 'Full match', strength: 'strong' }
    ]
  }
]
