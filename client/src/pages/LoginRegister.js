import '../App.css';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button, Stack, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import Navbar from '../components/Navbar';
import { useNavigate } from "react-router-dom";

const CssTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'white',
        },
    }
});


export default function LoginRegister() {

    const [usernameReg, setUsernameReg] = useState('')
    const [passwordReg, setPasswordReg] = useState('')

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [loginStatus, setLoginStatus] = useState('')

    const register = () => {
        Axios.post('http://localhost:3001/register', { username: usernameReg, password: passwordReg }).then((response) => {
            console.log(response);
        });
    };

    const login = () => {
        Axios.post('http://localhost:3001/login', { username: username, password: password }).then((response) => {
            if (response.data.message) {
                setLoginStatus(response.data.message);
            } else {
                setLoginStatus(response.data[0].Username);
                this.props.history.push('/')
            }
            console.log(response.data);
            console.log(loginStatus);
        });
    };

    let navigate = useNavigate();

    useEffect(() => {
        if (loginStatus === "No user found") {
        }
        else if (loginStatus === '') {
        }
        else {
            return navigate("/");
        }
    }, [loginStatus, navigate]);

    return (
        <div className='App'>
            <Box height={"100vh"}>
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
        </div >
    )
}