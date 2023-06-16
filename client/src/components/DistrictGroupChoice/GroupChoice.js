import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Button, TextField, Card } from "@mui/material";

const GroupChoice = ({ updateSelectedGroups  }) => {
  const [groups, setGroups] = useState([]);
  const [groupCode, setGroupCode] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const co2Token = localStorage.getItem('CO2Token');

  const columns = [
    { field: "groupname", headerName: "Gruppenname", width: 150 },
    { field: "groupcode", headerName: "Gruppencode", width: 150 },
    { field: "ownername", headerName: "Besitzer", width: 150 },
    { field: "memberCount", headerName: "Mitgliederzahl", width: 150 },
  ];

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get("/api/groups/member", {
          headers: {
            co2token: co2Token,
          },
        });
        if (response.status === 200) {
          setGroups(response.data);
          console.log(response.data)
        }
      } catch (error) {
        console.error(error);
      }
    };
    if(co2Token){
      fetchGroups();
    }
  }, []);

  


  useEffect(() => {
    const existingGroupCode = localStorage.getItem("groupCode");
  
    const fetchGroupByCode = async (groupCode) => {
      try {
        const response = await axios.get("/api/groups/get", {
          params: {
            groupcode: groupCode,
          }
        });
        if (response.status === 200) {
          const newGroup = response.data;
          // Check if the group already exists in the groups array
          const groupExists = groups.some((group) => group.groupcode === newGroup.groupcode);
          if (groupExists) {
            return;
          }
          setGroups((prevGroups) => [...prevGroups, newGroup]);
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    if (existingGroupCode) {
      fetchGroupByCode(existingGroupCode);
    }
  }, []); // Empty dependency array, causing the effect to run only once
  
  

  const handleGroupCodeChange = (event) => {
    setGroupCode(event.target.value);
  };

  const handleAddGroup = async () => {
    try {
      const response = await axios.get(`/api/groups/get`, {
        params: {
        groupcode: groupCode,
        }
      });
      if (response.status === 200) {
        const newGroup = response.data;
        //check if group is already in groups
        const groupExists = groups.find((group) => group.groupcode === newGroup.groupcode);
        if (groupExists) {
          return;
        }
        setGroups((prevGroups) => [...prevGroups, newGroup]);
        //updateSelectedGroups((prevSelectedGroups) => [...prevSelectedGroups, newGroup.groupcode]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // check for duplicate in groups and remove one so all groups are unique
  useEffect(() => {
    const uniqueGroups = groups.filter((group, index, self) =>
      index === self.findIndex((t) => (
        t.groupcode === group.groupcode
      ))
    );
    setGroups(uniqueGroups);
  }, [groups]);


  const handleSelectionChange = (newSelection) => {
    setSelectedRows(newSelection);
    console.log("new Selection" + newSelection);
    console.log("selected rows" + selectedRows);
    console.log("setting" + selectedGroupCodes + "as selected groups");
    updateSelectedGroups((prevSelectedGroups) => [...prevSelectedGroups]);
  };


  return (
    <Card style={{ width: "90%", marginBottom: "10px", padding: "25px", backgroundColor: "#f7f9f5" }}>
      <DataGrid
        rows={groups}
        columns={columns}
        pageSize={5}
        checkboxSelection
        onRowSelectionModelChange={handleSelectionChange}
        rowSelectionModel={selectedRows}
        getRowId={(row) => row.groupcode}
      />

      <TextField
        label="Gruppencode"
        value={groupCode}
        onChange={handleGroupCodeChange}
      />
      <Button onClick={handleAddGroup}>Gruppe hinzufügen</Button>
    </Card>
  );
};

export default GroupChoice;
