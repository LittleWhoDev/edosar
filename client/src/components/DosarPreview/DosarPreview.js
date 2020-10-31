import React from 'react';
import { Typography, Dialog, Box } from '@material-ui/core';

function DosarPreview () {

  return (
    <Dialog>
      <Box>
        <Typography variant="h2">Vizualizare dosar</Typography>
        <br/>
        <Typography variant="body1">Numar inregistrare: 123 </Typography>
        <Typography variant="body1">Denumire: dosar1 </Typography>
        <Typography variant="body1">Stadiu: In asteptare </Typography>
        <Typography variant="body1">Data: 18/10/2020 </Typography>
      </Box>
    </Dialog>
  );
};

export default DosarPreview;