import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Typography } from "@mui/material";
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
          marginTop: "10px",
          marginLeft: "5%",
          marginRight: "5%",
          padding: "25px",
          backgroundColor: "#f7f9f5",
        }}
      >
        {showGroupSuccess ? (
          <GroupSuccessful groupCode={groupCode} groupName={groupName} />
        ) : (
          <>
          <Typography>Willkommen auf der Gruppenübersichtsseite! 
            Hier finden Sie eine praktische Zusammenfassung der Gruppen, in denen Sie als Administrator tätig sind. 
            Sie können hier jederzeit die Links und QR-Codes abrufen, um sie mit Freunden, Familie, 
            Sportkollegen, Kollegen und anderen zu teilen.</Typography>
          <ul>
            {groups.map((group) => (
              <li key={group.groupcode}>
                {group.groupname}
                <Button
                  onClick={() => handleGroupClick(group.groupcode, group.groupname)}
                  style={{ marginLeft: "10px" }}
                  endIcon={<SettingsIcon />}
                >
                Links & QR-Code
                </Button>
              </li>
            ))}
          </ul></>
        )}
      </Card>
      <Footer />
    </>
  );
};

export default GroupSettingsSelector;
