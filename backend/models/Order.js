import sequelize from '../db/index.js';
import { DataTypes } from 'sequelize';
import { Category } from './Category.js';

// falta terminar las relaciones

export const Order = sequelize.define(
  'Order',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    status: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: 'PENDING',
    },

    description: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    technician_id: {
      type: DataTypes.UUID,
    },

    category_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    finished_at: {
      type: DataTypes.DATE,
    },

    canceled_at: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: 'orders',
    timestamps: false,
  },
);

Order.associate = (models) => {
  Order.belongsTo(models.User, {
    foreignKey: 'user_id',
  });

  Order.belongsTo(models.User, {
    foreignKey: 'technician_id',
  });

  Order.belongsTo(models.Category, {
    foreignKey: 'category_id',
  });

  Order.belongsToMany(models.User, {
    through: models.TechnicianOffer,
    foreignKey: 'order_id',
  });
};

Category.associate = (models) => {
  Category.hasMany(models.Order, {
    foreignKey: 'category_id',
  });

  Category.belongsToMany(models.User, {
    through: models.Specialization,
    foreignKey: 'category_id',
  });
};
