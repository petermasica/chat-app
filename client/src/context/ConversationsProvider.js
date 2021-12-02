import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { useContacts } from './ContactsProvider';
import { useSocket } from './SocketProvider';

const arrayEquality = (a, b) => {
  if (a.length !== b.length) {
    return false;
  }

  a.sort();
  b.sort();

  return a.every((element, i) => element === b[i]);
};

const ConversationsContext = React.createContext();

export const useConversations = () =>
  useContext(ConversationsContext);

export const ConversationsProvider = ({ children, id }) => {
  const [conversations, setConversations] = useLocalStorage(
    'conversations',
    []
  );

  const [
    selectedConversationIndex,
    setSelectedConversationIndex,
  ] = useState(null);

  const { contacts } = useContacts();
  const socket = useSocket();

  const formattedConversations = conversations.map(
    (conversation, index) => {
      const recipients = conversation.recipients.map(
        recipient => {
          const contact = contacts.find(
            contact => contact.id === recipient
          );
          const name =
            (contact && contact.name) || recipient;

          return { id: recipient, name };
        }
      );

      const messages = conversation.messages.map(
        message => {
          const contact = contacts.find(
            contact => contact.id === message.sender
          );
          const name =
            (contact && contact.name) || message.sender;

          const fromMe = message.sender === id;

          return { ...message, senderName: name, fromMe };
        }
      );

      const selected = index === selectedConversationIndex;
      return {
        ...conversation,
        messages,
        recipients,
        selected,
      };
    }
  );

  const addMessageToConversation = ({
    recipients,
    text,
    sender,
  }) => {
    setConversations(prevConversations => {
      let madeChange = false;
      const newMsg = { sender, text };

      const newConversations = prevConversations.map(
        conversation => {
          if (
            arrayEquality(
              conversation.recipients,
              recipients
            )
          ) {
            madeChange = true;
            return {
              ...conversation,
              messages: [...conversation.messages, newMsg],
            };
          }
          return conversation;
        }
      );

      if (madeChange) {
        return newConversations;
      }

      return [
        ...prevConversations,
        { recipients, messages: [newMsg] },
      ];
    });
  };

  useEffect(() => {
    if (!socket) return;

    socket.on('receive-message', addMessageToConversation);
  }, [socket]);

  const sendMessage = (recipients, text) => {
    socket.emit('send-message', { recipients, text });

    addMessageToConversation({
      recipients,
      text,
      sender: id,
    });
  };

  const createNewConversation = recipients =>
    setConversations(prevConversations => [
      ...prevConversations,
      { recipients, messages: [] },
    ]);

  return (
    <ConversationsContext.Provider
      value={{
        conversations: formattedConversations,
        selectedConversation:
          formattedConversations[selectedConversationIndex],
        selectConversationIndex:
          setSelectedConversationIndex,
        createNewConversation,
        sendMessage,
      }}
    >
      {children}
    </ConversationsContext.Provider>
  );
};
