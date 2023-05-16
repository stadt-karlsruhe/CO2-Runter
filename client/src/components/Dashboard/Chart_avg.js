import React, { useState, useEffect } from "react";
import ReactEcharts from "echarts-for-react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

const Chart_avg = () => {
  const [footprints, setFootprints] = useState([
    {
      name: "Footprint A",
      values: [
        { category: "Category 1", value: 7 },
        { category: "Category 2", value: 3 },
        { category: "Category 3", value: 4 },
        { category: "Category 4", value: 2 },
      ],
    },
    { 
        name: "Footprint 2",
        values: [
            { category: "Category 1", value: 3 },
            { category: "Category 2", value: 5 },
            { category: "Category 3", value: 10 },
            { category: "Category 4", value: 1 },
        ],
    },
    { 
        name: "Footprint 3",
        values: [
            { category: "Category 1", value: 3 },
            { category: "Category 2", value: 5 },
            { category: "Category 3", value: 10 },
            { category: "Category 4", value: 1 },
        ],
    },
    { 
        name: "Footprint D",
        values: [
            { category: "Category 1", value: 3 },
            { category: "Category 2", value: 5 },
            { category: "Category 3", value: 10 },
            { category: "Category 4", value: 1 },
        ],
    },
    { 
        name: "Footprint 5",
        values: [
            { category: "Category 1", value: 3 },
            { category: "Category 2", value: 5 },
            { category: "Category 3", value: 10 },
            { category: "Category 4", value: 1 },
        ],
    },
    // Add more footprints with their respective values and categories here
  ]);
  const [average, setAverage] = useState([
    { category: "Category 1", value: 3 },
    { category: "Category 2", value: 2 },
    { category: "Category 3", value: 4 },
    { category: "Category 4", value: 1 },
  ]); // Set average values for each category
  const [selectedFootprints, setSelectedFootprints] = useState([]);

  useEffect(() => {
    // Fetch footprints data from the server
    // Replace this with your actual API calls
    // axios.get("/footprints/all").then((response) => {
    //   setAverage(response.data.average);
    // });
    // axios.get("/footprints/comparison").then((response) => {
    //   setFootprints(response.data);
    // });
  }, []);

  const getOption = () => {
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
    selectedCategories.push("Average");

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
formatter: "{c} t CO2e",
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
    <div>
      <ReactEcharts option={getOption()} style={{ height: "500px" }} />
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <FormControl>
            <InputLabel id="demo-multiple-name-label">Angezeigte Fußabdrücke wählen</InputLabel>
          <Select
            multiple
            label="Angezeigte Fußabdrücke wählen"
            value={selectedFootprints}
            onChange={handleSelectChange}
            renderValue={(selected) => selected.join(", ")}
            style={{ minWidth: "300px" }} // Adjust the width as needed
          >
            {footprints.map((footprint) => (
              <MenuItem key={footprint.name} value={footprint.name}>
                {footprint.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default Chart_avg;