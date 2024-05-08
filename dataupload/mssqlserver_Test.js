const sql = require("mssql/msnodesqlv8");
const config1 = {
  user: "sa",
  password: "123456",
  database: "PCSC",
  server: "localhost",
  port: 1433,
  driver: "msnodesqlv8",
  options: {
    trustedconnection: true,
    enableArithAbort: true,
    instancename: "SQLEXPRESS",
  },
};

const config2 = {
  server: "BCT-DELL\\SQLEXPRESS",
  database: "PCSC",
  driver: "msnodesqlv8",
  options: {
    trustedconnection: true,
  },
};

sql.connect(config1, function (err) {
  if (err) throw err;
  console.log("Connected");
  sql.close();
});
