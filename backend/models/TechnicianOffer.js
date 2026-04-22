import sequelize from '../db/index.js';
import { DataTypes } from 'sequelize';

export const TechnicianOffer = sequelize.define(
  'TechnicianOffer',
  {
    technician_id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    order_id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'PENDING',
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'technician_offers',
    timestamps: true,
  },
);

TechnicianOffer.associate = (models) => {
  TechnicianOffer.belongsTo(models.User, { foreignKey: 'technician_id' })
  TechnicianOffer.belongsTo(models.Order, { foreignKey: 'order_id' })
};