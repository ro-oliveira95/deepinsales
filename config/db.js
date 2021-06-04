const Pool = require("pg").Pool;

const pool = new Pool({
  host: "/var/run/postgresql",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// const pool = new Pool({
//   host: "/var/run/postgresql",
//   user: "rodrigo",
//   password: "f0da-se123",
//   database: "deepinsale-db",
// });

module.exports = {
  query: async (text, params, callback) => {
    const res = await pool.query(text, params, callback);
    return res;
  },
};
