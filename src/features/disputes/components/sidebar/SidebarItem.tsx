import { Box, Typography, ListItemButton, ListItemText, Badge } from '@mui/material'

interface SidebarItemProps {
  label: string
  count: number
  selected: boolean
  onClick: () => void
  color: string
  icon?: React.ReactNode
}

export function SidebarItem({ label, count, selected, onClick, color, icon }: SidebarItemProps) {
  return (
    <ListItemButton
      selected={selected}
      onClick={onClick}
      sx={{
        borderRadius: 1,
        py: 0.5,
        px: 1,
        my: 0.25,
        '&.Mui-selected': {
          bgcolor: `${color}20`,
          '&:hover': { bgcolor: `${color}30` },
        },
      }}
    >
      {icon && <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>{icon}</Box>}
      <ListItemText
        primary={label}
        primaryTypographyProps={{ variant: 'body2', sx: { fontWeight: selected ? 600 : 400 } }}
      />
      <Badge>
        <Typography
          variant="caption"
          sx={{
            bgcolor: selected ? color : 'transparent',
            color: selected ? '#fff' : 'text.secondary',
            borderRadius: 1,
            px: 0.75,
            py: 0.1,
            fontWeight: 600,
            fontSize: '0.7rem',
          }}
        >
          {count}
        </Typography>
      </Badge>
    </ListItemButton>
  )
}
