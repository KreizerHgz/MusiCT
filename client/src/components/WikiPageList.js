import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

export default function NestedList() {
    const [openCT, setOpenCT] = React.useState(false);

    const handleClickCT = () => {
        setOpenCT(!openCT);
    };

    const [openMusic, setOpenMusic] = React.useState(false);

    const handleClickMusic = () => {
        setOpenMusic(!openMusic);
    };

    const [openPed, setOpenPed] = React.useState(false);

    const handleClickPed = () => {
        setOpenPed(!openPed);
    };

    const colorIcon = "rgba(255, 255, 255, 0.7)";

    return (
        <List
            sx={{ width: '100%', maxWidth: 300, bgcolor: 'background.paper', border: 1, height: 'calc(100vh - 74px)' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    Wikisider
                </ListSubheader>
            }
        >
            <Divider />
            <ListItemButton onClick={handleClickCT}>
                <ListItemText disableTypography primary={<Typography type="body2" color="text.secondary">Algoritmisk tenkning</Typography>}
                />
                {openCT ? <ExpandLess htmlColor={colorIcon} /> : <ExpandMore htmlColor={colorIcon} />}
            </ListItemButton>
            <Divider />

            <Collapse in={openCT} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText disableTypography primary={<Typography type="body2" color="text.secondary">Oversikt</Typography>}
                        />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText disableTypography primary={<Typography type="body2" color="text.secondary">MyTitle</Typography>}
                        />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText disableTypography primary={<Typography type="body2" color="text.secondary">MyTitle</Typography>}
                        />
                    </ListItemButton>
                </List>
            </Collapse>
            <Divider />

            <ListItemButton onClick={handleClickMusic}>
                <ListItemText disableTypography primary={<Typography type="body2" color="text.secondary">Musikkteori</Typography>}
                />
                {openMusic ? <ExpandLess htmlColor={colorIcon} /> : <ExpandMore htmlColor={colorIcon} />}
            </ListItemButton>
            <Divider />

            <Collapse in={openMusic} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText disableTypography primary={<Typography type="body2" color="text.secondary">MyTitle</Typography>}
                        />
                    </ListItemButton>
                </List>
            </Collapse>
            <Divider />

            <ListItemButton onClick={handleClickPed}>
                <ListItemText disableTypography primary={<Typography type="body2" color="text.secondary">Pedagogikk</Typography>}
                />
                {openPed ? <ExpandLess htmlColor={colorIcon} /> : <ExpandMore htmlColor={colorIcon} />}
            </ListItemButton>
            <Divider />
            <Collapse in={openPed} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText disableTypography primary={<Typography type="body2" color="text.secondary">MyTitle</Typography>}
                        />
                    </ListItemButton>
                </List>
            </Collapse>
        </List>
    );
}
