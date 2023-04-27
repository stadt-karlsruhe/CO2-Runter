import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import MapIcon from "@mui/icons-material/Map";
import BarChartIcon from "@mui/icons-material/BarChart";
import Box from "@mui/material/Box";
import Map from "./Map";
//import Chart from "./Chart";


export default function MyTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
      </Tabs>
      <TabPanel value={value} index={0}>
        <Map/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <h1>Here will be some nice charts soon</h1>
      </TabPanel>
    </div>
  );
}
