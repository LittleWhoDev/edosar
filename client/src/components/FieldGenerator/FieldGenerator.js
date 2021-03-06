import React, { useState } from 'react';
import { Box, MenuItem, Button, Typography, TextField } from '@material-ui/core';
import CardBody from "components/Card/CardBody.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import { makeStyles } from '@material-ui/core/styles';
import { createSablon } from 'api/primarie';

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  },
};
const useStyles = makeStyles(styles);
const defaultLastField = { nume: "", tip: "" };


function DosarPreview() {

  const [fields, setFields] = useState([
    {
      id: 0,
      nume: "nume camp",
      tip: "text",
    }
  ]);
  const [lastField, setLastField] = useState(defaultLastField);
  const [titluDosar, setTitluDosar] = useState("Titlu sablon dosar");

  let maxId = fields !== [] ? Math.max.apply(Math, fields.map(function (o) { return o.id; })) : 0;

  function handleAddField() {
    maxId = maxId + 1;
    setFields([...fields, { ...lastField, id: maxId }])
    setLastField(defaultLastField);
  }

  function handleAddSablon() {
    let sablon = { titluDosar: titluDosar, campuri: fields }
    const necesare = sablon.campuri.map((elem) => ({
      name: elem.nume,
      type: elem.tip,
      text: "",
    }))

    createSablon({
      name: sablon.titluDosar,
      necesare,
    }).then((r) => {
      window.location.href = '/';
    });
  }

  function handleChangeField(id, val) {
    let variab = fields.map(elem => (elem.id === id) ? { ...elem, ...val } : elem)
    setFields(variab)
    console.log(variab)
  }

  var options = ["text", "file"]
  var classes = useStyles();
  return (
    <Card>
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>Lista cu campuri</h4>
        <p className={classes.cardCategoryWhite}>
          Adauga dosar tip
        </p>
      </CardHeader>
      <CardBody>
        <TextField label="Titlu dosar" value={titluDosar} onChange={(e) => setTitluDosar(e.target.value)} />
        <br />
        <br />
        {fields.map(field => <>
          <Box style={{ marginRight: "2rem" }} display="inline">
            <TextField id={field.id} label="Camp" value={field.nume} onChange={(e) => handleChangeField(field.id, { nume: e.target.value })} />
          </Box>
          <TextField select label="tip" value={field.tip} onChange={(e) => handleChangeField(field.id, { tip: e.target.value })}>
            {options.map(elem => <MenuItem value={elem} >{elem}</MenuItem>)}
          </TextField>
          <br />
        </>
        )}
        <Box style={{ marginRight: "2rem" }} display="inline">
          <TextField label="Camp" value={lastField.nume} onChange={(e) => setLastField({ ...lastField, nume: e.target.value })} />
        </Box>
        <TextField select label="tip" value={lastField.tip} onChange={(e) => setLastField({ ...lastField, tip: e.target.value })}>
          {options.map(elem => <MenuItem value={elem}>{elem}</MenuItem>)}
        </TextField>
      </CardBody>
      <CardFooter>
        <Button onClick={handleAddField} variant="contained" color="primary">Adauga camp</Button>
        <Button onClick={handleAddSablon} variant="contained" color="primary">Finalizare sablon</Button>
      </CardFooter>
    </Card>
  );
};

export default DosarPreview;