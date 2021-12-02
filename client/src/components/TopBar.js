import {
  Box,
  Divider,
  IconButton,
  Typography,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

import CopyToClipboard from './CopyToClipboard';

const TopBar = ({ header, id, onShowModal }) => (
  <Box>
    <Box
      sx={{
        display: 'flex',
        p: 1,
      }}
    >
      <Typography
        sx={{
          flexGrow: 1,
          textAlign: 'center',
        }}
        variant="h6"
      >
        {header}
      </Typography>
      <IconButton
        color="primary"
        size="small"
        onClick={onShowModal}
      >
        <AddIcon />
      </IconButton>
    </Box>
    <CopyToClipboard textToCopy={id} />
    <Divider />
  </Box>
);

export default TopBar;
