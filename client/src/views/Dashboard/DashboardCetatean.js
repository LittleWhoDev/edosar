import React from "react";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import Accessibility from "@material-ui/icons/Accessibility";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import { Button, Typography } from "@material-ui/core";

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>content_copy</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Dosare depuse</p>
              <h3 className={classes.cardTitle}>
                55 
              </h3>
            </CardHeader>
            <CardFooter/>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Icon>find_in_page</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Dosare in lucru</p>
              <h3 className={classes.cardTitle}>
                30 
              </h3>
            </CardHeader>
            <CardFooter/>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Icon>done_all</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Dosare validate</p>
              <h3 className={classes.cardTitle}>
                20
              </h3>
            </CardHeader>
            <CardFooter/>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>highlight_off</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Dosare respinse</p>
              <h3 className={classes.cardTitle}>
                5
              </h3>
            </CardHeader>
            <CardFooter/>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Ultimele dosare</h4>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="warning"
                tableHead={["Nr. Crt", "Nr. Inreg", "Denumire", "Stadiu", "Data"]}
                tableData={[
                  ["1", "Dakota Rice", "$36,738", "Niger"],
                  ["2", "Minerva Hooper", "$23,789", "Curaçao"],
                  ["3", "Sage Rodriguez", "$56,142", "Netherlands"],
                  ["4", "Philip Chaney", "$38,735", "Korea, South"]
                ]}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>Contact primarie</h4>
            </CardHeader>
            <CardBody>
              <Typography>
                <span style={{ opacity: "0.5" }}>Primaria: </span>Bucuresti
              </Typography>
              <Typography>
                <span style={{ opacity: "0.5" }}>Adresa: </span>Str. Unirii nr. 2
              </Typography>
              <Typography>
                <span style={{ opacity: "0.5" }}>Telefon: </span>+40 336 489 496
              </Typography>
              <Typography>
                <span style={{ opacity: "0.5" }}>Email: </span>primaria.bucuresti@gmail.ro
              </Typography>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={6} >
            <Card>
              <CardHeader color="info">
                <h4 className={classes.cardTitleWhite}>Actiune rapida</h4>
              </CardHeader>
              <CardBody>
                <Button color="primary" variant="contained" style={{ width: '100%', height:'3rem', margin: '1.25rem 0 1.7rem'}} >
                  Adauga dosar
                </Button>
              </CardBody>
            </Card>
          </GridItem>
      </GridContainer>
    </div>
  );
}
