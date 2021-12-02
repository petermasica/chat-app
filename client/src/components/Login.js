import { useRef, useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
import {
  Button,
  Container,
  TextField,
} from '@mui/material';
// import { Button, Container, Form } from 'react-bootstrap';

const Login = ({ onIdSubmit }) => {
  const idRef = useRef();
  const [error, setError] = useState(false);

  const onlogin = () => {
    const id = idRef.current.value;
    if (!id) {
      return setError(true);
    }
    onIdSubmit(id);
  };

  const onCreateNewId = () => {
    const id = uuidV4();
    onIdSubmit(id);
  };

  return (
    <Container
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flexStart',
        alignContent: 'center',
        height: '100vh',
        width: {
          xs: '100%',
          sm: '80%',
          md: '50%',
        },
      }}
    >
      <TextField
        label="Your Id"
        error={error}
        inputRef={idRef}
        required
        fullWidth
        margin="normal"
        variant="outlined"
        helperText={error && 'Id of type uuid is required'}
      />
      <Button onClick={onlogin} variant="contained">
        Login
      </Button>
      <Button
        onClick={onCreateNewId}
        variant="outlined"
        sx={{ ml: 1 }}
      >
        Create a new Id
      </Button>
    </Container>
  );
};

// const Login = ({ id, onIdSubmit }) => {
//   const idRef = useRef();

//   const handleSubmit = e => {
//     e.preventDefault();
//     const id = idRef.current.value;
//     onIdSubmit(id);
//   };

//   const createNewId = () => {
//     const id = uuidV4();
//     onIdSubmit(id);
//   };

//   return (
//     <Container
//       className="d-flex align-items-center"
//       style={{ height: '100vh' }}
//     >
//       <Form className="w-100" onSubmit={handleSubmit}>
//         <Form.Group>
//           <Form.Label>Enter your Id</Form.Label>
//           <Form.Control type="text" ref={idRef} required />
//         </Form.Group>
//         <Button type="submit" className="mt-2 me-2">
//           Login
//         </Button>
//         <Button
//           onClick={createNewId}
//           variant="secondary"
//           className="mt-2"
//         >
//           Create a new Id
//         </Button>
//       </Form>
//     </Container>
//   );
// };

export default Login;
