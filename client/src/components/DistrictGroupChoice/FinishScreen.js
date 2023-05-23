import React from "react";
import { PieChart, Pie, Cell } from "recharts";
import { Typography, Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#696969"];

const FinishScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const co2ValuesPerCategory = location.state.co2ValuesPerCategory;
  const categories = location.state.categories;
  const dataSent = location.state.dataSent;
  const baseCO2 = 3.5;

  const co2SumPerCategory = co2ValuesPerCategory.map((category) =>
    category.reduce((a, b) => a + b, 0)
  );
  const totalCo2Sum = co2SumPerCategory.reduce((a, b) => a + b, 0);

  const truncate = (num, decimalPlaces) => {
    const factor = Math.pow(10, decimalPlaces);
    return Math.floor(num * factor) / factor;
  };

  const chartData = [...categories, "Grundwert"].map((category, index) => ({
    name: category,
    value: index === categories.length ? baseCO2 : co2SumPerCategory[index],
  }));
  

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Header />
      <Typography variant="h6" style={{ marginBottom: "15px", marginTop: "25px" }}>Dein Aktueller Fußabdruck beträgt: {truncate(totalCo2Sum+baseCO2, 2)} t CO2</Typography>
      <PieChart width={400} height={400}>
      <Pie
  data={chartData}
  cx={200}
  cy={200}
  labelLine={false}
  label={({ name, value }) => `${name}: ${value}`}
  outerRadius={80}
  fill="#8884d8"
  dataKey="value"
>
  {chartData.map((entry, index) => (
    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
  ))}
</Pie>

      </PieChart>
      <Typography variant="body1" style={{ marginTop: "20px", marginBottom: "20px" }}>
        {dataSent
          ? "Danke für das Mitmachen bei der Co2App. Deine Daten wurden an das Dashboard übermittelt."
          : "Schade das Sie ihre Daten nicht mit uns und den anderen Nutzern teilen wollen."}
      </Typography>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Button variant="contained" onClick={() => navigate("/")} style={{ width: "100%", marginBottom: "10px", marginTop: "10px" }}>
          Zum Dashboard
        </Button>
        <Button variant="outlined" onClick={() => navigate("/")} style={{ width: "100%", marginBottom: "10px" }}>
          Home
        </Button>
      </div>
      <Footer />
    </div>
  );
};

export default FinishScreen;