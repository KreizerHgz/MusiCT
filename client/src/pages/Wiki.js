import '../App.css';
import * as React from 'react';
import { Box } from '@mui/material';
import Navbar from '../components/Navbar';
import WikiPageList from '../components/WikiPageList';

export default function Wiki() {
    return (
        <div className='App'>
            <Box height="100vh" >
                <Navbar />
                <WikiPageList />





            </Box>
        </div>
    );
}