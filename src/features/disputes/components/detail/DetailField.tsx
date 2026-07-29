import { Box, Typography, Paper } from '@mui/material'
import type { ReactNode } from 'react'

interface DetailFieldProps {
  label: string
  value: ReactNode
  valueColor?: string
  mono?: boolean
}

export function DetailField({ label, value, valueColor, mono }: DetailFieldProps) {
  return (
    <Box>
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
        {label}
      </Typography>
      <Typography
        variant="body2"
        sx={{ fontWeight: 500, color: valueColor, fontFamily: mono ? 'monospace' : undefined }}
      >
        {value}
      </Typography>
    </Box>
  )
}

interface DetailSectionProps {
  title: string
  children: ReactNode
}

export function DetailSection({ title, children }: DetailSectionProps) {
  return (
    <Paper component="section" aria-label={title} sx={{ p: 2.5, mb: 2.5 }}>
      <Typography
        variant="caption"
        sx={{ color: 'text.secondary', fontWeight: 700, letterSpacing: 0.8, display: 'block', mb: 2 }}
      >
        {title}
      </Typography>
      {children}
    </Paper>
  )
}
