import { useState, useCallback } from 'react';
import {
  Box,
  Button,
  Divider,
  FormControl,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  Typography,
} from '@mui/material';

import { useConversations } from '../context/ConversationsProvider';

const OpenConversation = () => {
  const [text, setText] = useState();

  const setRef = useCallback(node => {
    if (node) {
      node.scrollIntoView({ smooth: true });
    }
  }, []);

  const {
    sendMessage,
    selectedConversation,
    selectConversationIndex,
  } = useConversations();

  const handleSubmit = () => {
    if (!text) return;

    sendMessage(
      selectedConversation.recipients.map(
        recipient => recipient.id
      ),
      text
    );

    setText('');
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
      }}
    >
      <Box>
        <Box
          sx={{
            display: 'flex',
            p: 2,
          }}
        >
          <Button
            onClick={() => selectConversationIndex(null)}
          >
            Back
          </Button>
          <Typography
            sx={{
              flexGrow: 1,
              textAlign: 'center',
            }}
            variant="h6"
          >
            {selectedConversation.recipients
              .map(
                recipient => recipient.name || recipient.id
              )
              .join(', ')}
          </Typography>
        </Box>
        <Divider />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          overflow: 'auto',
          padding: 3,
        }}
      >
        {selectedConversation.messages.map(
          (message, index) => {
            return (
              <Box
                key={index}
                sx={{
                  alignSelf: message.fromMe
                    ? 'end'
                    : 'start',
                  margin: 1,
                }}
                ref={setRef}
              >
                <Box
                  sx={{
                    backgroundColor: message.fromMe
                      ? 'primary.main'
                      : '',
                    padding: 1,
                    border: message.fromMe ? '' : 1,
                    borderRadius: 2,
                    wordBreak: 'break-all',
                  }}
                >
                  {message.text}
                </Box>
                <Box>
                  <Typography
                    align={
                      message.fromMe ? 'right' : 'left'
                    }
                    color="text.secondary"
                    variation="caption"
                  >
                    {message.fromMe
                      ? 'You'
                      : message.senderName}
                  </Typography>
                </Box>
              </Box>
            );
          }
        )}
      </Box>
      <FormControl sx={{ marginTop: 1 }} variant="outlined">
        <InputLabel>Your Message</InputLabel>
        <OutlinedInput
          onChange={e => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          value={text}
          multiline
          endAdornment={
            <InputAdornment position="end">
              <Button
                disabled={!text}
                onClick={handleSubmit}
                variant="contained"
              >
                Send
              </Button>
            </InputAdornment>
          }
          label="Your Message"
        />
      </FormControl>
    </Box>
  );
};

export default OpenConversation;
