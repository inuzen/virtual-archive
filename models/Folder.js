module.exports = (sequelize, DataTypes) => {
    const Folder = sequelize.define(
        'Folder',
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: 'Folder Name',
            },
            folderID: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
        },
        {
            timestamps: false,
            // options
        },
    );

    return Folder;
};
