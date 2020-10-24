module.exports = (sequelize, DataTypes) => {
    const Shelf = sequelize.define(
        'Shelf',
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: 'Shelf Name',
            },
            number: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 1,
            },
            // shelfID: {
            //     type: DataTypes.UUID,
            //     defaultValue: DataTypes.UUIDV4,
            //     primaryKey: true,
            // },
        },
        {
            timestamps: false,

            // options
        },
    );

    return Shelf;
};
