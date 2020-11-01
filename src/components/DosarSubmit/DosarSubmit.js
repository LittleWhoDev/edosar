import React, { useEffect, useState } from 'react';
import { Typography, Dialog, Box, Button, FormControl, Input } from '@material-ui/core';
import { statusToString } from "api/dosar"
import { getDosar } from 'api/cetatean';
import { downloadPath } from 'api/acte';
import { PRIMARIE } from 'api/roles';
import { uploadAct } from 'api/acte';
import { updateDosar } from 'api/primarie';
import { createDosar } from 'api/cetatean';

function DosarSubmit({ sablon, onClose, open }) {
    const [files, setFiles] = useState({});
    const [texts, setTexts] = useState({});

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
            <Box>
                <Typography variant="h3">Depune dosar</Typography>
                <Typography variant="h5">{sablon.name}</Typography>
                <br />

                {
                    sablon.necesare.map((elem) => {
                        switch (elem.type) {
                            case 'file':
                                return (<>
                                    {elem.name}: <input type="file" name={elem.name} onChange={(e) => {
                                        setFiles({ ...files, [elem.name]: e.target.files[0] })
                                    }} />
                                    {elem.text}<br />
                                </>);
                                break;
                            case 'text':
                                return (<>
                                    {elem.name}: <input type="text" value={texts[elem.name]} name={elem.name} onChange={(e) => {
                                        setTexts({ ...texts, [elem.name]: e.target.value })
                                    }} />
                                    {elem.text}<br />
                                </>);
                                break;
                        }
                    })

                }
                < Button color="primary"
                    variant="contained"
                    onClick={() => { handleSubmit() }}>Depune</Button>
            </Box>
        </Dialog >
    );
};

export default DosarSubmit;