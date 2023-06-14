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
    // save state to local storage
    //check if group is already in local storage
    if (groups.length === 0) {
      return;
    }
    if (localStorage.getItem("groupCode")) {
      const prevcodes = localStorage.getItem("groupCode");
      const groupExists = groups.find((group) => group.groupcode === prevcodes);
      if (groupExists) {
        return;
      }
    }
    prevcodes = localStorage.getItem("groupCode");
    localStorage.setItem("groupCode",  prevcodes + groups[groups.length - 1].groupcode);
  }, [groups]);


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
          const groupExists = groups.find((group) => group.groupcode === newGroup.groupcode);
          if (groupExists) {
            return;
          }
          const newGroup = response.data;
          setGroups((prevGroups) => [...prevGroups, newGroup]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (existingGroupCode) {
      fetchGroupByCode(existingGroupCode);
    }
  }, []);

  const handleGroupCodeChange = (event) => {
    setGroupCode(event.target.value);
  };

  const handleAddGroup = async () => {
    console.log("Groupe Add" + groupCode)
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
