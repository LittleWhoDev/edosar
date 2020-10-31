import React, {useState, useEffect} from "react";
import axios from "axios";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import {getDosare} from "../../api/cetatean";

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

const token =  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmOWRhYjg4MGI1Y2U0MGRmZTIzYjZmMSIsInVzZXJuYW1lIjoiY2V0YXRlYW51bCB4IiwiaWF0IjoxNjA0MTY4NTk3fQ.dpiqkUgd-azn6WT-4Wib3oZ8yuWGqt5XPpHY7mnMO5o";

export default function TableList() {
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;

  const [dosare, setDosare] = useState([]);

  useEffect(() => {
      getDosare().then((dosare) => {
          const newDosare = [];
          dosare.forEach((elem, i) => {
              newDosare.push([
                  i+1,
                  elem.nrinreg,
                  elem.name,
                  {
                      0: "In lucru",
                      1: "Respins",
                      2: "Validat",
                  }[elem.status],
                  elem.createdAt,
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
            <Table
              tableHeaderColor="primary"
              tableHead={["Nr. Crt", "Nr. Inreg", "Denumire", "Stadiu", "Data"]}
              tableData={dosare}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
