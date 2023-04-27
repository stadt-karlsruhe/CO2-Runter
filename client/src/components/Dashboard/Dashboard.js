import React from "react";
import { Box, Container } from "@mui/material";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Tabs from "./Tabs"


export default function Dashboard() {
  
  return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Header />
          <Container sx={{ flex: 1 }}>
            <Tabs/>
          </Container>
          <Footer />
        </Box>
  );
}
