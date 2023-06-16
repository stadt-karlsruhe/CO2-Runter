import React from 'react';
import { Tab, Tabs } from '@mui/material';
import { TabContext, TabPanel } from '@mui/lab';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import '../../css/components/Login/login-register.css';

const LoginRegister = () => {
  const [value, setValue] = React.useState('0');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Header />
      <div className="login-register-container">
        <TabContext value={value}>
          <Tabs
            value={value}
            onChange={handleChange}
            centered
          >
            <Tab label="Login" value="0" />
            <Tab label="Registrieren" value="1" />
          </Tabs>
          <TabPanel value="0" className="login-register-tab-panel">
            <LoginForm link={"/"} />
          </TabPanel>
          <TabPanel value="1" className="login-register-tab-panel">
            <RegisterForm />
          </TabPanel>
        </TabContext>
      </div>
      <Footer />
    </>
  );
};

export default LoginRegister;
