import sequelize from '../db/index.js';
import { DataTypes } from 'sequelize';

export const RolesUsers = sequelize.define(
  'RolesUsers',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    role_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    tableName: 'roles_users',
    timestamps: false,
  },
);
