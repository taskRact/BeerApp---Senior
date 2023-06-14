import { Box, Typography } from '@mui/material';

export interface HeaderWithIconProps {
  label: string
  icon: JSX.Element
}

export function HeaderWithIcon({ icon, label }: HeaderWithIconProps) {
  return (
    <Box sx={{
      display: 'flex'
    }}>
      <Box sx={{
        display: 'flex',
        alignItems: 'center'
      }} marginRight={1}>{icon}</Box>
      <Typography variant="subtitle1">{label}</Typography>
    </Box>
  );
}
