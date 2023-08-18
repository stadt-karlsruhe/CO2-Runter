import React, { useState, useEffect } from "react";
import ReactEcharts from "echarts-for-react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Card from "@mui/material/Card";
import axios from "axios";

const ChartAvg = () => {
  const [footprints, setFootprints] = useState([]);
  const [average, setAverage] = useState([]);
  const [selectedFootprints, setSelectedFootprints] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const averageResponse = await axios.get("/api/dashboard/footprints/average");
        setAverage(averageResponse.data);
        const footprintsResponse = await axios.get("/api/dashboard/comparisonprints");
        setFootprints(footprintsResponse.data);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Reload the options and chart when the data is available
    if (footprints && average && footprints.length > 0 && average.length > 0) {
      // Force re-render by updating the selectedFootprints state
      setSelectedFootprints([...selectedFootprints]);
    }
  }, [footprints, average]);

  
  const getOption = () => {
    if (
      isLoading ||
      error ||
      footprints === undefined ||
      footprints.length === 0 ||
      average === undefined ||
      average.length === 0
    ) {
      // Handle loading and error states
      return null;
    }
    const selectedData = selectedFootprints.map((selectedFootprint) => {
      const footprint = footprints.find((f) => f.name === selectedFootprint);
      return footprint.values.map((valueObj) => ({ category: valueObj.category, value: valueObj.value }));
    });

    const selectedCategories = selectedFootprints.map((selectedFootprint) => {
      const footprint = footprints.find((f) => f.name === selectedFootprint);
      return footprint.name;
    });

    const available_Categories = footprints[0].values.map((valueObj) => valueObj.category);

    // Add the average values to the selectedData and selectedCategories arrays
    selectedData.push(average.map((valueObj) => ({ category: valueObj.category, value: valueObj.value })));
    selectedCategories.push("Durchschnitt aller Beiträge");

    return {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      legend: {
        data: available_Categories,
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        data: selectedCategories,
        //selectedData[0].map((data) => data.category), // Use the categories from the first selectedData array
      },
      
      yAxis
: {
type: "value",
boundaryGap: [0, 0.01],
},
series: available_Categories.map((data, index) => ({
name: data,
type: "bar",
stack: "stack",
barWidth: "60%",
data: selectedData.map((selectedData) => selectedData[index].value),
label: {
show: true,
position: "inside",
formatter: "{c}t CO2",
},
})),
};
};

const handleFootprintClick = (footprint) => {
if (selectedFootprints.includes(footprint.name)) {
setSelectedFootprints(selectedFootprints.filter((fp) => fp !== footprint.name));
} else {
if (selectedFootprints.length < 4) {
setSelectedFootprints([...selectedFootprints, footprint.name]);
}
}
};

const handleSelectChange = (event) => {
setSelectedFootprints(event.target.value);
};

return (
  <Card style={{ width: "90%", marginBottom: "10px", padding: "25px", backgroundColor: "#f7f9f5" }}>
    {isLoading ? (
      <div style={{ textAlign: "center" }}>Daten werden geladen ...</div>
    ) : error ? (
      <div style={{ textAlign: "center" }}>Es ist ein Fehler aufgetreten: {error}</div>
    ) : (
      <>
        {footprints && average && footprints.length > 0 && average.length > 0 ? (
          <ReactEcharts option={getOption()} style={{ height: "500px" }} />
        ) : (
          <div style={{ textAlign: "center" }}>Keine Daten verfügbar</div>
        )}
        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <FormControl>
            <InputLabel id="demo-multiple-name-label">Angezeigte Fußabdrücke wählen</InputLabel>
            <Select
              multiple
              label="Angezeigte Fußabdrücke wählen"
              value={selectedFootprints}
              onChange={handleSelectChange}
              renderValue={(selected) => selected.join(", ")}
              style={{ minWidth: "250px" }} // Adjust the width as needed
            >
              {footprints.map((footprint) => (
                <MenuItem key={footprint.name} value={footprint.name}>
                  {footprint.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl> 
        </div>
      </>
    )}
  </Card>
);

};	

export default ChartAvg;