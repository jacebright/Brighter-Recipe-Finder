
require('dotenv').config();
const sql = require('mssql');

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    port: parseInt(process.env.DB_PORT, 10),
    options: {
        encrypt: process.env.DB_ENCRYPT === "true",
        trustServerCertificate: false // Keep `false` unless using a self-signed cert
    }
};

async function connectDB() {
    try {
        const pool = await sql.connect(config);
        console.log("✅ Connected to Azure SQL Database!");
        return pool;
    } catch (error) {
        console.error("❌ Database connection failed:", error);
        process.exit(1);
    }
}

module.exports = { connectDB, sql };
