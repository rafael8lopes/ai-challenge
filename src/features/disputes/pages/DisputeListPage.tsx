import { Box, CircularProgress, Alert } from '@mui/material'
import { AppHeader } from '@/components/AppHeader'
import { SummaryMetrics } from '@/features/disputes/components/SummaryMetrics'
import { DisputeSidebar } from '@/features/disputes/components/sidebar/DisputeSidebar'
import { DisputeTable } from '@/features/disputes/components/table/DisputeTable'
import { useDisputes } from '@/features/disputes/hooks/useDisputes'
import { useDisputeFilters } from '@/features/disputes/hooks/useDisputeFilters'
import { disputes as allMockDisputes } from '@/mocks/disputes'

export function DisputeListPage() {
  const {
    filters,
    setSearch,
    setSortBy,
    setSortOrder,
    setUrgency,
    setReasonCategory,
    setStatus,
  } = useDisputeFilters()
  const { data: disputes, isLoading, error } = useDisputes(filters)

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', bgcolor: 'background.default' }}>
      <AppHeader />
      <SummaryMetrics disputes={allMockDisputes} />

      <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <DisputeSidebar
          disputes={allMockDisputes}
          selectedUrgency={filters.urgency}
          selectedReason={filters.reasonCategory}
          selectedStatus={filters.status}
          onUrgencyChange={setUrgency}
          onReasonChange={setReasonCategory}
          onStatusChange={setStatus}
        />

        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', borderLeft: '1px solid', borderColor: 'divider' }}>
          {isLoading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }} role="status">
              <CircularProgress />
            </Box>
          )}

          {error && (
            <Alert severity="error" role="alert" sx={{ m: 2 }}>
              Failed to load disputes. Please try again.
            </Alert>
          )}

          {!isLoading && !error && disputes && (
            <DisputeTable
              disputes={disputes}
              allDisputes={allMockDisputes}
              search={filters.search ?? ''}
              onSearchChange={setSearch}
              sortBy={filters.sortBy}
              sortOrder={filters.sortOrder}
              onSortByChange={setSortBy}
              onSortOrderChange={setSortOrder}
            />
          )}
        </Box>
      </Box>
    </Box>
  )
}
