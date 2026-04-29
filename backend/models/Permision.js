import sequelize from '../db/index.js';
import { DataTypes } from 'sequelize';

export const Permission = sequelize.define(
  'Permission',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    action: {
      type: DataTypes.STRING(100),
    },
  },
  {
    tableName: 'permissions',
    timestamps: true,
  },
);

Permission.associate = (models) => {
  Permission.belongsToMany(models.Role, {
    through: models.RolePermission,
    foreignKey: 'permission_id',
    as: 'roles',
  });
};
