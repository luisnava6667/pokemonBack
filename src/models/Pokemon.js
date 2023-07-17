const { DataTypes } = require('sequelize')
module.exports = (sequelize) => {
  sequelize.define(
    'Pokemon',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      image: {
        type: DataTypes.STRING(200),
        allowNull: false
      },
      characteristic: {
        type: DataTypes.STRING,
        allowNull: false
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 500
        }
      },
      attack: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 500
        }
      },
      defense: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 500
        }
      },
      special_attack: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 500
        }
      },
      special_defense: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 500
        }
      },
      speed: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 500
        }
      },
      height: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          min: 1,
          max: 500
        }
      },
      weight: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          min: 1,
          max: 500
        }
      },

      createDB: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      }
    },
    {
      timestamps: false,
      hooks: {
        beforeCreate: async (pokemon) => {
          const lastPokemon = await sequelize.models.Pokemon.findOne({
            order: [['id', 'DESC']]
          })
          const newId = lastPokemon ? lastPokemon.id + 1 : 20000
          pokemon.id = newId
        }
      }
    }
  )
}
