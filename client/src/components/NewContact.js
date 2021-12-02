import { useRef } from 'react';
import {
  Box,
  Divider,
  Button,
  Typography,
  TextField,
} from '@mui/material';

import { useContacts } from '../context/ContactsProvider';

const NewContact = ({ onClose }) => {
  const idRef = useRef();
  const nameRef = useRef();
  console.log(idRef.current);

  const { createContact } = useContacts();

  const addNewContact = () => {
    console.log(idRef.current.value);
    createContact(
      idRef.current.value,
      nameRef.current.value
    );

    onClose();
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
            New Contact
          </Typography>
          <Button onClick={addNewContact}>Done</Button>
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
        <TextField
          sx={{ marginBottom: 2 }}
          label="Id"
          inputRef={idRef}
          required
        />
        <TextField
          label="Name"
          inputRef={nameRef}
          required
        />
      </Box>
    </Box>
  );
};

export default NewContact;
