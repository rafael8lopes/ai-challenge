import { AppBar, Toolbar, Typography, Box, Avatar } from '@mui/material'

export function AppHeader() {
  return (
    <AppBar position="static" elevation={0} sx={{ bgcolor: '#161b22', borderBottom: '1px solid', borderColor: 'divider' }}>
      <Toolbar sx={{ minHeight: 56 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              bgcolor: '#f97316',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>C</Typography>
          </Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary' }}>
            Coral Escapes
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', ml: 1 }}>
            Dispute Triage
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.primary', lineHeight: 1.2 }}>
              John Doe
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Head of Risk
            </Typography>
          </Box>
          <Avatar sx={{ width: 32, height: 32, bgcolor: '#5b9cf6', fontSize: 14 }}>DR</Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
