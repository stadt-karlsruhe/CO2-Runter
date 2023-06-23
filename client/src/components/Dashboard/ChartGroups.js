import React, { useState, useEffect } from "react";
import ReactEcharts from "echarts-for-react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { Button, TextField } from "@mui/material";
import Card from "@mui/material/Card";
import axios from "axios";

const ChartGroups= () => {
    const [availableGroups, setAvailableGroups] = useState([]);
    const [footprints, setFootprints] = useState([]);
    const [selectedFootprints, setSelectedFootprints] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [groupCode, setGroupCode] = useState("");
    const [getDataError, setgetDataError] = useState(null);
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
                if (response.data.values.length > 0) {
                //check if the group is already in the footprints array
                const groupExists = footprints.some((footprint) => footprint.name === response.data.name);
                if (groupExists) {
                    // if the group is already in the footprints array, dont add it again
                    continue;
                }    
                // add the data to the footprints array check if the group is already in the footprints array and dont add it again
                setFootprints((prevFootprints) => {
                  // Check if response.data already exists in prevFootprints
                  const isDataExists = prevFootprints.some((footprint) => {
                    // Compare the data to check for uniqueness
                    return footprint.name === response.data.name;
                  });
                
                  // If response.data is not already present, append it to prevFootprints
                  if (!isDataExists) {
                    return [...prevFootprints, response.data];
                  }
                
                  // If response.data already exists, return prevFootprints without modifying it
                  return prevFootprints;
                });
                
                } else {
                  continue;
                }
            }
          }
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
          formatter: "{c}t CO2",
        },
      })),
    };
  };
  
  const handleAddGroup = async () => {
    try {
      const response = await axios.get("/api/groups/get", {
        params: {
          groupcode: groupCode,
          }
      });
      if (response.status === 200) {
        setAvailableGroups((prevGroups) => [...prevGroups, groupCode]);
      }
    } catch (error) {
      console.error(error);
      setgetDataError("Gruppe nicht gefunden");
      setGroupCode("");
    }
    setGroupCode("");
  };

  const handleSelectChange = (event) => {
    setSelectedFootprints(event.target.value);
  };

  const handleGroupCodeChange = (event) => {
    setGroupCode(event.target.value);
    setgetDataError(null);
  };

  return (
    <Card style={{ width: "90%", marginBottom: "10px", padding: "25px", backgroundColor: "#f7f9f5" }}>
      {isLoading ? (
        <div style={{ textAlign: "center" }}>Daten werden geladen ...</div>
      ): (
        <>
          {footprints && footprints.length > 0  ? (
            <ReactEcharts option={getOption()} style={{ height: "500px" }} />
          ) : (
            <div style={{ textAlign: "center" }}>Keine Daten verfügbar: Wähle eine Gruppe aus oder füge eine Neue hinzu</div>
          )}
          <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
            <FormControl>
              <InputLabel id="demo-multiple-name-label">Angezeigte Gruppen wählen</InputLabel>
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
          <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
            <TextField
              error={getDataError}
              label="Gruppencode"
              value={groupCode}
              helperText={getDataError}
              onChange={handleGroupCodeChange}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleAddGroup();
                }
              }}
            />
            <Button onClick={handleAddGroup}>Gruppe hinzufügen</Button>
          </div>
        </>
      )}
    </Card>
  );
  
};	

export default ChartGroups;