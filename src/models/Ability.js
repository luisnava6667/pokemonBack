const { DataTypes } = require('sequelize')
module.exports = (sequelize) => {
  sequelize.define(
    'Ability',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    { timestamps: false }
  )
}
