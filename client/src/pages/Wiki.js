import '../App.css';
import * as React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import Navbar from '../components/Navbar';
import WikiPageList from '../components/WikiPageList';

export default function Wiki() {
    return (
        <Box height="100vh" overflow="auto">
            <Navbar />
            <Grid container spacing={0}>
                <Grid item xs={3}>
                    <WikiPageList />
                </Grid>
                <Grid item xs={6}>
                    <Typography align={"left"} color="text.secondary">

                    </Typography>
                </Grid>
            </Grid>




        </Box>
    );
}