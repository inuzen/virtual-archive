module.exports = (sequelize, DataTypes) => {
    const Document = sequelize.define(
        'Document',
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            number: {
                type: DataTypes.STRING,
            },
            designation: {
                type: DataTypes.STRING,
            },
            description: {
                type: DataTypes.TEXT,
            },
            tags: {
                type: DataTypes.ARRAY(DataTypes.STRING),
            },
        },
        {
            timestamps: false,
        },
    );

    return Document;
};
