import { useState } from 'react';
import {
  Box,
  BottomNavigation,
  BottomNavigationAction,
  List,
} from '@mui/material';
import {
  Chat as ChatIcon,
  People as PeopleIcon,
} from '@mui/icons-material';

import { useConversations } from '../context/ConversationsProvider';
import TopBar from './TopBar';
import NewContact from './NewContact';
import NewConversation from './NewConversation';
import Conversations from './Conversations';
import Contacts from './Contacts';
import OpenConversation from './OpenConversation';

const CONVERSATIONS = 'Conversations';
const CONTACTS = 'Contacts';

const Layout = ({ id }) => {
  const [navigationValue, setNavigationValue] =
    useState(CONTACTS);

  const [createNew, setCreateNew] = useState(false);
  const { selectedConversation } = useConversations();

  if (selectedConversation) {
    return <OpenConversation />;
  }

  if (createNew) {
    if (navigationValue === CONTACTS) {
      return (
        <NewContact onClose={() => setCreateNew(false)} />
      );
    }

    if (navigationValue === CONVERSATIONS) {
      return (
        <NewConversation
          onClose={() => setCreateNew(false)}
        />
      );
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
      }}
    >
      <TopBar
        id={id}
        header={navigationValue}
        onShowModal={() => setCreateNew(true)}
      />
      <List sx={{ flexGrow: 1, overflow: 'auto' }}>
        {navigationValue === CONVERSATIONS ? (
          <Conversations />
        ) : (
          <Contacts />
        )}
      </List>
      <BottomNavigation
        showLabels
        value={navigationValue}
        onChange={(e, newValue) => {
          setNavigationValue(newValue);
        }}
      >
        <BottomNavigationAction
          icon={<ChatIcon />}
          label={CONVERSATIONS}
          value={CONVERSATIONS}
        />
        <BottomNavigationAction
          icon={<PeopleIcon />}
          label={CONTACTS}
          value={CONTACTS}
        />
      </BottomNavigation>
    </Box>
  );
};

export default Layout;
