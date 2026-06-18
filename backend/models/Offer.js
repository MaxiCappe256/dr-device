import sequelize from '../db/index.js';
import { DataTypes } from 'sequelize';

export const Offer = sequelize.define(
  'Offer',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    technician_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    order_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('REJECTED', 'PENDING', 'ACCEPTED'),
      defaultValue: 'PENDING',
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: 'offers',
    timestamps: true,
    underscored: true,
    indexes: [
      { unique: true, fields: ['technician_id', 'order_id'] },
    ],
  },
);

Offer.associate = (models) => {
  Offer.belongsTo(models.User, { foreignKey: 'technician_id' });
  Offer.belongsTo(models.Order, { foreignKey: 'order_id' });
};
