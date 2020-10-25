const Sequelize = require('sequelize');
const config = require('config');

const DocumentModel = require('../models/Document');
const ShelfModel = require('../models/Shelf');
const FolderModel = require('../models/Folder');
const db = config.get('postgresURI');
const sequelize = new Sequelize(db);
const queryInterface = sequelize.getQueryInterface();
const Shelf = ShelfModel(sequelize, Sequelize);
const Folder = FolderModel(sequelize, Sequelize);
const Document = DocumentModel(sequelize, Sequelize);

Shelf.hasMany(Folder);
Folder.belongsTo(Shelf);

Folder.hasMany(Folder, {
    foreignKey: 'parentFolderId',
});
Folder.belongsTo(Folder, {
    foreignKey: 'parentFolderId',
});

Folder.hasMany(Document);
Document.belongsTo(Folder);

const shelfNames = ['НТЦ ПРОТЕЙ', 'ПРОТЕЙ СТ (АРХ)', 'ПРОТЕЙ (СЕРТ)'];

const createShelves = async () => {
    await Shelf.bulkCreate(
        shelfNames.reduce((acc, shelf) => {
            for (let index = 1; index <= 6; index++) {
                acc.push({
                    name: shelf,
                    number: index,
                });
            }
            return acc;
        }, []),
    );
};

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Postgres Connected');

        await sequelize.sync({ alter: true });

        const shelves = await Shelf.findAll();
        if (shelves.length < 18) {
            await sequelize.sync({ force: true });
            createShelves();
            console.log('The number if shelves was less than required so the whole db was recreated');
        }
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = { connectDB, sequelize, Sequelize, queryInterface, Shelf, Folder, Document };
