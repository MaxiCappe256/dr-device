import db from '../config/sequelize.config.js';
import { DataTypes } from 'sequelize';

export const User = db.define(
  'User',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    full_name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        is: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      },
    },

    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    phone: {
      type: DataTypes.INTEGER,
    },

    avatar: {
      type: DataTypes.STRING,
    },

    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    updated_at: {
      type: DataTypes.DATE,
    },

    deleted_at: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: 'users',
    timestamps: false,
  },
);

User.associate = (models) => {
  User.hasMany(models.Order, {
    foreignKey: 'user_id',
  });

  User.hasMany(models.Order, {
    foreignKey: 'technician_id',
  });

  User.belongsToMany(models.Role, {
    through: models.RolesUsers,
    foreignKey: 'user_id',
  });

  User.belongsToMany(models.Category, {
    through: models.Specialization,
    foreignKey: 'user_id',
  });

  User.belongsToMany(models.Order, {
    through: models.TechnicianOffer,
    foreignKey: 'technician_id',
  });
};
