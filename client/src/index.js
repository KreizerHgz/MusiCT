import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Wiki from './pages/Wiki';
import TaskCreate from './pages/TaskCreate';
import TaskBrowse from './pages/TaskBrowse';
import { createTheme, ThemeProvider } from '@mui/material';

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

ReactDOM.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="wiki" element={<Wiki />} />
        <Route path="lagoppgave" element={<TaskCreate />} />
        <Route path="seoppgaver" element={<TaskBrowse />} />
      </Routes>
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById('root')
);