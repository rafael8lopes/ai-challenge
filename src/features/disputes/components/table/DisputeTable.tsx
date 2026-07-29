import { Box, Table, TableBody, TableContainer } from '@mui/material'
import type { Dispute, DisputeFilters } from '@/features/disputes/types'
import { DisputeTableToolbar } from '@/features/disputes/components/table/DisputeTableToolbar'
import { DisputeTableHeader } from '@/features/disputes/components/table/DisputeTableHeader'
import { DisputeTableRow } from '@/features/disputes/components/table/DisputeTableRow'

interface DisputeTableProps {
  disputes: Dispute[]
  allDisputes: Dispute[]
  search: string
  onSearchChange: (value: string) => void
  sortBy: DisputeFilters['sortBy']
  sortOrder: DisputeFilters['sortOrder']
  onSortByChange: (sortBy: DisputeFilters['sortBy']) => void
  onSortOrderChange: (sortOrder: DisputeFilters['sortOrder']) => void
}

export function DisputeTable({
  disputes,
  allDisputes,
  search,
  onSearchChange,
  sortBy,
  sortOrder,
  onSortByChange,
  onSortOrderChange,
}: DisputeTableProps) {
  function handleSort(column: DisputeFilters['sortBy']) {
    if (sortBy === column) {
      onSortOrderChange(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      onSortByChange(column)
      onSortOrderChange('asc')
    }
  }

  return (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <DisputeTableToolbar
        disputeCount={disputes.length}
        allDisputes={allDisputes}
        search={search}
        onSearchChange={onSearchChange}
      />

      <TableContainer sx={{ flex: 1, overflow: 'auto' }}>
        <Table size="small" stickyHeader sx={{ '& .MuiTableCell-root': { py: 1.5, px: 1.5 } }}>
          <DisputeTableHeader sortBy={sortBy} sortOrder={sortOrder} onSort={handleSort} />
          <TableBody>
            {disputes.map((dispute) => (
              <DisputeTableRow key={dispute.id} dispute={dispute} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}
