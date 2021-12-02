import { Paper } from '@mui/material';
import {
  createTheme,
  ThemeProvider,
} from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const MUIThemeProvider = ({ children }) => (
  <ThemeProvider theme={darkTheme}>
    <Paper sx={{ height: '100vh' }} square elevation={2}>
      {children}
    </Paper>
  </ThemeProvider>
);

export default MUIThemeProvider;
