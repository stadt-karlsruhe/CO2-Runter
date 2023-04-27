import React from "react";
import { PieChart, Pie, Cell } from "recharts";
import { Typography, Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const FinishScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const co2ValuesPerCategory = location.state.co2ValuesPerCategory;
  const categories = location.state.categories;
  const dataSent = location.state.dataSent;

  const co2SumPerCategory = co2ValuesPerCategory.map((category) =>
    category.reduce((a, b) => a + b, 0)
  );
  const totalCo2Sum = co2SumPerCategory.reduce((a, b) => a + b, 0);

  const chartData = categories.map((category, index) => ({
    name: category,
    value: co2SumPerCategory[index],
  }));

  return (
    <>
      <Header />
      <Typography>Dein Aktueller Fußabdruck beträgt: {totalCo2Sum}</Typography>
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
      <Typography variant="body1">
        {dataSent
          ? "Danke für das Mitmachen bei der Co2App. Deine Daten wurden an das Dashboard übermittelt."
          : "Schade das Sie ihre Daten nicht mit uns und den anderen Nutzern teilen wollen."}
      </Typography>
      <Button variant="contained" onClick={() => navigate("/")}>
        Zum Dashboard
      </Button>
      <Button variant="outlined" onClick={() => navigate("/")}>
        Home
      </Button>
      <Footer />
    </>
  );
};

export default FinishScreen;
