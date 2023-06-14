import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined';
import { Box, Paper, Typography } from '@mui/material';

import { HeaderWithIcon } from '../../components/HeaderWithIcon';
import { segments } from './consts';

export function GoodToKnow({ type }: { type?: keyof typeof segments }) {
  if (!type) {
    return null;
  }

  return (
    <Paper>
      <Box padding={2} marginTop={2}>
        <HeaderWithIcon icon={<TipsAndUpdatesOutlinedIcon />} label="Good to know" />
        <Typography variant="body1">What is {type} brewery? {segments[type]}</Typography>
      </Box>
    </Paper>
  );
}
