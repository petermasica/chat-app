import { useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';

import {
  ContentCopy as ContentCopyIcon,
  Done as DoneIcon,
} from '@mui/icons-material';

const CopyToClipboard = ({ textToCopy }) => {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="caption">
        {textToCopy}
      </Typography>
      <IconButton size="small" onClick={copy}>
        {copied ? (
          <DoneIcon />
        ) : (
          <ContentCopyIcon
            sx={{
              '&:hover': {
                color: 'primary.main',
              },
            }}
          />
        )}
      </IconButton>
    </Box>
  );
};

export default CopyToClipboard;
