module.exports = (sequelize, DataTypes) => {
    const Document = sequelize.define('Document', {
        name: {
            type: DataTypes.STRING,
        },
        number: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.TEXT,
        },
        tag: {
            type: DataTypes.ARRAY(DataTypes.STRING),
        },
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            unique: true,
        },
    });

    return Document;
};
