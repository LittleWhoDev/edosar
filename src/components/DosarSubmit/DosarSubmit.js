import React, { useEffect, useState } from 'react';
import { Typography, Dialog, Box, Button, FormControl, Input } from '@material-ui/core';
import { statusToString } from "api/dosar"
import { getDosar } from 'api/cetatean';
import { downloadPath } from 'api/acte';
import { PRIMARIE } from 'api/roles';
import { uploadAct } from 'api/acte';
import { updateDosar } from 'api/primarie';
import { createDosar } from 'api/cetatean';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import CardFooter from 'components/Card/CardFooter';
import { makeStyles, createStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#0786e0"
        },
    },
});

function DosarSubmit({ sablon, onClose, open }) {
    const [files, setFiles] = useState({});
    const [texts, setTexts] = useState({});
    const classes = useStyles();

    async function handleSubmit() {
        const acts = {};
        for (const filek in files) {
            acts[filek] = (await uploadAct(files[filek])).filename;
        }

        await createDosar({
            name: sablon.name,
            sablon: sablon._id,
            ...texts,
            ...acts,
        });
        window.location.href = '/';
    }

    if (!open) return <></>;

    return (
        <Dialog open={open} onClose={onClose}>
            <Box className={classes.container}>
                <Card style={{ paddingBottom: "1rem" }}>
                    <CardHeader color="info">
                        <Typography variant="h4">{sablon.name}</Typography>
                    </CardHeader>
                    <CardBody>
                        {
                            sablon.necesare.map((elem) => {
                                switch (elem.type) {
                                    case 'file':
                                        return (<>
                                            <Typography class={classes.field}><span>{elem.name}:</span> <input type="file" name={elem.name} onChange={(e) => {
                                                setFiles({ ...files, [elem.name]: e.target.files[0] })
                                            }} /></Typography>

                                        </>);
                                        break;
                                    case 'text':
                                        return (<>
                                            {elem.name}: <input type="text" value={texts[elem.name]} name={elem.name} onChange={(e) => {
                                                setTexts({ ...texts, [elem.name]: e.target.value })
                                            }} />
                                        </>);
                                        break;
                                }
                            })

                        }
                    </CardBody>
                    <CardFooter style={{ alignItems: "center", justifyContent: "center" }}>
                        <ThemeProvider theme={theme}>
                            < Button color="primary"
                                variant="contained"
                                onClick={() => { handleSubmit() }}>Depune</Button>
                        </ThemeProvider>
                    </CardFooter>
                </Card>

            </Box>
        </Dialog >
    );
};

const useStyles = makeStyles(createStyles({
    field: {
        padding: '0.5rem',
        borderRadius: '20px',
        fontSize: "1.2rem",
        "& span": {
            fontWeight: "900",
            fontSize: "1.2em",
        },
        "&:hover": {
            backgroundColor: "#caeaed"
        },
        overflow: "hidden",
    },
    field2: {
        padding: '0.2rem',
        borderRadius: '20px',
        "& span": {
            fontSize: "1rem",
            fontWeight: "500",
        }
    },
    container: {
        padding: "0 2rem",
    }
}))

export default DosarSubmit;