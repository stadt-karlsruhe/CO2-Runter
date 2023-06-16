import React, { useState, useEffect } from "react";
import ReactEcharts from "echarts-for-react";
import * as echarts from "echarts";
import geoJson from './districts_geo.json';
import sampleData from './sampleData.json';
import axios from 'axios';

echarts.registerMap('Karlsruhe', geoJson);

export default function District_Map() {
  const [data, setData] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    axios.get('/api/dashboard/footprints')
      .then((res) => {
        console.log(res.data);
        setData({
          mobility: res.data.mobility,
          nutrition: res.data.nutrition,
          consume: res.data.consume,
          housing: res.data.housing
        });
        setDataLoaded(true);
      })
      .catch((error) => {
        console.log(error);
        setData(sampleData);
        setDataLoaded(true);

      });
  }, []);

  const mapOption = {
    title: {
      text: 'CO2 Emissionen in Karlsruhe',
      left: 'center',
      padding: 10
    },
    legend: {
      top: 35,
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}<br/>{c} (kg CO2)'
    },
    grid :
    {
      left: 'left',
    },
    visualMap: {
      min: 0,
      max: 20,
      orient: 'horizontal',
      left: 'center',
      bottom: '5%',
      inRange: {
        color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
      },
      text: ['High', 'Low'],
      calculable: true
    },
    roam: 'scale',
    scaleLimit: {
          min: 1,
          max: 5
    },
    series: dataLoaded ? [
      {
        name: 'Mobilität',
        type: 'map',
        map: 'Karlsruhe',
        showLegendSymbol : false,
        emphasis: {
          label: {
            show: true
          }
        },
        data: data.mobility

        }, {
        name: 'Ernährung',
        type: 'map',
        map: 'Karlsruhe',
        showLegendSymbol : false,
        emphasis: {
          label: {
            show: true
          }
        },
        data: data.nutrition
      },
      {
        name: 'Konsum',
        type: 'map',
        map: 'Karlsruhe',
        showLegendSymbol : false,
        emphasis: {
          label: {
            show: true
          }
        },
        data: data.consume
      },
      {
        name: 'Wohnen',
        type: 'map',
        map: 'Karlsruhe',
        showLegendSymbol : false,
        data: data.housing
      }
    ] : [],
  

  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60vh" }}>
      {dataLoaded ? (
          <ReactEcharts option={mapOption} style={{ width: "100%", height: "60vh" }} />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
  
  
};
