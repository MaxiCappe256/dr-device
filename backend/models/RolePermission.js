import sequelize from '../db/index.js';
import { DataTypes } from 'sequelize';

export const RolePermission = sequelize.define(
  'RolePermission',
  {
    role_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    permission_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    tableName: 'role_permission',
    timestamps: false,
  },
);
RolePermission.associate = (models) => {
  RolePermission.belongsTo(models.Role, {
    foreignKey: 'role_id',
  });

  RolePermission.belongsTo(models.Permission, {
    foreignKey: 'permission_id',
  });
};
