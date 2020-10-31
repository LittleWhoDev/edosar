import React, { useEffect, useState } from "react";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
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

import { getStatistics, getDosare } from "../../api/cetatean";
import { useAuth } from "api/auth";

const useStyles = makeStyles(styles);

export default function Dashboard() {
  useAuth();

  const [stats, setStats] = useState({});
  const [dosare, setDosare] = useState([]);

  useEffect(() => {
    getStatistics().then((stats) => {
      setStats(stats)
    });
    getDosare().then((dosare) => {
      const newDosare = [];
      dosare.forEach((elem, i) => {
        if (i > 2) return;
        newDosare.push([
          i + 1,
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
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>content_copy</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Dosare depuse</p>
              <h3 className={classes.cardTitle}>{stats['TOTAL']}</h3>
            </CardHeader>
            <CardFooter />
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Icon>find_in_page</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Dosare in lucru</p>
              <h3 className={classes.cardTitle}>{stats['IN_LUCRU']}</h3>
            </CardHeader>
            <CardFooter />
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Icon>done_all</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Dosare validate</p>
              <h3 className={classes.cardTitle}>{stats['VALIDATE']}</h3>
            </CardHeader>
            <CardFooter />
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>highlight_off</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Dosare respinse</p>
              <h3 className={classes.cardTitle}>{stats['RESPINSE']}</h3>
            </CardHeader>
            <CardFooter />
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Ultimele 3 dosare</h4>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="warning"
                tableHead={[
                  "Nr. Crt",
                  "Nr. Inreg",
                  "Denumire",
                  "Stadiu",
                  "Data",
                ]}
                tableData={dosare}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>Administreaza dosare</h4>
            </CardHeader>
            <CardBody>
              <Button
                color="primary"
                variant="contained"
                style={{
                  width: "100%",
                  height: "3rem",
                  margin: "1.25rem 0 1.7rem",
                }}
              >
                Adauga dosar
              </Button>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
