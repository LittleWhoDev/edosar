import React, { useEffect, useState } from 'react';
import { Typography, Dialog, Box } from '@material-ui/core';
import { statusToString } from "api/dosar"
import { getDosar } from 'api/cetatean';
import { downloadPath } from 'api/acte';

function DosarPreview({ dosar, onClose, open }) {
  const [dosarFull, setDosarFull] = useState({ sablon: { necesare: [] } });

  useEffect(() => {
    if (!open) return;
    getDosar(dosar._id).then((d) => { setDosarFull(d) });
  }, [open])

  return (
    <Dialog open={open} onClose={onClose}>
      <Box>
        <Typography variant="h2">Vizualizare dosar</Typography>
        <br />
        <Typography variant="body1">Numar inregistrare: {dosar.nrinreg} </Typography>
        <Typography variant="body1">Denumire: {dosar.name} </Typography>
        <Typography variant="body1">Stadiu: {statusToString(dosar.status)} </Typography>
        <Typography variant="body1">Data: {dosar.createdAt} </Typography>
        {
          dosarFull.sablon.necesare.map((elem) => {
            if (elem.type === "text") return <Typography variant="body1">{elem.name}: {dosarFull[elem.name]} </Typography>
            if (elem.type === "file") {
              return <Typography variant="body1">{elem.name}: <a href={`${downloadPath}/${dosarFull[elem.name]}`}> Vizualizeaza document </a> </Typography>
            }
            return <></>
          })
        }
      </Box>
    </Dialog>
  );
};

export default DosarPreview;