import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Button, TextField, Card } from "@mui/material";

const GroupChoice = (setSelectedGroups) => {
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
          params: {
            co2token: co2Token,
          },
        });
        if (response.status === 200) {
          setGroups(response);
          console.log(response)
        }
      } catch (error) {
        console.error(error);
      }
    };
    if(co2Token){
      fetchGroups();
    }
  }, []);

  const handleGroupCodeChange = (event) => {
    setGroupCode(event.target.value);
  };

  const handleAddGroup = async () => {
    try {
      const response = await axios.get(`/api/groups/get`,{groupcode: groupCode});
      if (response.status === 200) {
        const newGroup = response.data;
        setGroups((prevGroups) => [...prevGroups, newGroup]);
        setSelectedGroups((prevSelectedGroups) => [...prevSelectedGroups, newGroup.groupcode]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card style={{ width: "90%", marginBottom: "10px", padding: "25px", backgroundColor: "#f7f9f5" }}>
      <DataGrid
        rows={groups}
        columns={columns}
        pageSize={5}
        checkboxSelection
        onSelectionModelChange={(newSelection) => {
          setSelectedRows(newSelection.selectionModel);
          const selectedGroupCodes = newSelection.selectionModel.map((rowId) => groups[rowId].groupcode);
          setSelectedGroups(selectedGroupCodes);
        }}
        selectionModel={selectedRows}
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
