require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connect_mysql } = require('./config/db.mysql');
const connect_mongodb = require('./config/db.mongo');
const apiRoutes = require('./routes/api');

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api', apiRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'Server is running' });
});

const PORT = process.env.PORT || 5000;

const start_server = async () => {
    try {
        const hasMysqlConfig = !!(process.env.MYSQL_DB && process.env.MYSQL_USER);
        const hasMongoConfig = !!process.env.MONGO_URI;

        if (hasMysqlConfig) {
            await connect_mysql();
        } else {
            console.warn('MySQL env vars are not set. Skipping MySQL connection. Add MYSQL_DB and MYSQL_USER to enable database-backed features.');
        }

        if (hasMongoConfig) {
            await connect_mongodb();
        } else {
            console.warn('MONGO_URI is not set. Skipping MongoDB connection.');
        }

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Unable to start server:', error);
        process.exit(1);
    }
};

start_server();