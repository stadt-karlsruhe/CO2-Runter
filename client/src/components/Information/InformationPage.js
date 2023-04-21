import React from 'react';
import Header from '../Header/Header';
import { Container, Typography } from '@mui/material';

const InformationPage = () => {
  return (
    <>
      <Header />
      <Container>
        <Typography variant="h4">Informationen</Typography>
        Add your information here 
      </Container>
    </>
  );
}

export default InformationPage;