require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB, sql } = require('./src/js/db');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to the database when the server starts
connectDB();

// Sample API to fetch users
app.get('/users', async (req, res) => {
    try {
        const pool = await sql.connect();
        const result = await pool.request().query("SELECT * FROM Users");
        res.json(result.recordset);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
