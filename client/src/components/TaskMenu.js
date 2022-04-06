import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { makeStyles } from "@material-ui/core/styles";
import { Link } from 'react-router-dom';
import Axios from 'axios';

const useStyles = makeStyles({
    icon: {
        fill: 'white',
    },
});

export default function TaskMenu(props) {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const deleteTask = (e) => {
        console.log(e);
        Axios.post('http://localhost:3001/deletetask', {
            taskID: e.TaskID
        }).then((response) => {
            alert("Oppgaven er slettet");
        })
    };

    return (
        <div>
            <IconButton
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <MoreVertIcon className={classes.icon} />
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem component={Link} to={"/oppgave/" + props.element.TaskID}>Åpne Oppgaveside</MenuItem>
                <MenuItem component={Link} to={"/rediger/" + props.element.TaskID}>Rediger Oppgave</MenuItem>
                <MenuItem onClick={() => { deleteTask(props.element); handleClose() }}>Slett Oppgave</MenuItem>
                <MenuItem onClick={handleClose}>Endre synlighet</MenuItem>
            </Menu>
        </div>
    );
}
