import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

import { useContacts } from '../context/ContactsProvider';

const Contacts = () => {
  const { contacts } = useContacts();

  return (
    <List variant="flush">
      {contacts.map((contact, index) => (
        <Box key={contact.id}>
          <ListItem>
            <ListItemText primary={contact.name} />
          </ListItem>
          {contacts.length - 1 !== index && <Divider />}
        </Box>
      ))}
    </List>
  );
};

export default Contacts;
