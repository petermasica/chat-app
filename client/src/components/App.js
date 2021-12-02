import useLocalStorage from '../hooks/useLocalStorage';
import { ContactsProvider } from '../context/ContactsProvider';
import { ConversationsProvider } from '../context/ConversationsProvider';
import { SocketProvider } from '../context/SocketProvider';
import Layout from './Layout';
import Login from './Login';

import MUIThemeProvider from '../MUIThemeProvider';

function App() {
  const [id, setId] = useLocalStorage('key');

  return (
    <MUIThemeProvider>
      {id ? (
        <SocketProvider id={id}>
          <ContactsProvider>
            <ConversationsProvider id={id}>
              <Layout id={id} />
            </ConversationsProvider>
          </ContactsProvider>
        </SocketProvider>
      ) : (
        <Login onIdSubmit={setId} />
      )}
    </MUIThemeProvider>
  );
}

export default App;
