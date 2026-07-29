import { useQuery } from '@tanstack/react-query'
import { disputeService } from '@/features/disputes/services/disputeService'

export function useDisputeDetail(id: string) {
  return useQuery({
    queryKey: ['dispute', id],
    queryFn: () => disputeService.getDisputeById(id),
    enabled: Boolean(id),
  })
}
