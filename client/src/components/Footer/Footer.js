import React from "react";
import { Container, Divider, Grid, Link, Typography } from "@mui/material";
import "../../css/components/Footer/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <Divider className="footer-divider" />
      <Container maxWidth="lg" className="footer-container">
        <Typography variant="h6" className="footer-title">
          In Zusammenarbeit:
        </Typography>
        <Grid
          container
          spacing={2}
          justifyContent="center"
          className="footer-grid"
        >
          <Grid item>
            <Link
              href="https://www.karlsruhe.de/"
              target="_blank"
              rel="noopener"
              className="footer-link"
            >
              <img
                src={
                  process.env.PUBLIC_URL +
                  "/images/Logos/Stadtkarlsruhe-logo.svg"
                }
                alt="Stadt Karlsruhe"
                width="80"
                height="100"
                className="footer-image"
              />
            </Link>
          </Grid>
          <Grid item>
            <Link
              href="https://codefor.de/karlsruhe/"
              target="_blank"
              rel="noopener"
              className="footer-link"
            >
              <img
                src={
                  process.env.PUBLIC_URL + "/images/Logos/CodeFor-karlsruhe.svg"
                }
                alt="OK-Lab Karlsruhe"
                width="80"
                height="100"
                className="footer-image"
              />
            </Link>
          </Grid>
          <Grid item>
            <Link
              href="https://www.karlsruhe.dhbw.de/startseite.html"
              target="_blank"
              rel="noopener"
              className="footer-link"
            >
              <img
                src={process.env.PUBLIC_URL + "/images/Logos/dhbw-logo.svg"}
                alt="DHBW Karlsruhe"
                width="80"
                height="100"
                className="footer-image"
              />
            </Link>
          </Grid>
        </Grid>
        <div className="footer-links">
          <Link href="https://www.karlsruhe.de/datenschutz" color="inherit">
            Datenschutz
          </Link>
          <Link href="https://www.karlsruhe.de/impressum" color="inherit">
            Impressum
          </Link>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
