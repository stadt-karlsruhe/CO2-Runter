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

router.get('/footprints/average', async (req, res) => {
  const query = `
    SELECT 'mobility' AS category,
      ROUND(AVG(mobility), 2) AS value
    FROM CO2Prints
    UNION
    SELECT 'housing' AS category,
      ROUND(AVG(housing), 2) AS value
    FROM CO2Prints
    UNION
    SELECT 'consume' AS category,
      ROUND(AVG(consume), 2) AS value
    FROM CO2Prints
    UNION
    SELECT 'nutrition' AS category,
      ROUND(AVG(nutrition), 2) AS value
    FROM CO2Prints
    UNION
    SELECT 'baseline' AS category,
     baseline FROM ComparisonPrints AS Value
    

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
    SELECT name, mobility AS 'Mobilität', housing AS 'Wohnen', consume AS 'Konsum', nutrition AS 'Ernährung', baseline AS "Infrastruktur" 
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
          value: value,
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

router.get('/groupfootprint', (req, res) => {
  const groupCode = req.query.groupcode;

  if (!groupCode) {
    return res.status(400).json({ error: 'Missing groupcode' });
  }

  const groupQuery = `
    SELECT group_ID, groupname
    FROM Carbon_Footprint_Groups
    WHERE groupcode = ?
  `;

  db.query(groupQuery, [groupCode], (error, groupResults) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error retrieving data' });
    }

    if (groupResults.length === 0) {
      return res.status(404).json({ error: 'Group not found' });
    }

    const groupId = groupResults[0].group_ID;
    const groupName = groupResults[0].groupname;

    const printQuery = `
      SELECT print_ID
      FROM Prints_In_Carbon_Footprint_Groups
      WHERE group_ID = ?
    `;

    db.query(printQuery, [groupId], (error, printResults) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error retrieving data' });
      }

      if (printResults.length === 0) {
        const response = {
          name: groupName,
          values: [],
        };

        return res.json(response);
      }

      const printIDs = printResults.map((result) => result.print_ID);

      const footprintQuery = `
        SELECT 'Mobilität' AS category, ROUND(AVG(mobility), 2) AS value
        FROM CO2Prints
        WHERE print_ID IN (?)
        UNION
        SELECT 'Wohnen' AS category, ROUND(AVG(housing), 2) AS value
        FROM CO2Prints
        WHERE print_ID IN (?)
        UNION
        SELECT 'Konsum' AS category, ROUND(AVG(consume), 2) AS value
        FROM CO2Prints
        WHERE print_ID IN (?)
        UNION
        SELECT 'Ernährung' AS category, ROUND(AVG(nutrition), 2) AS value
        FROM CO2Prints
        WHERE print_ID IN (?)
        UNION
        SELECT 'baseline' AS category,
         baseline FROM ComparisonPrints AS Value
    
      `;

      db.query(footprintQuery, [printIDs, printIDs, printIDs, printIDs], (error, footprintResults) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ error: 'Error retrieving data' });
        }

        const categories = footprintResults.map((result) => ({
          category: result.category,
          value: result.value || 0,
        }));

        const response = {
          name: groupName,
          values: categories,
        };

        return res.json(response);
      });
    });
  });
});
module.exports = router;