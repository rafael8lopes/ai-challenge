import { useEffect, useState } from 'react'
import { Box, Table, TableBody, TableContainer, TablePagination } from '@mui/material'
import type { Dispute, DisputeFilters } from '@/features/disputes/types'
import { DisputeTableToolbar } from '@/features/disputes/components/table/DisputeTableToolbar'
import { DisputeTableHeader } from '@/features/disputes/components/table/DisputeTableHeader'
import { DisputeTableRow } from '@/features/disputes/components/table/DisputeTableRow'

const ROWS_PER_PAGE_OPTIONS = [10, 25, 50]

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
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE_OPTIONS[0])

  // Reset to the first page whenever the filtered/sorted result set changes
  useEffect(() => {
    setPage(0)
  }, [disputes])

  const paginatedDisputes = disputes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

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
            {paginatedDisputes.map((dispute) => (
              <DisputeTableRow key={dispute.id} dispute={dispute} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={disputes.length}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10))
          setPage(0)
        }}
        rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
        sx={{ borderTop: '1px solid', borderColor: 'divider', flexShrink: 0 }}
      />
    </Box>
  )
}
