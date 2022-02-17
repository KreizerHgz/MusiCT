import '../App.css';
import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import Navbar from '../components/Navbar';

export default function TaskBrowse() {
    return (
        <div className='App'>
            <Box height={"100vh"}>
                <Navbar />
                <Typography variant="h1" component="div" gutterBottom color='text.primary'>Søk i oppgaver</Typography>
            </Box>
        </div>
    );
}