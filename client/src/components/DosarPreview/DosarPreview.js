import React, { useEffect, useState } from 'react';
import { Typography, Dialog, Box, Button, FormControl, Input } from '@material-ui/core';
import { statusToString } from "api/dosar"
import { getDosar } from 'api/cetatean';
import { downloadPath } from 'api/acte';
import { PRIMARIE } from 'api/roles';
import { uploadAct } from 'api/acte';
import { updateDosar } from 'api/primarie';

function DosarPreview({ dosar, onClose, open }) {
  const [file, setFile] = useState(undefined);
  const isPrimarie = parseInt(localStorage.getItem('role')) === PRIMARIE;

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

        {
          (isPrimarie && dosar.status === 0) ? (<>
            <FormControl>
              <Button
                variant="contained"
                component="label"
              >
                Upload File
                <input
                  onChange={(e) => { setFile(e.target.files[0]) }}
                  type="file"
                  style={{ display: "none" }}
                />
              </Button>

              <Button onClick={() => {
                uploadAct(file).then((r) => {
                  updateDosar(dosar._id, {
                    actRaspuns: r.filename,
                    status: 2,
                  });
                  window.location.href = "/";
                });
              }}> Valideaza </Button>
              <Button onClick={() => {
                updateDosar(dosar._id, {
                  status: 1,
                });
                window.location.href = "/";
              }}> Respinge </Button>
            </FormControl>
          </>) : null
        }

        {
          (!isPrimarie && dosar.status === 2) ? (<>
            <Typography variant="body1">Raspuns: <a href={`${downloadPath}/${dosarFull.actRaspuns}`}> Vizualizeaza document </a> </Typography>
          </>) : null
        }
      </Box>
    </Dialog>
  );
};

export default DosarPreview;