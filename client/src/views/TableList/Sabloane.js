import React, { useState, useEffect } from "react";
import axios from "axios";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import { useAuth } from "api/auth";
import DosarPreview from "components/DosarPreview/DosarPreview"
import { getSabloane } from "api/cetatean";
import DosarSubmit from "components/DosarSubmit/DosarSubmit";

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
  }
};

const useStyles = makeStyles(styles);

export default function Sabloane() {
  useAuth();
  const [sabloane, setSabloane] = useState([]);
  const [openDosarSubmit, setOpenDosarSubmit] = useState(false);
  const [sablonCur, setSablonCur] = useState({ necesare: [] });

  useEffect(() => {
    getSabloane().then((r) => {
      const kasd = [];
      r.forEach((elem, i) => {
        kasd.push([i + 1, elem.name, <Button onClick={() => { setSablonCur(elem); setOpenDosarSubmit(true) }} color="primary"
          variant="contained">Depune dosar</Button>]);
      })
      setSabloane(kasd);
    })
  }, []);

  const classes = useStyles();
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Depune dosar</h4>
            <p className={classes.cardCategoryWhite}>
              ...
            </p>
          </CardHeader>
          <CardBody>
            <DosarSubmit sablon={sablonCur} open={openDosarSubmit} onClose={() => { setOpenDosarSubmit(false) }} />
            <Table
              tableHeaderColor="primary"
              tableHead={["Nr. Crt", "Denumire", "Actiuni"]}
              tableData={sabloane}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
