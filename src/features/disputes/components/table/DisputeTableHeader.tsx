import { TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material'
import type { DisputeFilters } from '@/features/disputes/types'

interface DisputeTableHeaderProps {
  sortBy: DisputeFilters['sortBy']
  sortOrder: DisputeFilters['sortOrder']
  onSort: (column: DisputeFilters['sortBy']) => void
}

const headerCellSx = {
  bgcolor: '#161b22',
  color: 'text.secondary',
  fontWeight: 600,
  fontSize: '0.7rem',
  letterSpacing: 0.5,
} as const

const sortLabelSx = {
  color: 'text.secondary !important',
  '& .MuiTableSortLabel-icon': { color: 'text.secondary !important' },
} as const

export function DisputeTableHeader({ sortBy, sortOrder, onSort }: DisputeTableHeaderProps) {
  return (
    <TableHead>
      <TableRow>
        <TableCell sx={headerCellSx}>CASE</TableCell>
        <TableCell sx={headerCellSx}>GUEST / PROPERTY</TableCell>
        <TableCell sx={headerCellSx}>
          <TableSortLabel
            active={sortBy === 'amount'}
            direction={sortBy === 'amount' ? sortOrder : 'asc'}
            onClick={() => onSort('amount')}
            sx={sortLabelSx}
          >
            AMOUNT
          </TableSortLabel>
        </TableCell>
        <TableCell sx={headerCellSx}>
          <TableSortLabel
            active={sortBy === 'filedAt'}
            direction={sortBy === 'filedAt' ? sortOrder : 'asc'}
            onClick={() => onSort('filedAt')}
            sx={sortLabelSx}
          >
            TX DATE
          </TableSortLabel>
        </TableCell>
        <TableCell sx={headerCellSx}>METHOD</TableCell>
        <TableCell sx={headerCellSx}>REASON</TableCell>
        <TableCell sx={headerCellSx}>STATUS</TableCell>
        <TableCell sx={headerCellSx}>
          <TableSortLabel
            active={sortBy === 'deadline'}
            direction={sortBy === 'deadline' ? sortOrder : 'asc'}
            onClick={() => onSort('deadline')}
            sx={sortLabelSx}
          >
            DEADLINE
          </TableSortLabel>
        </TableCell>
        <TableCell sx={{ bgcolor: '#161b22' }} />
      </TableRow>
    </TableHead>
  )
}
