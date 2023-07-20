const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define(
    'Type',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      double_damage_from: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true
      },
      double_damage_to: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true
      },
      half_damage_from: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true
      },
      half_damage_to: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true
      },
      no_damage_from: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true
      },
      no_damage_to:{
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true
      }
    },
    { timestamps: false }
  )
}
