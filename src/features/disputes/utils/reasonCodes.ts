import type { DisputeReasonCategory } from '@/features/disputes/types'

interface ReasonCodeInfo {
  code: string
  category: DisputeReasonCategory
  title: string
  headline: string
  explanation: string
  evidenceGuidance: string[]
  watchFor: string[]
}

const reasonCodeMap: Record<string, ReasonCodeInfo> = {
  '10.4': {
    code: '10.4',
    category: 'fraud',
    title: 'Fraudulent Transaction — Card Not Present',
    headline: 'Prove the cardholder authorized this transaction',
    explanation: 'The cardholder claims they did not authorize this transaction. This is the most common fraud-related chargeback for online/card-not-present purchases.',
    evidenceGuidance: [
      'IP address matching customer profile country',
      'Device fingerprint from prior successful transactions',
      'Delivery/check-in confirmation proving the cardholder received the service',
      'Prior successful transactions from the same card/device',
      'AVS (Address Verification) and CVV match records',
    ],
    watchFor: [
      'IP address originating from a different country than the billing address',
      'New device with no prior booking fingerprint',
      'High-value booking with no prior account history',
      'Booking made within 24h of the stay',
    ],
  },
  '10.5': {
    code: '10.5',
    category: 'fraud',
    title: 'Fraud — Counterfeit Transaction',
    headline: 'Show the card was used by its legitimate owner',
    explanation: 'The issuing bank believes the transaction was made with a counterfeit or cloned card. The real cardholder denies making the purchase.',
    evidenceGuidance: [
      'Device fingerprint matching known customer device',
      'IP address and geolocation data',
      'Proof of service delivery (check-in records)',
      'Customer communication history showing engagement',
      'Transaction velocity — show normal usage patterns',
    ],
    watchFor: [
      'Device fingerprint never seen on the account before',
      'Geolocation far from the cardholder\'s usual region',
      'Multiple rapid bookings on the same card',
      'Mismatch between billing country and IP country',
    ],
  },
  '11.1': {
    code: '11.1',
    category: 'authorization',
    title: 'Card Recovery Bulletin',
    headline: 'Prove valid authorization before the bulletin listing',
    explanation: 'The card was listed on a card recovery bulletin (lost/stolen list) before or at the time of the transaction. The issuer flagged the card but the transaction still went through.',
    evidenceGuidance: [
      'Valid authorization code from the transaction',
      'Proof authorization was obtained before the card appeared on the bulletin',
      'Delivery confirmation showing service was rendered',
      'Transaction timestamp relative to bulletin listing date',
    ],
    watchFor: [
      'Authorization timestamp after the bulletin listing date',
      'Missing or declined authorization code',
      'No proof the service was rendered',
    ],
  },
  '11.3': {
    code: '11.3',
    category: 'authorization',
    title: 'No Authorization Obtained',
    headline: 'Produce the approval record for this charge',
    explanation: 'The issuer claims the transaction was processed without obtaining proper authorization. This may be a technical issue where the authorization code was not properly recorded.',
    evidenceGuidance: [
      'Authorization response code proving approval was received',
      'Authorization timestamp and approval records',
      'Processor confirmation of successful authorization',
      'Delivery confirmation showing service was provided',
    ],
    watchFor: [
      'No authorization code on file for the transaction',
      'Processor response other than approved',
      'Gap between charge amount and authorized amount',
    ],
  },
  '12.1': {
    code: '12.1',
    category: 'processing',
    title: 'Duplicate Processing',
    headline: 'Prove only one charge was settled',
    explanation: 'The cardholder claims they were charged more than once for the same transaction. This can happen due to network timeouts causing retry attempts.',
    evidenceGuidance: [
      'Transaction logs showing only one settled charge',
      'Void/reversal records for any duplicate authorizations',
      'Processor statement confirming single net settlement',
      'Batch settlement records showing one charge',
    ],
    watchFor: [
      'Two settlements with matching amounts and timestamps',
      'Duplicate authorization not voided',
      'Same booking reference charged twice',
    ],
  },
  '12.2': {
    code: '12.2',
    category: 'processing',
    title: 'Incorrect Amount',
    headline: 'Show the charged amount matches what was agreed',
    explanation: 'The cardholder claims the charged amount differs from what they agreed to pay. The customer expected a different total.',
    evidenceGuidance: [
      'Booking confirmation showing agreed-upon amount',
      'Itemized price breakdown (nightly rate × nights + fees)',
      'Terms accepted by the customer at checkout',
      'Communication confirming the final price',
    ],
    watchFor: [
      'Charged amount differs from the booking confirmation',
      'Undisclosed fees added after checkout',
      'Currency conversion applied without notice',
    ],
  },
  '13.1': {
    code: '13.1',
    category: 'service',
    title: 'Services Not Provided / Merchandise Not Received',
    headline: 'Prove the guest accessed and used the property',
    explanation: 'The customer claims they never received the service they paid for. In the context of vacation rentals, this means they claim they could not access or use the property.',
    evidenceGuidance: [
      'Check-in confirmation (smart lock access, key pickup, host confirmation)',
      'Check-out records proving the full stay was completed',
      'Guest communication during the stay',
      'Property access logs or concierge records',
      'Post-stay review or feedback if available',
    ],
    watchFor: [
      'No check-in record or access log',
      'Guest reported access problems during the stay',
      'Silence from the guest across the booking window',
    ],
  },
  '13.2': {
    code: '13.2',
    category: 'service',
    title: 'Cancelled Recurring Transaction',
    headline: 'Show the charge followed the accepted cancellation policy',
    explanation: 'The customer claims they cancelled a recurring service but were still charged. In vacation rentals, this may be misapplied to one-time bookings where the customer cancelled but was charged per the cancellation policy.',
    evidenceGuidance: [
      'Cancellation policy accepted at time of booking',
      'Cancellation timeline showing the request was within the penalty window',
      'Communication showing the customer was informed of the policy',
      'Proof this is a one-time charge, not a subscription',
      'Refund records if partial refund was already issued',
    ],
    watchFor: [
      'Cancellation requested outside the penalty window',
      'No record the policy was shown at booking',
      'Charge resembles a recurring subscription',
    ],
  },
  '13.3': {
    code: '13.3',
    category: 'service',
    title: 'Not as Described or Defective',
    headline: 'Show the property matched its listing',
    explanation: 'The customer claims the service did not match the description or had significant defects. For vacation rentals, this means the property differed materially from the listing.',
    evidenceGuidance: [
      'Property listing photos and description at time of booking',
      'Check-in confirmation proving the guest used the property',
      'Communication records showing any complaints and host responses',
      'Evidence the guest completed the full stay despite complaints',
      'Partial refund or compensation already offered',
    ],
    watchFor: [
      'Documented complaints with no host response',
      'Guest left early citing property condition',
      'Listing photos that no longer match the property',
    ],
  },
}

export type { ReasonCodeInfo }

export function getReasonExplanation(reasonCode: string): ReasonCodeInfo | undefined {
  return reasonCodeMap[reasonCode]
}

export function getReasonCategoryLabel(category: DisputeReasonCategory): string {
  const labels: Record<DisputeReasonCategory, string> = {
    fraud: 'Fraud',
    service: 'Service',
    processing: 'Processing',
    authorization: 'Authorization',
  }
  return labels[category]
}

export function getReasonCategoryColor(category: DisputeReasonCategory): 'error' | 'warning' | 'info' | 'secondary' {
  const colors: Record<DisputeReasonCategory, 'error' | 'warning' | 'info' | 'secondary'> = {
    fraud: 'error',
    service: 'warning',
    processing: 'info',
    authorization: 'secondary',
  }
  return colors[category]
}
