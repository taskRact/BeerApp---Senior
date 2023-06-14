import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom';

import welcomeUrl from './welcome.md';

export function Welcome() {
  const [text, setText] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch(welcomeUrl)
      .then((response) => response.text())
      .then((parsed) => setText(parsed));
  }, []);

  return (
    <Paper>
      <Box padding={1} marginBottom={2}>
        <ReactMarkdown>{text}</ReactMarkdown>
        <Button variant="contained" startIcon={<SearchIcon />} size="large" onClick={() => navigate('/beer')}>
          Find a brewery!
        </Button>
      </Box>
    </Paper >
  );
}
