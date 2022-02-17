import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import * as React from 'react';
import FrontPage from './FrontPage';

const theme = createTheme({
  palette: {
    type: 'dark',
    error: {
      main: '#FF9292',
    },
    primary: {
      light: '#769CFF',
      main: '#769CFF',
      dark: '#404040', // Dark 1
      contrastText: '#FFFFFF',
    },
    text: {
      primary: 'rgba(255, 255, 255, 0.9)',
      secondary: 'rgba(255, 255, 255, 0.7)',
      disabled: 'rgba(255, 255, 255, 0.6)',
    },
    background: {
      default: '#404040', // Dark 2
      paper: '#404040', // Dark 1
    },
  }
});



function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <FrontPage />
      </ThemeProvider>
    </div >
  );
}

export default App;
