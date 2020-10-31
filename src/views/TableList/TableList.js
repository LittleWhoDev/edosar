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

import { getStatistics, getDosare } from "../../api/cetatean";
import { useAuth } from "api/auth";
import { statusToString } from "api/dosar";
import DosarPreview from "components/DosarPreview/DosarPreview"

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

export default function TableList() {
  useAuth();
  const [dosare, setDosare] = useState([]);
  const [dosarCur, setDosarCur] = useState({});
  const [dosarViewOpen, setDosarViewOpen] = useState(false);

  useEffect(() => {
    getDosare().then((dosare) => {
      const newDosare = [];
      dosare.forEach((elem, i) => {
        if (i > 2) return;
        newDosare.push([
          i + 1,
          elem.nrinreg,
          elem.name,
          statusToString(elem.status),
          elem.createdAt,
          <Button onClick={() => {
            setDosarCur(elem);
            setDosarViewOpen(true);
          }} color="primary"
            variant="contained">Vizualizare</Button>
        ]);
      })
      setDosare(newDosare);
    });
  }, []);

  const classes = useStyles();
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Istoric depuneri dosare</h4>
            <p className={classes.cardCategoryWhite}>
              Verifica dosarele depuse de tine
            </p>
          </CardHeader>
          <CardBody>
            <DosarPreview dosar={dosarCur} open={dosarViewOpen} onClose={() => {
              setDosarViewOpen(false);
            }} />
            <Table
              tableHeaderColor="primary"
              tableHead={["Nr. Crt", "Nr. Inreg", "Denumire", "Stadiu", "Data", "Actiuni"]}
              tableData={dosare}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
