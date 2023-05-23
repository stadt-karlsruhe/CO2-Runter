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

//return a json with the calculated average footprint of all footprints seperated by category
router.get('/footprints/average',async (req, res) => {
    const query = `
    SELECT 'mobility' AS category,
            AVG(mobility) AS value
    FROM CO2Prints
    UNION
    SELECT 'housing' AS category,
            AVG(housing) AS value
    FROM CO2Prints
    UNION
    SELECT 'consume' AS category,
            AVG(consume) AS value
    FROM CO2Prints
    UNION
    SELECT 'nutrition' AS category,
            AVG(nutrition) AS value
    FROM CO2Prints
  `;

  // Execute the query
  db.query(query, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Error retrieving data' });
    } else {
     // Map the results to the desired JSON format
      const categories = results.map((result) => ({
        category: result.category,
        value: result.value,
    }));

    // Send the categories as JSON
    res.json(categories);

    }
  });
});

router.get('/comparisonprints', async (req, res) => {
  const query = `
    SELECT name, mobility AS 'Category 1', housing AS 'Category 2', consume AS 'Category 3', nutrition AS 'Category 4'
    FROM ComparisonPrints
  `;

  // Execute the query
  db.query(query, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Error retrieving data' });
    } else {
      // Convert the results to the desired JSON format
      const response = results.map((result) => {
        const name = result.name;
        const values = Object.entries(result).map(([category, value]) => ({
          category,
          value
        }));

        // Remove the 'name' entry from the values array
        const filteredValues = values.filter((entry) => entry.category !== 'name');

        return { name, values: filteredValues };
      });

      // Send the response as JSON
      res.json(response);
    }
  });
});

module.exports = router;