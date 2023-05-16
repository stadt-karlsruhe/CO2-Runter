import React from "react";
import LoginForm from "../Login/LoginForm";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import { TabContext, TabPanel } from "@mui/lab";
import GroupChoice from "./GroupChoice";

const Login = () => {
  const [value, setValue] = React.useState("0");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box>
      <Typography variant="body1">
        Melden Sie sich an! So können sie alle Gruppen sehen in denen Sie
        Mitglied sind.
      </Typography>
      <TabContext value={value}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Ohne Login" value="0" />
          <Tab label="Login" value="1" />
        </Tabs>
        <TabPanel value="0">
          <GroupChoice />
        </TabPanel>
        <TabPanel value="1">
          <LoginForm />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default Login;
