import { useEffect, useState } from "react";
import axios from "axios";

const CheckAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const co2Token = localStorage.getItem("CO2Token");

  const checkTokenValidity = async () => {
    try {
      const response = await axios.get("/api/isUserAuth", {
        headers: {
          co2token: co2Token,
        },
      });
      if (response.status === 200) {
        console.log("Token is valid");
        setIsLoggedIn(true);
      }
      console.log(response.status);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log("Token is invalid or expired");
        setIsLoggedIn(false);
      } else {
        console.log("An error occurred during token validation");
      }
    }
  };

  useEffect(() => {
    console.log("Token überprüfen: " + co2Token);
    if (co2Token) {
      checkTokenValidity();
    }
  }, [co2Token]);

  return isLoggedIn;
};

export default CheckAuth;
