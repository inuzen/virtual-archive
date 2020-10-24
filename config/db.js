const Sequelize = require('sequelize');
const config = require('config');
const UserModel = require('../models/User');
const DocumentModel = require('../models/Document');
const ShelfModel = require('../models/Shelf');
const FolderModel = require('../models/Folder');
const db = config.get('postgresURI');
const sequelize = new Sequelize(db);

const Shelf = ShelfModel(sequelize, Sequelize);
const Folder = FolderModel(sequelize, Sequelize);
const Document = DocumentModel(sequelize, Sequelize);

Shelf.hasMany(Folder);
Folder.belongsTo(Shelf);

Folder.hasMany(Folder);
Folder.belongsTo(Folder, {
    foreignKey: 'parentFolderId',
});

Folder.hasMany(Document);
Document.belongsTo(Folder);

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

module.exports = { connectDB, sequelize, Sequelize, Shelf, Folder, Document };
