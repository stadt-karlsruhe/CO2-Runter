import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import LoginForm from "../Login/LoginForm";
import RegisterForm from "../Login/RegisterForm";
import { Tab, Tabs, Button, Typography, Stack } from "@mui/material";
import { TabContext, TabPanel } from "@mui/lab";
import { useNavigate } from "react-router-dom";

const GroupLoggedOut = () => {
  const navigate = useNavigate();
  const [value, setValue] = React.useState("0");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Header />
      <Stack spacing={2}>
        <Typography variant="h4">Neue Gruppe erstellen</Typography>
        <Typography>
          Um ihre eigene Gruppe zu erstellen müssen Sie sich entweder mit ihrem
          Account einloggen oder sich kostenlos einen Account errstellen!
        </Typography>
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
        <Button onClick={() => navigate(-1)}>Zurück</Button>
      </Stack>
      <Footer />
    </>
  );
};

export default GroupLoggedOut;
