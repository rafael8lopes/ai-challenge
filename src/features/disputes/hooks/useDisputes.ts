import { useQuery } from '@tanstack/react-query'
import type { DisputeFilters } from '@/features/disputes/types'
import { disputeService } from '@/features/disputes/services/disputeService'

export function useDisputes(filters: DisputeFilters) {
  return useQuery({
    queryKey: ['disputes', filters],
    queryFn: () => disputeService.getDisputes(filters),
  })
}
