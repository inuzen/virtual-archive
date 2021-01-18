module.exports = (sequelize, DataTypes) => {
    const Folder = sequelize.define(
        'Folder',
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            designation: {
                type: DataTypes.STRING,
                // allowNull: false,
            },
            year: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            number: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            format: {
                type: DataTypes.STRING,
            },
            isSubFolder: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
        },
        {
            timestamps: false,
            // options
        },
    );

    return Folder;
};
