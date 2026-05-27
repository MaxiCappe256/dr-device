import sequelize from '../db/index.js';
import { DataTypes } from 'sequelize';

export const RolePermission = sequelize.define(
  'RolePermission',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    role_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    permission_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    tableName: 'role_permission',
    timestamps: false,
    underscored: true,
    indexes: [
      { unique: true, fields: ['role_id', 'permission_id'] },
    ],
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
