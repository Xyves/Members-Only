const { Pool } = require("pg");
require("dotenv").config();
module.exports = new Pool({
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  port: 6543,
});
console.log("Total clients:", Pool.totalCount);
console.log("Idle clients:", Pool.idleCount);
console.log("Waiting clients:", Pool.waitingCount);
