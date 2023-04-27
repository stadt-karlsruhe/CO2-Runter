import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Button, TextField } from "@mui/material";

const GroupChoice = () => {
  const [groups, setGroups] = useState([]);
  const [groupCode, setGroupCode] = useState("");

  const columns = [
    { field: "groupname", headerName: "Gruppenname", width: 150 },
    { field: "groupcode", headerName: "Gruppencode", width: 150 },
    { field: "ownername", headerName: "Besitzer", width: 150 },
    { field: "memberCount", headerName: "Mitgliederzahl", width: 150 },
  ];

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get("/groups/member", {
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
  }, []);

  const handleGroupCodeChange = (event) => {
    setGroupCode(event.target.value);
  };

  const handleAddGroup = async () => {
    try {
      const response = await axios.get(`/groups/get/${groupCode}`);
      if (response.status === 200) {
        setGroups((prevGroups) => [...prevGroups, response.data]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <DataGrid
        rows={groups}
        columns={columns}
        pageSize={5}
        checkboxSelection
      />
      <TextField
        label="Gruppencode"
        value={groupCode}
        onChange={handleGroupCodeChange}
      />
      <Button onClick={handleAddGroup}>Gruppe hinzufügen</Button>
    </>
  );
};

export default GroupChoice;
