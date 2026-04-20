import sequelize from '../db/index.js';
import { DataTypes } from 'sequelize';

export const Role = sequelize.define(
  'Role',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'roles',
    timestamps: false,
  },
);

Role.associate = (models) => {

  Role.belongsToMany(models.User, {
    through: models.RolesUsers,
    foreignKey: "role_id"
  });

};
