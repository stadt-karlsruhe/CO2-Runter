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

  // if co2Token is set, fetch groups from backend
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
        }
      } catch (error) {
        console.error(error);
      }
    };

    if(co2Token){
      fetchGroups();
    }
  }, []);

  

  // if groupCode in localStorage, fetch group from backend
  useEffect(() => {
    const existingGroupCodeInLocalStorag = localStorage.getItem("groupCode");
  
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
          // Add the new group to the groups array
          setGroups((prevGroups) => [...prevGroups, newGroup]);
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    if (existingGroupCodeInLocalStorag) {
      fetchGroupByCode(existingGroupCodeInLocalStorag);
    }
  }, []);
  
  
 // updates groupCode state when input changes
  const handleGroupCodeChange = (event) => {
    setGroupCode(event.target.value);
  };

  //updates groups state when group is added and adds user to group if logged in
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
        // add user to group
        if(co2Token){
          try {
          const response2 = await axios.post(`/api/groups/add_user`, {
            groupcode: groupCode,
          }, {
            headers: {
              co2token: co2Token,
            },
          });
          if (response2.status === 200) {
            console.log("User added to group");
          }
        } catch (error) {
          console.error("Adding User to Group" + error);
        }
      }
      }
    } catch (error) {
      console.error("Getting Groupe Data" + error);
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


  useEffect(() => {
    if (selectedRows.length === 0) {
      return;
    }
    const selectedGroups = selectedRows.map((row) => row);
    updateSelectedGroups((prevSelectedGroups) => {
      // Filter out already existing group codes from selectedGroups
      const newGroups = selectedGroups.filter(
        (group) => !prevSelectedGroups.includes(group)
      );
  
      // Combine existing and new group codes
      return [...prevSelectedGroups, ...newGroups];
    });
  }, [selectedRows]);
  

  const handleSelectionChange = (newSelection) => {
    console.log("new Selection: " + newSelection);
    setSelectedRows(newSelection);
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
