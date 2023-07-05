import React from "react";
import LoginForm from "../Login/LoginForm";
import { Tab, Tabs, Typography } from "@mui/material";
import { TabContext, TabPanel } from "@mui/lab";
import GroupChoice from "./GroupChoice";

const Login = ({updateSelectedGroups}) => {
  const [tabValue, setTabValue] = React.useState("0");

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
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
      <Tabs
        value={tabValue}
        onChange={handleChange}
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "10px",
        }}
      >
        <Tab label="Ohne Login" />
        <Tab label="Login" />
      </Tabs>
      {tabValue === 0 && (
        <GroupChoice updateSelectedGroups={updateSelectedGroups} />)
      }
      {tabValue === 1 && (<LoginForm />)}
    </div>
  );
};

export default Login;
