const Pool = require("pg").Pool;

const pool = new Pool({
  host: "/var/run/postgresql",
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

module.exports = {
  query: async (text, params, callback) => {
    const res = await pool.query(text, params, callback);
    return res;
  },
};
