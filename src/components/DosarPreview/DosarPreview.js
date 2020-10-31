import React from 'react';
import { Typography, Dialog, Box } from '@material-ui/core';
import { statusToString } from "api/dosar"

function DosarPreview({ dosar, onClose, open }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <Box>
        <Typography variant="h2">Vizualizare dosar</Typography>
        <br />
        <Typography variant="body1">Numar inregistrare: {dosar.nrinreg} </Typography>
        <Typography variant="body1">Denumire: {dosar.name} </Typography>
        <Typography variant="body1">Stadiu: {statusToString(dosar.status)} </Typography>
        <Typography variant="body1">Data: {dosar.createdAt} </Typography>
      </Box>
    </Dialog>
  );
};

export default DosarPreview;