import './App.css';
import FrontPage from './pages/FrontPage';
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Wiki from './pages/Wiki';
import TaskCreate from './pages/TaskCreate';
import TaskBrowse from './pages/TaskBrowse';
import { createTheme, ThemeProvider } from '@mui/material';
import LoginRegister from './pages/LoginRegister';
import { UserContext } from './UserContext';
import Task from './pages/Task';
import WikiCreate from './pages/WikiCreate';

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
  },
  overrides: {
    MuiSelect: {
      select: {
        "&:focus": {
          borderColor: 'white'
        },
        '&:before': {
          borderColor: 'white'
        },
        '&:after': {
          borderColor: 'white'
        },
      },
    },
  },
  components: {
    MuiMenuItem: {
      styleOverrides: {
        root: {
          whiteSpace: 'normal',
          width: 400,
        },
      },
    },
  },
});

function App() {

  const [value, setValue] = useState(false);

  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <UserContext.Provider value={{ value, setValue }}>
            <Routes>
              <Route path="/" element={<FrontPage />} />
              <Route path="/wiki" element={<Wiki />} />
              <Route path="/wikicreate" element={<WikiCreate />} />
              <Route path="/lagoppgave" element={<TaskCreate />} />
              <Route path="/seoppgaver" element={<TaskBrowse />} />
              <Route path="/innlogging" element={<LoginRegister />} />
              <Route path="/task/:id" element={<Task />} />
            </Routes>
          </UserContext.Provider>
        </ThemeProvider>
      </BrowserRouter>
    </div >
  );
}

export default App;
