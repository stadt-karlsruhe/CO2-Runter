import React from "react";
import { Container, Divider, Grid, Link, Typography } from "@mui/material";

function Footer() {
  return (
    <footer>
      <Divider />
      <Container maxWidth="lg">
        <Typography variant="h10" gutterBottom>
          In Zusammenarbeit:
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <Link
              href="https://www.karlsruhe.de/"
              target="_blank"
              rel="noopener"
            >
              <img
                src={process.env.PUBLIC_URL + "/images/Logos/logo-icon.svg"}
                alt="Stadt Karlsruhe"
                width="80"
                height="100"
              />
            </Link>
          </Grid>
          <Grid item>
            <Link
              href="https://codefor.de/karlsruhe/"
              target="_blank"
              rel="noopener"
            >
              <img
                src={
                  process.env.PUBLIC_URL + "/images/Logos/CodeFor-karlsruhe.svg"
                }
                alt="OK-Lab Karlsruhe"
                width="100"
                height="100"
              />
            </Link>
          </Grid>
          <Grid item>
            <Link
              href="https://www.karlsruhe.dhbw.de/startseite.html"
              target="_blank"
              rel="noopener"
            >
              <img
                src={process.env.PUBLIC_URL + "/images/Logos/dhbw-logo.svg"}
                alt="DHBW Karlsruhe"
                width="150"
                height="100"
              />
            </Link>
          </Grid>
        </Grid>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          <Link href="/datenschutz" color="inherit">
            Datenschutz
          </Link>{" "}
          |{" "}
          <Link href="/impressum" color="inherit">
            Impressum
          </Link>
        </Typography>
      </Container>
    </footer>
  );
}

export default Footer;
