import { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Typography,
} from '@mui/material';

import { useContacts } from '../context/ContactsProvider';
import { useConversations } from '../context/ConversationsProvider';

const NewConversation = ({ onClose }) => {
  const { contacts } = useContacts();
  const { createNewConversation } = useConversations();
  const [selectedContactIds, setSelectedContactIds] =
    useState([]);

  const addNewConversation = () => {
    createNewConversation(selectedContactIds);
    onClose();
  };

  const handleCheckboxChange = contactId => {
    const contactIdIndex = selectedContactIds.findIndex(
      cId => cId === contactId
    );

    if (contactIdIndex === -1) {
      return setSelectedContactIds(contactIds => [
        ...contactIds,
        contactId,
      ]);
    }

    setSelectedContactIds(contactIds => {
      return [
        ...contactIds.slice(0, contactIdIndex),
        ...contactIds.slice(contactIdIndex + 1),
      ];
    });
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
          <Button onClick={onClose}>Cancel</Button>
          <Typography
            sx={{
              flexGrow: 1,
              textAlign: 'center',
            }}
            variant="h6"
          >
            New Conversation
          </Typography>
          <Button onClick={addNewConversation}>Done</Button>
        </Box>
        <Divider />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'spaceAround',
          padding: 2,
        }}
      >
        {contacts.map((contact, i) => (
          <FormControlLabel
            key={i}
            control={<Checkbox />}
            label={contact.name}
            onChange={() =>
              handleCheckboxChange(contact.id)
            }
          />
        ))}
      </Box>
    </Box>
  );
};

export default NewConversation;
