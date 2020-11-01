import React, { useEffect, useState } from 'react';
import { Typography, Dialog, Box, Button, FormControl, Input } from '@material-ui/core';
import Card from 'components/Card/Card'; 
import CardBody from 'components/Card/CardBody'; 
import CardFooter from 'components/Card/CardFooter'; 
import CardHeader from 'components/Card/CardHeader'; 
import { statusToString } from "api/dosar"
import { getDosar } from 'api/cetatean';
import { downloadPath } from 'api/acte';
import { PRIMARIE } from 'api/roles';
import { uploadAct } from 'api/acte';
import { updateDosar } from 'api/primarie';
import { makeStyles, createStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import PublishIcon from '@material-ui/icons/Publish';


const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#0786e0"
    },
  },
});


function DosarPreview({ dosar, onClose, open }) {
  const [file, setFile] = useState(undefined);
  const isPrimarie = parseInt(localStorage.getItem('role')) === PRIMARIE;

  const [dosarFull, setDosarFull] = useState({ sablon: { necesare: [] } });

  const classes = useStyles();

  useEffect(() => {
    if (!open) return;
    getDosar(dosar._id).then((d) => { setDosarFull(d) });
  }, [open])

  return (
    <Dialog open={open} onClose={onClose} >
      <Box className={classes.container}>
        <Card style={{paddingBottom: "1rem"}}>
          <CardHeader color="info">
            <Typography variant="h2">Vizualizare dosar</Typography>
          </CardHeader>
          <CardBody>
          <Typography variant="body1" className={classes.field}>
            <span>Numar inregistrare:</span> {dosar.nrinreg} 
          </Typography>
          <Typography variant="body1" className={classes.field}>
            <span>Denumire:</span> {dosar.name} 
          </Typography>
          <Typography variant="body1" className={classes.field}>
            <span>Stadiu:</span> {statusToString(dosar.status)} 
          </Typography>
          <Typography variant="body1" className={classes.field}>
            <span>Data:</span> {dosar.createdAt} 
          </Typography>
          {
            dosarFull.sablon.necesare.map((elem) => {
              if (elem.type === "text") return <Typography variant="body1" className={classes.field2}>
                  <span>{elem.name}:</span> {dosarFull[elem.name]} 
                </Typography>
              if (elem.type === "file") {
                return <Typography variant="body1" className={classes.field2}>
                  <span>{elem.name}:</span> <a href={`${downloadPath}/${dosarFull[elem.name]}`}> Vizualizeaza document </a> 
                </Typography>
              }
              return <></>
            })
          }
          </CardBody>
          <ThemeProvider theme={theme}>
          {
            (isPrimarie && dosar.status === 0) ? (<>
              <FormControl>
                <CardFooter>
                  <Button onClick={() => {
                    uploadAct(file).then((r) => {
                      updateDosar(dosar._id, {
                        actRaspuns: r.filename,
                        status: 2,
                      });
                      window.location.href = "/";
                    });
                  }} color="primary" variant="contained"> Valideaza </Button>
                  <Button
                    variant="contained"
                    component="label"
                    startIcon={<PublishIcon/>}
                  >
                    Upload File
                    <input
                      onChange={(e) => { setFile(e.target.files[0]) }}
                      type="file"
                      style={{ display: "none" }}
                    />
                  </Button>

                  <Button onClick={() => {
                    updateDosar(dosar._id, {
                      status: 1,
                    });
                    window.location.href = "/";
                  }} color="secondary" variant="contained"> Respinge </Button>
                </CardFooter>
              </FormControl>
            </>) : null
          }

          {
            (!isPrimarie && dosar.status === 2) ? (<>
              <CardFooter>
                <Typography variant="body1">Raspuns: <a href={`${downloadPath}/${dosarFull.actRaspuns}`}> Vizualizeaza document </a> </Typography>
              </CardFooter>
            </>) : null
          }
          </ThemeProvider>
        </Card>
      </Box>
    </Dialog>
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
    }
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

export default DosarPreview;