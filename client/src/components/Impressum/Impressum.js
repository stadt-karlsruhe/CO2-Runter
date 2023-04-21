import React from 'react';
import Header from '../Header/Header';
import { Container, Typography } from '@mui/material';

const Impressum = () => {
  return (
    <>
      <Header />
      <Container>
        <Typography variant="h4">Impressum</Typography>
        Add your Impressum information here 
      </Container>
    </>
  );
}

export default Impressum;