import React from "react";
import { Card, CardHeader, CardContent } from "@mui/material";
import ReactEcharts from "echarts-for-react";
import { useState, useEffect } from "react";

const Contribution_per_district = () => {

    const [footprints_in_districts, setfootprints_in_districts] = useState([]);
    useEffect(() => {
        const fetchfootprints_in_districts= async () => {
            const response = await fetch("/api/foodprint/districts");
            const data = await response.json();
            console.log(data);
            setfootprints_in_districts(data);
        };
        fetchfootprints_in_districts();
    }, []);
 
    console.log(footprints_in_districts);

  // Define the chart options
  const options = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    yAxis: {
      type: "category",
      data: footprints_in_districts.map((d) => d.name),
      axisLabel: {
        interval: 0,
        rotate: 0, // Adjust the rotation angle as needed
        margin: 15, // Adjust the margin as needed
      },
    },
    xAxis: {
      type: "value",
    },
    series: [
      {
        name: "Contributions",
        data: footprints_in_districts.map((d) => d.total),
        type: "bar",
      },
    ],
  };
  
  return (
    <div style={{ margin: "20px" }}>
      <Card style={{ width: "90%", marginBottom: "10px", padding: "25px", backgroundColor: "#f7f9f5" }}>
        <CardHeader title="Beteiligung pro Stadtteil" />
        <CardContent>
          <ReactEcharts option={options} style={{ height: "500px" }} />
        </CardContent>
      </Card>
    </div>
  );
  
};

export default Contribution_per_district;
