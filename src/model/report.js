const {DataTypes} = require('sequelize');
const sqlz = require('../tools/database');

module.exports = sqlz.define('Error', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    outlet:{
        type: DataTypes.STRING,
        allowNull: false
    },
    apps:{
        type: DataTypes.STRING
    },
    version:{
        type: DataTypes.STRING
    },
    detail:{
        type: DataTypes.JSON
    },
    time:{
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
},{
    tableName: 'error',
    timestamps: false
});