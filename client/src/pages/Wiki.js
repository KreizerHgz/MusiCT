import '../App.css';
import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';


export default function Wiki() {
    return (
        <div className='App'>
            <Box height={"100vh"}>
                <Typography variant="h1" component="div" gutterBottom color='text.primary'>Wiki</Typography>
            </Box>
        </div>
    );
}