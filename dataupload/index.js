const express = require("express");
const ejs = require("ejs");
const multer = require("multer");
const sql = require("mssql/msnodesqlv8");
const XLSX = require("xlsx");

const app = express();
app.set("view engine", "ejs");

const config = require("./mssqlconfig");
// async function checkConnection() {
//   try {
//     await sql.connect(config);
//     console.log("Connected to SQL Server successfully!");
//     await sql.close();
//     return true;
//   } catch (error) {
//     console.error("Error connecting to SQL Server:", error);
//     return false;
//   }
// }

const upload = multer({ dest: "uploads/" });

async function readExcelData(filePath) {
  try {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
    return sheetData;
  } catch (error) {
    console.error("Error reading Excel file:", error);
    return null;
  }
}
async function insertDataToSQL(data) {
  try {
    const pool = await sql.connect(config);
    const query = `INSERT INTO memdata (MEMTYPE,GNO,CustID,Name,Rank,Station,Company,Status,MonthLimit,PurchaseLimit,Phone)
       VALUES (@MEMTYPE,@GNO,@CustID,@Name,@Rank,@Station,@Company,@Status,@MonthLimit,@PurchaseLimit,@Phone)`;

    for (const row of data) {
      const {
        MEMTYPE,
        GNO,
        CustID,
        Name,
        Rank,
        Station,
        Company,
        Status,
        MonthLimit,
        PurchaseLimit,
        Phone,
      } = row;

      const values = {
        MEMTYPE,
        GNO,
        CustID,
        Name,
        Rank,
        Station,
        Company,
        Status,
        MonthLimit,
        PurchaseLimit,
        Phone,
      };
      const result = await pool.query(query, values);

      console.log("Data inserted successfully");
      console.log(result);
    }
    console.log("Data imported successfully!");
  } catch (error) {
    console.error("Error inserting data:", error);
  } finally {
    await sql.close();
  }
}

async function updataData() {
  console.log("reading excel start");
  const data = await readExcelData(
    "D:\\Canteen2016\\2024 new rules\\BZAEMPDATA.xlsx"
  );
  console.log("end excel start");

  console.log("start insert", data.length);
  if (data) {
    let resdata = await insertDataToSQL(data);
    console.log(resdata);
    // res.render("index", { data }); // Display data after successful upload
  } else {
    console.log("error");
    // res.status(400).send("Error reading Excel file");
  }
}

updataData();

// checkConnection();

app.listen(3000, () => console.log("Server listening on port 3000"));
