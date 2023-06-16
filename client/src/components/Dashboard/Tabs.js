import React, { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import MapIcon from "@mui/icons-material/Map";
import BarChartIcon from "@mui/icons-material/BarChart";
import Box from "@mui/material/Box";
import Map from "./Map";
import Co2Card from "./Contribution";
import Charts from "./Charts";
import Groups from "./Groups";
import CheckAuth from "../CheckAuth";


const MyTabs = () => {
  const [value, setValue] = useState(0);
  const isLoggedIn = CheckAuth();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const groupCode = urlParams.get("groupcode");
    if (groupCode) {
      localStorage.setItem("groupCode", groupCode);
    }
    if(isLoggedIn){
      addUserToGroup(groupCode);
      console.log("add user")
    }
  }, []);

  useEffect(() => {
    const storedValue = localStorage.getItem("selectedTab");
    if (storedValue) {
      setValue(parseInt(storedValue));
    }
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    localStorage.setItem("selectedTab", newValue);
  };

  const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box p={3}>{children}</Box>}
      </div>
    );
  };

  return (
    <div>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab icon={<MapIcon />} label="Karte" />
        <Tab icon={<BarChartIcon />} label="Charts" />
        <Tab icon={<BarChartIcon />} label="Gruppen" />
        <Tab icon={<BarChartIcon />} label="Beteiligung" />

      </Tabs>
      <TabPanel value={value} index={0}>
        <Map />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Charts />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Groups />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Co2Card co2Footprint={0} />
      </TabPanel>
    </div>
  );
};

export default MyTabs;
