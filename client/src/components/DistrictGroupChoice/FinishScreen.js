import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import { Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const FinishScreen = ({ co2ValuesPerCategory, categories, dataSent }) => {
  const navigate = useNavigate();

  const co2SumPerCategory = co2ValuesPerCategory.map((category) =>
    category.reduce((a, b) => a + b, 0)
  );

  const chartData = categories.map((category, index) => ({
    name: category,
    value: co2SumPerCategory[index],
  }));
  return (
    <>
      <Typography variant="body1">
        {dataSent
          ? 'Danke für das Mitmachen bei der Co2App. Deine Daten wurden an das Dashboard übermittelt.'
          : 'Schade das Sie ihre Daten nicht mit uns und den anderen Nutzern teilen wollen.'}
      </Typography>
      <PieChart width={400} height={400}>
        <Pie
          data={chartData}
          cx={200}
          cy={200}
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
      <Button onClick={() => navigate('/')}>Zum Dashboard</Button>
      <Button onClick={() => navigate('/')}>Home</Button>
    </>
  );
};

export default FinishScreen;
