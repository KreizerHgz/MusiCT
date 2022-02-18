import '../App.css';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';

export default function Navbar() {

    const { value, setValue } = React.useContext(UserContext);

    const logout = () => {
        setValue(false);
    }

    return (
        <Box sx={{ flexGrow: 1, height: "64px" }}>
            <AppBar position="static" color='' sx={{ height: "64px" }}>
                <Toolbar sx={{ height: "64px" }}>
                    <Button disabled></Button>
                    <Typography variant="h4" sx={{ flexGrow: 1 }} component={Link} to="/" style={{ textDecoration: 'none', color: 'unset' }}>
                        MusiCT
                    </Typography>
                    {value === true ? (<Button color="inherit" onClick={logout} component={Link} to="/">Logg ut</Button>
                    ) : (
                        <Button color="inherit" component={Link} to="/innlogging">Logg inn</Button>)}
                </Toolbar>
            </AppBar>
        </Box>
    );
}
