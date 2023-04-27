const express = require('express');
const router = express.Router();
const {db} = require('../services/db');


//return a json with the calculated average footprint of each district seperated by category
router.get('/footprints',async (req, res) => {
    const query = `
    SELECT d.name AS district, 
           'mobility' AS category, 
           AVG(p.mobility) AS value
    FROM Districts d
    JOIN Prints_In_Districts pd ON d.district_ID = pd.district_ID
    JOIN CO2Prints p ON pd.print_ID = p.print_ID
    GROUP BY d.district_ID
    UNION
    SELECT d.name AS district, 
           'housing' AS category, 
           AVG(p.housing) AS value
    FROM Districts d
    JOIN Prints_In_Districts pd ON d.district_ID = pd.district_ID
    JOIN CO2Prints p ON pd.print_ID = p.print_ID
    GROUP BY d.district_ID
    UNION
    SELECT d.name AS district, 
           'consume' AS category, 
           AVG(p.consume) AS value
    FROM Districts d
    JOIN Prints_In_Districts pd ON d.district_ID = pd.district_ID
    JOIN CO2Prints p ON pd.print_ID = p.print_ID
    GROUP BY d.district_ID
    UNION
    SELECT d.name AS district, 
           'nutrition' AS category, 
           AVG(p.nutrition) AS value
    FROM Districts d
    JOIN Prints_In_Districts pd ON d.district_ID = pd.district_ID
    JOIN CO2Prints p ON pd.print_ID = p.print_ID
    GROUP BY d.district_ID
  `;
  
  // Execute the query
  db.query(query, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Error retrieving data' });
    } else {
      // Convert the results to an object with category arrays
      const categories = results.reduce((acc, curr) => {
        const category = curr.category;
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push({
          name: curr.district,
          value: curr.value
        });
        return acc;
      }, {});
      
      // Send the categories as JSON
      res.json(categories);
    }
  });
});

module.exports = router;