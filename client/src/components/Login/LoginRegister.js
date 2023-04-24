import * as React from 'react';
import { Tab, Tabs } from '@mui/material';
import { TabContext, TabPanel } from '@mui/lab';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const LoginRegister = () => {
  const [value, setValue] = React.useState('0');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Header />
      <TabContext value={value}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Login" value="0" />
          <Tab label="Registrieren" value="1" />
        </Tabs>
        <TabPanel value="0">
        <LoginForm />
        </TabPanel>
        <TabPanel value="1">
          <RegisterForm />
        </TabPanel>
      </TabContext>
      <Footer />
    </>
  );
};

export default LoginRegister;