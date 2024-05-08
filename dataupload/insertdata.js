const fs = require("fs");
const csv = require("csv-parser");
const sql = require("mssql/msnodesqlv8");

const config = require("./mssqlconfig");
// Configuration for SQL Server connection
// const config = {
//   user: "your_username",
//   password: "your_password",
//   server: "your_server",
//   database: "your_database",
//   options: {
//     encrypt: true, // If you are connecting to Azure SQL Database, set to true
//   },
// };

// Function to insert data into SQL Server table
async function insertData(data) {
  try {
    const pool = await sql.connect(config);

    // SQL query to insert data
    const query = `INSERT INTO memdata (MEMTYPE, GNO, CustID, Name, Rank, Station, Company, Status, MonthLimit, PurchaseLimit)
                     VALUES (@MEMTYPE, @GNO, @CustID, @Name, @Rank, @Station, @Company, @Status, @MonthLimit, @PurchaseLimit)`;

    // Create a new transaction
    const transaction = new sql.Transaction(pool);
    await transaction.begin();

    // Create a new request
    const request = new sql.Request(transaction);

    // Declare parameters outside the loop
    request.input("MEMTYPE", sql.NVarChar);
    request.input("GNO", sql.Int);
    request.input("CustID", sql.Int);
    request.input("Name", sql.NVarChar);
    request.input("Rank", sql.NVarChar);
    request.input("Station", sql.NVarChar);
    request.input("Company", sql.NVarChar);
    request.input("Status", sql.NVarChar);
    request.input("MonthLimit", sql.Int);
    request.input("PurchaseLimit", sql.Int);

    // Iterate over each row of data and execute the insert query
    for (const row of data) {
      // Set parameter values for each iteration
      request.parameters["MEMTYPE"].value = row.MEMTYPE;
      request.parameters["GNO"].value = isNaN(row.GNO) ? 0 : parseInt(row.GNO);
      request.parameters["CustID"].value = isNaN(row.CustID)
        ? 0
        : parseInt(row.CustID);
      request.parameters["Name"].value = row.Name;
      request.parameters["Rank"].value = row.Rank;
      request.parameters["Station"].value = row.Station;
      request.parameters["Company"].value = row.Company;
      request.parameters["Status"].value = row.Status;
      request.parameters["MonthLimit"].value = isNaN(row.MonthLimit)
        ? 0
        : parseInt(row.MonthLimit);
      request.parameters["PurchaseLimit"].value = isNaN(row.PurchaseLimit)
        ? 0
        : parseFloat(row.PurchaseLimit);

      await request.query(query);
    }

    // Commit the transaction
    await transaction.commit();
    console.log("Data inserted successfully.");
  } catch (error) {
    console.error("Error inserting data:", error);
  }
}

// Read data from CSV file and call insertData function
const data = [];
fs.createReadStream("data.csv")
  .pipe(csv())
  .on("data", (row) => {
    data.push(row);
  })
  .on("end", () => {
    insertData(data);
  });
