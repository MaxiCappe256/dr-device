import sequelize from '../db/index.js';
import { DataTypes } from 'sequelize';

export const RoleUser = sequelize.define(
  'RolesUsers',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
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
    timestamps: true,
    underscored: true,
    indexes: [
      { unique: true, fields: ['user_id', 'role_id'] },
    ],
  },
);
RoleUser.associate = (models) => {
  RoleUser.belongsTo(models.Role, { foreignKey: 'role_id' });
  RoleUser.belongsTo(models.User, { foreignKey: 'user_id' });
};
