import React from "react";
import LoginForm from "../Login/LoginForm";
import { Tab, Tabs, Typography } from "@mui/material";
import { TabContext, TabPanel } from "@mui/lab";
import GroupChoice from "./GroupChoice";

const Login = ({updateSelectedGroups}) => {
  const [value, setValue] = React.useState("0");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="body1" style={{width: "80vw"}}>
        Melden Sie sich an! So können sie alle Gruppen sehen in denen Sie
        Mitglied sind.
      </Typography>
      <TabContext value={value}>
        <Tabs
          value={value}
          onChange={handleChange}
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "10px",
          }}
        >
          <Tab label="Ohne Login" value="0" />
          <Tab label="Login" value="1" />
        </Tabs>
        <TabPanel value="0" style={{width: '80vw' }}>
          <GroupChoice updateSelectedGroups={updateSelectedGroups}/>
        </TabPanel>
        <TabPanel value="1">       
            <LoginForm />
        </TabPanel>
      </TabContext>
    </div>
  );
};

export default Login;
