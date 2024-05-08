const config = {
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

module.exports = config;
