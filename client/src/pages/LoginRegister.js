import '../App.css';
import { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button, Stack, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import Navbar from '../components/Navbar';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../UserContext';

const CssTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'white',
        },
    }
});


export default function LoginRegister() {

    const [usernameReg, setUsernameReg] = useState('');
    const [passwordReg, setPasswordReg] = useState('');

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { value, setValue } = useContext(UserContext);


    const register = () => {
        Axios.post('http://localhost:3001/register', { username: usernameReg, password: passwordReg }).then((response) => {
            console.log(response);
        });
    };

    const login = () => {
        Axios.post('http://localhost:3001/login', { username: username, password: password }).then((response) => {
            if (response.data.message) {
            } else {
                setValue(true);
            }
            console.log(response.data);
        });
    };

    let navigate = useNavigate();

    useEffect(() => {
        if (value === false) {
        }
        else if (value === true) {
            return navigate("/");
        }
    }, [value, navigate]);

    return (
        <Box height={"100vh"} overflow="auto">
            <Navbar />
            <Typography variant="h4" component="div" color='text.primary' paddingTop={10} paddingBottom={2}>Registrer deg</Typography>
            <Stack width={200} spacing={2} justifyContent="center" alignItems="center" margin={"auto"}>
                <CssTextField label="Brukernavn" id="custom-css-outlined-input" onChange={(e) => { setUsernameReg(e.target.value) }} />
                <CssTextField label="Passord" id="custom-css-outlined-input" onChange={(e) => { setPasswordReg(e.target.value) }} />
                <Button variant="contained" onClick={register}>Registrer bruker</Button>
            </Stack>

            <Typography variant="h4" component="div" color='text.primary' paddingTop={5} paddingBottom={2}>Logg inn</Typography>
            <Stack width={200} spacing={2} justifyContent="center" alignItems="center" margin={"auto"}>
                <CssTextField label="Brukernavn" id="custom-css-outlined-input" onChange={(e) => { setUsername(e.target.value) }} />
                <CssTextField label="Passord" id="custom-css-outlined-input" onChange={(e) => { setPassword(e.target.value) }} />
                <Button variant="contained" onClick={login}>Logg inn</Button>
            </Stack>
        </Box >
    )
}