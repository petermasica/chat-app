import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
} from '@mui/material';

import { useConversations } from '../context/ConversationsProvider';

const Conversations = () => {
  const { conversations, selectConversationIndex } =
    useConversations();

  return (
    <List>
      {conversations.map((conversation, index) => (
        <Box key={index}>
          <ListItem
            disablePadding
            onClick={() => selectConversationIndex(index)}
          >
            <ListItemButton>
              <ListItemText
                primary={conversation.recipients
                  .map(r => r.name)
                  .join(', ')}
              />
            </ListItemButton>
          </ListItem>
          {conversations.length - 1 !== index && (
            <Divider />
          )}
        </Box>
      ))}
    </List>
  );
};

export default Conversations;
