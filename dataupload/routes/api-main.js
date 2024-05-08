const express = require("express");
const router = express.Router();

async function getData(query) {
  const connected = await checkConnection();
  if (connected) {
    try {
      await sql.connect(config);
      // const query = `SELECT * FROM your_memtable`; // Replace with your table name
      const result = await sql.query(query);
      return result.recordset;
    } catch (error) {
      console.error("Error getting data:", error);
      return null;
    } finally {
      await sql.close();
    }
  } else {
    return null; // Indicate failed connection
  }
}

router.get("/", async (req, res) => {
  const data = await getData("select top 10 * from memdata");
  if (data) {
    res.json(data); // Assuming you want to return data as JSON
  } else {
    res.status(500).send("Error retrieving data or connecting to SQL Server");
  }
});

module.exports = router;
