import '../App.css';
import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { Box, Button, Divider, FormControl, Grid, MenuItem, styled, TextField } from '@mui/material';
import Navbar from '../components/Navbar';
import { makeStyles } from "@material-ui/core/styles";
import { Link } from 'react-router-dom';

const CssTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'white',
        },
    }
});

const useStyles = makeStyles({
    root: {
        width: 250,
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "white"
        },
        "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "white"
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "white"
        }
    },
    icon: {
        fill: 'white',
    },
});

export default function TaskCreate() {

    const [grade, setGrade] = useState("");
    const [learningObjective, setLearningObjective] = useState("");
    const [equipment, setEquipment] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [succeedes, setSucceedes] = useState(0);
    const [preceedes, setPreceedes] = useState(0);

    const classes = useStyles();

    const [gradeDefined, setGradeDefined] = useState(false);

    useEffect(() => {
        if (grade === "") {
            setGradeDefined(false);
        }
        else {
            setGradeDefined(true);
        }
    }, [grade, gradeDefined]);

    return (
        <Box height={"100vh"} overflow="auto">
            <Navbar />
            <Typography variant="h3" component="div" gutterBottom color='text.primary'>Oppgavebygger</Typography>
            <Divider />
            <Grid
                container spacing={0}
                align="center"
                justify="center"
                direction="column"
                marginTop={"20px"}>
                <Grid container justifyContent="center">
                    <Grid item xs={4}>
                        <FormControl >
                            <TextField
                                value={grade}
                                label="Klassenivå"
                                onChange={(e) => { setGrade(e.target.value) }}
                                className={classes.root}
                                select
                                SelectProps={{
                                    classes: { icon: classes.icon }
                                }}
                            >
                                <MenuItem value={"1. - 2. trinn"}>1. - 2. trinn</MenuItem>
                                <MenuItem value={"3. - 4. trinn"}>3. - 4. trinn</MenuItem>
                                <MenuItem value={"5. - 7. trinn"}>5. - 7. trinn</MenuItem>
                                <MenuItem value={"8. - 10. trinn"}>8. - 10. trinn</MenuItem>
                            </TextField>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl >
                            <TextField
                                value={learningObjective}
                                label="Kompetansemål"
                                onChange={(e) => { setLearningObjective(e.target.value) }}
                                className={classes.root}
                                disabled={!(gradeDefined)}
                                select
                                SelectProps={{
                                    classes: { icon: classes.icon }
                                }}
                            >
                                {grade === "1. - 2. trinn" ? (
                                    <MenuItem value={"Utøve et repertoar av sangleker, sanger og danser hentet fra elevenes nære musikkultur og fra kulturarven"}>
                                        Utøve et repertoar av sangleker, sanger og danser hentet fra elevenes nære musikkultur og fra kulturarven</MenuItem>
                                ) : <></>}
                                {grade === "1. - 2. trinn" ? (
                                    <MenuItem value={"Utforske og eksperimentere med puls, rytme, tempo, klang, melodi, dynamikk, harmoni og form i dans, med stemmen og i spill på instrumenter"}>
                                        Utforske og eksperimentere med puls, rytme, tempo, klang, melodi, dynamikk, harmoni og form i dans, med stemmen og i spill på instrumenter</MenuItem>
                                ) : <></>}
                                {grade === "1. - 2. trinn" ? (
                                    <MenuItem value={"Leke med musikkens grunnelementer gjennom lyd og stemme, lage mønstre og sette sammen mønstrene til enkle improvisasjoner og komposisjoner, også med digitale verktøy"}>
                                        Leke med musikkens grunnelementer gjennom lyd og stemme, lage mønstre og sette sammen mønstrene til enkle improvisasjoner og komposisjoner, også med digitale verktøy</MenuItem>
                                ) : <></>}
                                {grade === "1. - 2. trinn" ? (
                                    <MenuItem value={"Formidle opplevelser av ulike musikalske uttrykk gjennom samtale og kunstneriske uttrykksformer"}>
                                        Formidle opplevelser av ulike musikalske uttrykk gjennom samtale og kunstneriske uttrykksformer</MenuItem>
                                ) : <></>}

                                {grade === "3. - 4. trinn" ? (
                                    <MenuItem value={"Utøve og utforske et repertoar av sanger og danser fra ulike musikkulturer, inkludert samisk musikkultur"}>
                                        Utøve og utforske et repertoar av sanger og danser fra ulike musikkulturer, inkludert samisk musikkultur</MenuItem>
                                ) : <></>}
                                {grade === "3. - 4. trinn" ? (
                                    <MenuItem value={"Synge og spille på instrumenter alene og sammen med andre ved bruk av gehør og enkel notasjon"}>
                                        Synge og spille på instrumenter alene og sammen med andre ved bruk av gehør og enkel notasjon</MenuItem>
                                ) : <></>}
                                {grade === "3. - 4. trinn" ? (
                                    <MenuItem value={"Eksperimentere med rytmer, melodier og andre grunnelementer, sette sammen mønstre til komposisjoner, også ved bruk av digitale verktøy, og beskrive arbeidsprosesser og resultater"}>
                                        Eksperimentere med rytmer, melodier og andre grunnelementer, sette sammen mønstre til komposisjoner, også ved bruk av digitale verktøy, og beskrive arbeidsprosesser og resultater</MenuItem>
                                ) : <></>}
                                {grade === "3. - 4. trinn" ? (
                                    <MenuItem value={"Formidle egne musikkopplevelser og beskrive bruk av musikalske virkemidler ved hjelp av enkle fagbegreper"}>
                                        Formidle egne musikkopplevelser og beskrive bruk av musikalske virkemidler ved hjelp av enkle fagbegreper</MenuItem>
                                ) : <></>}
                                {grade === "3. - 4. trinn" ? (
                                    <MenuItem value={"Samtale om og reflektere over hvordan musikk skaper mening når den brukes i ulike sosiale sammenhenger"}>
                                        Samtale om og reflektere over hvordan musikk skaper mening når den brukes i ulike sosiale sammenhenger</MenuItem>
                                ) : <></>}

                                {grade === "5. - 7. trinn" ? (
                                    <MenuItem value={"Utøve et repertoar av musikk, sang, andre vokale uttrykk og dans fra samtiden og historien"}>
                                        Utøve et repertoar av musikk, sang, andre vokale uttrykk og dans fra samtiden og historien</MenuItem>
                                ) : <></>}
                                {grade === "5. - 7. trinn" ? (
                                    <MenuItem value={"Utforske og drøfte hvordan musikk fra fortiden påvirker dagens musikk"}>
                                        Utforske og drøfte hvordan musikk fra fortiden påvirker dagens musikk</MenuItem>
                                ) : <></>}
                                {grade === "5. - 7. trinn" ? (
                                    <MenuItem value={"Øve inn og framføre sang og musikk, i samspill eller individuelt, gehørbasert og ved bruk av enkle notasjonsteknikker"}>
                                        Øve inn og framføre sang og musikk, i samspill eller individuelt, gehørbasert og ved bruk av enkle notasjonsteknikker</MenuItem>
                                ) : <></>}
                                {grade === "5. - 7. trinn" ? (
                                    <MenuItem value={"Lytte, eksperimentere og skape nye uttrykk med instrumenter, kropp, stemme eller lyd fra andre kilder, og presentere resultatet"}>
                                        Lytte, eksperimentere og skape nye uttrykk med instrumenter, kropp, stemme eller lyd fra andre kilder, og presentere resultatet</MenuItem>
                                ) : <></>}
                                {grade === "5. - 7. trinn" ? (
                                    <MenuItem value={"Bruke teknologi og digitale verktøy til å skape, øve inn og bearbeide musikk"}>
                                        Bruke teknologi og digitale verktøy til å skape, øve inn og bearbeide musikk</MenuItem>
                                ) : <></>}
                                {grade === "5. - 7. trinn" ? (
                                    <MenuItem value={"Bruke fagbegreper i beskrivelse av og refleksjon over arbeidsprosesser, resultater, musikalske uttrykk og virkemidler"}>
                                        Bruke fagbegreper i beskrivelse av og refleksjon over arbeidsprosesser, resultater, musikalske uttrykk og virkemidler</MenuItem>
                                ) : <></>}
                                {grade === "5. - 7. trinn" ? (
                                    <MenuItem value={"Utforske og formidle musikalske opplevelser og erfaringer"}>
                                        Utforske og formidle musikalske opplevelser og erfaringer</MenuItem>
                                ) : <></>}
                                {grade === "5. - 7. trinn" ? (
                                    <MenuItem value={"Undersøke hvordan kjønn, kjønnsroller og seksualitet fremstilles i musikk og dans i det offentlige rom, og skape uttrykk som utfordrer stereotypier"}>
                                        Undersøke hvordan kjønn, kjønnsroller og seksualitet fremstilles i musikk og dans i det offentlige rom, og skape uttrykk som utfordrer stereotypier</MenuItem>
                                ) : <></>}
                                {grade === "5. - 7. trinn" ? (
                                    <MenuItem value={"Reflektere over hvordan musikk kan spille ulike roller for utvikling av individer og gruppers identitet"}>
                                        Reflektere over hvordan musikk kan spille ulike roller for utvikling av individer og gruppers identitet</MenuItem>
                                ) : <></>}

                                {grade === "8. - 10. trinn" ? (
                                    <MenuItem value={"Utøve et variert repertoar av musikk, sang, andre vokale uttrykk og dans"}>
                                        Utøve et variert repertoar av musikk, sang, andre vokale uttrykk og dans</MenuItem>
                                ) : <></>}
                                {grade === "8. - 10. trinn" ? (
                                    <MenuItem value={"Reflektere over hvordan musikalske tradisjoner, inkludert samiske musikktradisjoner, bevares og fornyes"}>
                                        Reflektere over hvordan musikalske tradisjoner, inkludert samiske musikktradisjoner, bevares og fornyes</MenuItem>
                                ) : <></>}
                                {grade === "8. - 10. trinn" ? (
                                    <MenuItem value={"Samarbeide med andre om å planlegge og gjennomføre øvingsprosesser hvor det inngår selvvalgt sang, andre vokale uttrykk, spill på instrumenter eller dans, og formidle resultatet i gruppe eller individuelt"}>
                                        Samarbeide med andre om å planlegge og gjennomføre øvingsprosesser hvor det inngår selvvalgt sang, andre vokale uttrykk, spill på instrumenter eller dans, og formidle resultatet i gruppe eller individuelt</MenuItem>
                                ) : <></>}
                                {grade === "8. - 10. trinn" ? (
                                    <MenuItem value={"Skape og programmere musikalske forløp ved å eksperimentere med lyd fra ulike kilder"}>
                                        Skape og programmere musikalske forløp ved å eksperimentere med lyd fra ulike kilder</MenuItem>
                                ) : <></>}
                                {grade === "8. - 10. trinn" ? (
                                    <MenuItem value={"Utforske og formidle musikalske opplevelser og erfaringer, og reflektere over bruk av musikalske virkemidler"}>
                                        Utforske og formidle musikalske opplevelser og erfaringer, og reflektere over bruk av musikalske virkemidler</MenuItem>
                                ) : <></>}
                                {grade === "8. - 10. trinn" ? (
                                    <MenuItem value={"Lytte og prøve ut ulike uttrykk og begrunne valg i skapende prosesser fra idé til ferdig resultat"}>
                                        Lytte og prøve ut ulike uttrykk og begrunne valg i skapende prosesser fra idé til ferdig resultat</MenuItem>
                                ) : <></>}
                                {grade === "8. - 10. trinn" ? (
                                    <MenuItem value={"Bruke gehør og notasjonsteknikker som støtte i skapende arbeid"}>
                                        Bruke gehør og notasjonsteknikker som støtte i skapende arbeid</MenuItem>
                                ) : <></>}
                                {grade === "8. - 10. trinn" ? (
                                    <MenuItem value={"Bruke relevante fagbegreper i skapende arbeid og i refleksjon over prosesser og resultater"}>
                                        Bruke relevante fagbegreper i skapende arbeid og i refleksjon over prosesser og resultater</MenuItem>
                                ) : <></>}
                                {grade === "8. - 10. trinn" ? (
                                    <MenuItem value={"Utforske og reflektere over hvordan musikk, sang og dans som estetiske uttrykk er påvirket av og uttrykk for historiske og samfunnsmessige forhold, og skape musikalske uttrykk som tar opp utfordringer i samtiden"}>
                                        Utforske og reflektere over hvordan musikk, sang og dans som estetiske uttrykk er påvirket av og uttrykk for historiske og samfunnsmessige forhold, og skape musikalske uttrykk som tar opp utfordringer i samtiden</MenuItem>
                                ) : <></>}
                                {grade === "8. - 10. trinn" ? (
                                    <MenuItem value={"Utforske og drøfte musikkens og dansens betydning i samfunnet og etiske problemstillinger knyttet til musikalske ytringer og musikkulturer"}>
                                        Utforske og drøfte musikkens og dansens betydning i samfunnet og etiske problemstillinger knyttet til musikalske ytringer og musikkulturer</MenuItem>
                                ) : <></>}
                            </TextField>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl >
                            <TextField
                                value={equipment}
                                label="Utstyr/Plattform"
                                onChange={(e) => { setEquipment(e.target.value) }}
                                className={classes.root}
                                select
                                SelectProps={{
                                    classes: { icon: classes.icon }
                                }}
                            >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </TextField>
                        </FormControl>
                    </Grid>
                </Grid>
            </Grid>
            <CssTextField label="Tittel" id="custom-css-outlined-input" sx={{ width: 600, marginTop: "20px" }} onChange={(e) => { setTitle(e.target.value) }} />
            <div>
                <CssTextField
                    id="outlined-multiline-static"
                    label="Oppgavebeskrivelse"
                    multiline
                    rows={15}
                    sx={{ width: 600, marginTop: "20px", marginBottom: "20px" }}
                    onChange={(e) => { setDescription(e.target.value) }}
                />
            </div>
            <div>
                <FormControl >
                    <TextField
                        value={succeedes}
                        label="Bygger videre på"
                        onChange={(e) => { setSucceedes(e.target.value) }}
                        className={classes.root}
                        sx={{ marginBottom: "20px" }}
                        select
                        SelectProps={{
                            classes: { icon: classes.icon }
                        }}
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </TextField>
                </FormControl>
            </div>
            <div>
                <FormControl >
                    <TextField
                        value={preceedes}
                        label="Neste nivå"
                        onChange={(e) => { setPreceedes(e.target.value) }}
                        className={classes.root}
                        sx={{ marginBottom: "20px" }}
                        select
                        SelectProps={{
                            classes: { icon: classes.icon }
                        }}
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </TextField>
                </FormControl>
            </div>
            <div>
                <Button variant="contained" sx={{ margin: "20px" }}>Lagre</Button>
                <Button variant="outlined" component={Link} to="/" sx={{ margin: "20px" }}>Avbryt</Button>
            </div>
        </Box>
    );
}