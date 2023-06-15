import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, Paper, Skeleton } from '@mui/material';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom';

import welcomeUrl from './welcome.md';

export function Welcome() {
  const [text, setText] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch(welcomeUrl)
      .then((response) => response.text())
      .then((parsed) => setText(parsed));
  }, []);

  return (
    <Paper>
      <Box padding={2} marginBottom={2}>
        {text.length ? <ReactMarkdown>{text}</ReactMarkdown> : <Skeleton variant="rectangular" height={500}></Skeleton>}
        <Button variant="contained" startIcon={<SearchIcon />} size="large" onClick={() => navigate('/beer')}>
          Find a brewery!
        </Button>
      </Box>
    </Paper >
  );
}
