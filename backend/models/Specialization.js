import sequelize from '../db/index.js';
import { DataTypes } from 'sequelize';

export const Specialization = sequelize.define(
  'Specialization',
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
    category_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    tableName: 'specializations',
    timestamps: true,
    underscored: true,
    indexes: [
      { unique: true, fields: ['user_id', 'category_id'] },
    ],
  },
);

Specialization.associate = (models) => {
  Specialization.belongsTo(models.User, { foreignKey: 'user_id' });
  Specialization.belongsTo(models.Category, { foreignKey: 'category_id' });
};
