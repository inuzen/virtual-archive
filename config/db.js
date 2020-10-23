const Sequelize = require('sequelize');
const config = require('config');
const UserModel = require('../models/User');
const DocumentModel = require('../models/Document');
const db = config.get('postgresURI');
const sequelize = new Sequelize(db);

const Document = DocumentModel(sequelize, Sequelize);
const User = UserModel(sequelize, Sequelize);
User.hasMany(Document);

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Postgres Connected');

        await sequelize.sync({ force: true });
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = { connectDB, sequelize, Sequelize, Document, User };
