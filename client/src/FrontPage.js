import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea, Grid } from '@mui/material';


export default function FrontPage() {
    return (
        <Box height={"100vh"}>
            <Typography variant="h1" component="div" gutterBottom color='text.primary'>MusiCT</Typography>
            <Grid container spacing={0}>
                <Grid container justifyContent="center">
                    <Grid item xs={4}>
                        <Card sx={{ margin: "20px", marginTop: "150px" }}>
                            <CardActionArea>
                                <CardContent>
                                    <Typography gutterBottom variant="h3" component="div">
                                        Wikisider
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Her kan du finne mer informasjon om algoritmisk tenkning og hvordan det kan integreres i musikkundervisningen
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item xs={4}>
                        <Card sx={{ margin: "20px", marginTop: "150px" }}>
                            <CardActionArea>
                                <CardContent>
                                    <Typography gutterBottom variant="h3" component="div">
                                        Lag en oppgave
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Her kan du lage en oppgave til bruk i undervisningen som passer deg og din klasse gjennom vår mal-baserte
                                        oppgavebygger
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item xs={4}>
                        <Card sx={{ margin: "20px", marginTop: "150px" }}>
                            <CardActionArea>
                                <CardContent>
                                    <Typography gutterBottom variant="h3" component="div">
                                        Søk i oppgaver
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Her kan du gå gjennom alle oppgavene i vår database og sortere etter klassenivå og plattform
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}