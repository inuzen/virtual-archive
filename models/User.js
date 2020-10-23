module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User',
        {
            // attributes
            firstName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            lastName: {
                type: DataTypes.STRING,
                // allowNull defaults to true
            },
        },
        {
            // options
        },
    );

    return User;
};
