import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button } from "@mui/material";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import GroupSuccessful from "./GroupSuccesfull";
import SettingsIcon from '@mui/icons-material/Settings';

const GroupSettingsSelector = () => {
  const [groups, setGroups] = useState([]);
  const [groupCode, setGroupCode] = useState("");
  const [groupName, setGroupName] = useState("");
  const co2Token = localStorage.getItem('CO2Token');
  const [showGroupSuccess, setShowGroupSuccess] = useState(false);

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

    if (co2Token) {
      fetchGroups();
    }
  }, []);

  useEffect(() => {
    const existingGroupCodeInLocalStorage = localStorage.getItem("groupCode");

    const fetchGroupByCode = async (groupCode) => {
      try {
        const response = await axios.get("/api/groups/get", {
          params: {
            groupcode: groupCode,
          },
        });
        if (response.status === 200) {
          const newGroup = response.data;
          const groupExists = groups.some(
            (group) => group.groupcode === newGroup.groupcode
          );
          if (groupExists) {
            return;
          }
          setGroups((prevGroups) => [...prevGroups, newGroup]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (existingGroupCodeInLocalStorage) {
      fetchGroupByCode(existingGroupCodeInLocalStorage);
    }
  }, []);

  useEffect(() => {
    const uniqueGroups = groups.filter(
      (group, index, self) =>
        index === self.findIndex((t) => t.groupcode === group.groupcode)
    );
    setGroups(uniqueGroups);
  }, [groups]);
  
  const handleGroupClick = (groupCode, groupName) => {
    setGroupCode(groupCode);
    setGroupName(groupName);
    setShowGroupSuccess(true);
  };

  return (
    <>
      <Header />
      <Card
        style={{
          width: "90%",
          marginBottom: "10px",
          padding: "25px",
          backgroundColor: "#f7f9f5",
        }}
      >
        {console.log("Test: "+groups)}
        {showGroupSuccess ? (
          <GroupSuccessful groupCode={groupCode} groupName={groupName} />
        ) : (
          <ul>
            {groups.map((group) => (
              <li key={group.groupcode}>
                {group.groupname}
                <Button
                  onClick={() => handleGroupClick(group)}
                  style={{ marginLeft: "10px" }}
                  endIcon={<SettingsIcon />}
                >
                Links & QR-Code
                </Button>
              </li>
            ))}
          </ul>
        )}
      </Card>
      <Footer />
    </>
  );
};

export default GroupSettingsSelector;
