import { Box, Typography, InputBase } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import type { Dispute } from '@/features/disputes/types'
import { getTotalExposureUsd } from '@/features/disputes/utils/formatters'

interface DisputeTableToolbarProps {
  disputeCount: number
  allDisputes: Dispute[]
  search: string
  onSearchChange: (value: string) => void
}

export function DisputeTableToolbar({
  disputeCount,
  allDisputes,
  search,
  onSearchChange,
}: DisputeTableToolbarProps) {
  const totalExposure = getTotalExposureUsd(
    allDisputes.map((d) => ({ amount: d.amount, currency: d.currency })),
  )

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', px: 2, py: 1.5, gap: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          bgcolor: '#0d1117',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 1,
          px: 1.5,
          py: 0.5,
          flex: 1,
          maxWidth: 320,
        }}
      >
        <SearchIcon sx={{ color: 'text.secondary', fontSize: 18, mr: 1 }} />
        <InputBase
          placeholder="Search guest, property, case ID..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          sx={{ fontSize: '0.85rem', color: 'text.primary', flex: 1 }}
        />
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {disputeCount} disputes &nbsp;&nbsp; ${Math.round(totalExposure).toLocaleString()} exp.
      </Typography>
    </Box>
  )
}
