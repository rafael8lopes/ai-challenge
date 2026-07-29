import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  OutlinedInput,
  ToggleButtonGroup,
  ToggleButton,
  type SelectChangeEvent,
} from '@mui/material'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import type { DisputeFilters, DisputeReasonCategory, DisputeStatus } from '@/features/disputes/types'

interface DisputeFiltersBarProps {
  filters: DisputeFilters
  onSortByChange: (sortBy: DisputeFilters['sortBy']) => void
  onSortOrderChange: (sortOrder: DisputeFilters['sortOrder']) => void
  onReasonCategoryChange: (category: DisputeReasonCategory | undefined) => void
  onStatusChange: (status: DisputeStatus | undefined) => void
}

const reasonCategories: { value: DisputeReasonCategory; label: string }[] = [
  { value: 'fraud', label: 'Fraud' },
  { value: 'service', label: 'Service' },
  { value: 'processing', label: 'Processing' },
  { value: 'authorization', label: 'Authorization' },
]

const statuses: { value: DisputeStatus; label: string }[] = [
  { value: 'new', label: 'New' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'submitted', label: 'Submitted' },
]

export function DisputeFiltersBar({
  filters,
  onSortByChange,
  onSortOrderChange,
  onReasonCategoryChange,
  onStatusChange,
}: DisputeFiltersBarProps) {
  function handleReasonChange(event: SelectChangeEvent<string>) {
    const value = event.target.value
    onReasonCategoryChange(value ? (value as DisputeReasonCategory) : undefined)
  }

  function handleStatusChange(event: SelectChangeEvent<string>) {
    const value = event.target.value
    onStatusChange(value ? (value as DisputeStatus) : undefined)
  }

  return (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center', mb: 3 }}>
      <FormControl size="small" sx={{ minWidth: 150 }}>
        <InputLabel id="sort-by-label">Sort by</InputLabel>
        <Select
          labelId="sort-by-label"
          value={filters.sortBy}
          label="Sort by"
          onChange={(e) => onSortByChange(e.target.value as DisputeFilters['sortBy'])}
        >
          <MenuItem value="deadline">Deadline</MenuItem>
          <MenuItem value="amount">Amount</MenuItem>
          <MenuItem value="filedAt">Date Filed</MenuItem>
        </Select>
      </FormControl>

      <ToggleButtonGroup
        size="small"
        value={filters.sortOrder}
        exclusive
        onChange={(_, val) => val && onSortOrderChange(val)}
        aria-label="Sort order"
      >
        <ToggleButton value="asc" aria-label="Ascending">
          <ArrowUpwardIcon fontSize="small" />
        </ToggleButton>
        <ToggleButton value="desc" aria-label="Descending">
          <ArrowDownwardIcon fontSize="small" />
        </ToggleButton>
      </ToggleButtonGroup>

      <FormControl size="small" sx={{ minWidth: 180 }}>
        <InputLabel id="reason-filter-label">Reason Type</InputLabel>
        <Select
          labelId="reason-filter-label"
          value={filters.reasonCategory ?? ''}
          onChange={handleReasonChange}
          input={<OutlinedInput label="Reason Type" />}
        >
          <MenuItem value="">All</MenuItem>
          {reasonCategories.map((r) => (
            <MenuItem key={r.value} value={r.value}>
              <Chip label={r.label} size="small" sx={{ mr: 1 }} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 160 }}>
        <InputLabel id="status-filter-label">Status</InputLabel>
        <Select
          labelId="status-filter-label"
          value={filters.status ?? ''}
          onChange={handleStatusChange}
          input={<OutlinedInput label="Status" />}
        >
          <MenuItem value="">All</MenuItem>
          {statuses.map((s) => (
            <MenuItem key={s.value} value={s.value}>{s.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}
