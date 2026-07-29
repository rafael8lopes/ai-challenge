import { Typography, List } from '@mui/material'
import { SidebarItem } from '@/features/disputes/components/sidebar/SidebarItem'

export interface SidebarOption<T> {
  label: string
  count: number
  color: string
  value: T | undefined
  icon?: React.ReactNode
}

interface SidebarSectionProps<T> {
  title: string
  options: SidebarOption<T>[]
  selected: T | undefined
  onChange: (value: T | undefined) => void
  last?: boolean
}

export function SidebarSection<T>({ title, options, selected, onChange, last }: SidebarSectionProps<T>) {
  return (
    <>
      <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, px: 1, letterSpacing: 0.8 }}>
        {title}
      </Typography>
      <List dense disablePadding sx={{ mb: last ? 0 : 2 }}>
        {options.map((option) => (
          <SidebarItem
            key={option.label}
            label={option.label}
            count={option.count}
            selected={selected === option.value}
            onClick={() => onChange(option.value)}
            color={option.color}
            icon={option.icon}
          />
        ))}
      </List>
    </>
  )
}
