import React from "react";
import { PieChart, Pie, Cell } from "recharts";
import { Typography, Button } from "@mui/material";
import { useNavigate, useLocation, Link} from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import ComputeTotalCo2 from "../QuestionBlock/Calculation/ComputeTotalCo2"
import { useSelector } from 'react-redux';


const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#696969"];

const FinishScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dataSent = location.state.dataSent;

  const categories = useSelector(state => state.categories); // Replace 'categories' with your state slice name
  console.log("co2 cats:",categories)

  const co2vals = ComputeTotalCo2(categories.categories)
  console.log("Calculate:",co2vals)

  const co2SumPerCategory = co2vals.cats
  const totalCo2Sum = co2vals.sum
  const baseCO2 = co2vals.base //  - co2vals.sum // regenerate base

  // console.log(co2SumPerCategory,totalCo2Sum,baseCO2)

  const localCats = location.state.categories;
  console.log("Local cats:",localCats)

  /*
  const co2ValuesPerCategory = location.state.co2ValuesPerCategory;
  const categories = location.state.categories;
  const baseCO2 = 1.15;

  console.log("DBG - co2values:",co2ValuesPerCategory)

  const co2SumPerCategory = co2ValuesPerCategory.map((category) =>
    category.reduce((a, b) => a + b, 0)
  );
  const totalCo2Sum = co2SumPerCategory.reduce((a, b) => a + b, 0);
  */
  
  const truncate = (num, decimalPlaces) => {
    //console.log("Trunc:",num)
    const factor = Math.pow(10, decimalPlaces);
    return Math.floor(num * factor) / factor;
  };

  const chartData = [...localCats, "Grundwert"].map((category, index) => ({
    name: category,
    value: index === localCats.length ? baseCO2 : co2SumPerCategory[index],
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
  label={({ name, value }) => `${name}: ${truncate(value, 2)}`}
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
          ? "Danke für das Mitmachen bei der CO2 Runter-App. Ihre Daten wurden an das Dashboard übermittelt."
          : "Schade das Sie ihre Daten nicht mit uns und den anderen Nutzern teilen wollen."}
      </Typography>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Link to="/Dashboard" style={{ textDecoration: "none", width: "100%", marginBottom: "10px" }}>
          <Button variant="contained" style={{ width: "100%", marginBottom: "10px", marginTop: "10px" }}>
            Zum Dashboard
          </Button>
        </Link>
        <Button variant="outlined" onClick={() => navigate("/")} style={{ width: "100%", marginBottom: "10px" }}>
          Home
        </Button>
      </div>
      <Footer />
    </div>
  );
};

export default FinishScreen;