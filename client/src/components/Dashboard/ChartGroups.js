import React, { useState, useEffect } from "react";
import ReactEcharts from "echarts-for-react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import axios from "axios";

const ChartGroups= () => {
    const [availableGroups, setAvailableGroups] = useState(["12354","13456"]);
    const [footprints, setFootprints] = useState([]);
    const [selectedFootprints, setSelectedFootprints] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const co2Token = localStorage.getItem('CO2Token');


    //get all groups the user is member of, if a co2 token is available
    useEffect(() => {
        const fetchGroups = async () => {
          try {
            const response = await axios.get("/api/groups/member", {
              headers: {
                co2token: co2Token,
              },
            });
            if (response.status === 200) {
              const newGroups = response.data.map((group) => group.groupcode);
              setAvailableGroups((prevGroups) => [...prevGroups, ...newGroups]);
              console.log("Groups from Login" + response.data);
            }
          } catch (error) {
            console.error(error);
          }
        };
        if (co2Token) {
          fetchGroups();
        }
      }, []);

// gets teh group code from local storage and adds it to the available groups
  useEffect(() => {
   const groupCode = localStorage.getItem("groupCode");
   // check if a group code is set in local storage and add it to the available groups
    if (groupCode) {
        setAvailableGroups((prevGroups) => [...prevGroups, groupCode]);
    }
    }, []);


// get the footprints for all available groups
  useEffect(() => {
    const fetchData = async () => {
      try {
        //get footprints for all available groups from this endpoint api/dashboard/groupfootprint 
        // with the group id as parameter if  a request is not successful, 
        //dont add the data to the footprints array and go on with the next group
        for (let i = 0; i < availableGroups.length; i++) {
          const response = await axios.get("/api/dashboard/groupfootprint", {
            params: {  
                groupcode: availableGroups[i],
            },
            });
            if (response.status === 200) {
                console.log("Footprint data for group " + availableGroups[i] + " successfully retrieved");  
                console.log(response.data);
                if (response.data.values.length > 0) {
                //check if the group is already in the footprints array
                const groupExists = footprints.some((footprint) => footprint.name === response.data.name);
                if (groupExists) {
                    console.log("Group " + availableGroups[i] + " already exists in the footprints array");
                    return;
                }
                setFootprints((prevFootprints) => [...prevFootprints, response.data]);
                } else {
                console.log("No footprint data for group " + availableGroups[i]);
                }
            }
        }
        console.log("Footprint data for all groups successfully retrieved");
        console.log(footprints);
        }
        catch (error) {console.error(error);}
        setIsLoading(false);
    };
    fetchData();
  }, [availableGroups]);

  useEffect(() => {
    // Reload the options and chart when the data is available
    if (footprints && footprints.length > 0 ) {
      // Force re-render by updating the selectedFootprints state
      setSelectedFootprints([...selectedFootprints]);
    }
  }, [footprints]);

  
  const getOption = () => {
    if (
      isLoading ||
      error ||
      footprints === undefined ||
      footprints.length === 0
    ) {
      // Handle loading and error states
      return null;
    }
  
    const selectedData = selectedFootprints.map((selectedFootprint) => {
      const footprint = footprints.find((f) => f.name === selectedFootprint);
      return footprint.values.map((valueObj) => ({
        category: valueObj.category,
        value: valueObj.value,
      }));
    });
  
    const selectedCategories = selectedFootprints.map((selectedFootprint) => {
      const footprint = footprints.find((f) => f.name === selectedFootprint);
      return footprint.name;
    });
  
    const available_Categories = footprints[0].values.map(
      (valueObj) => valueObj.category
    );
  
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
      },
      yAxis: {
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
  


const handleSelectChange = (event) => {
setSelectedFootprints(event.target.value);
};

return (
  <div>
    {isLoading ? (
      <div>Loading...</div>
    ) : error ? (
      <div>Error: {error}</div>
    ) : (
      <>
        {footprints && footprints.length > 0  ? (
          <ReactEcharts option={getOption()} style={{ height: "500px" }} />
        ) : (
          <div>Data not available.</div>
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
            style={{ minWidth: "300px" }} // Adjust the width as needed
          >
            {console.log("Footprints: " + footprints)}
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
  </div>
);
};	

export default ChartGroups;