import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Button, TextField, Card } from "@mui/material";

const GroupChoice = (props) => {
  const [groups, setGroups] = useState([]);
  const [groupCode, setGroupCode] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const { setSelectedDistricts } = props;


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
            // Hier müssen Sie den Token und die Benutzer-ID angeben
            token: "YOUR_TOKEN_HERE",
            user_ID: "YOUR_USER_ID_HERE",
          },
        });
        if (response.status === 200) {
          setGroups(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchGroups();
    setSelectedDistricts(selectedRows);
  }, [selectedRows, setSelectedDistricts]);

  const handleGroupCodeChange = (event) => {
    setGroupCode(event.target.value);
  };

  const handleAddGroup = async () => {
    try {
      const response = await axios.get(`/api/groups/get/${groupCode}`);
      if (response.status === 200) {
        setGroups((prevGroups) => [...prevGroups, response.data]);
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
