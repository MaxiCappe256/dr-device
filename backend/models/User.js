import sequelize from "../db/index.js";
import { DataTypes } from "sequelize";

export const User = sequelize.define(
  "User",
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
      type: DataTypes.STRING(20),
    },

    avatar: {
      type: DataTypes.STRING,
    },
    deleted_at: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "users",
    timestamps: true,
  },
);

User.associate = (models) => {
  User.hasMany(models.Order, {
<<<<<<< HEAD
    foreignKey: "user_id",
  });

  User.hasMany(models.Order, {
    foreignKey: "technician_id",
  });

  User.belongsToMany(models.Role, {
    through: models.RoleUser,
    foreignKey: "user_id",
  });

  User.belongsToMany(models.Category, {
    through: models.Specialization,
    foreignKey: "user_id",
  });

  User.belongsToMany(models.Order, {
    through: models.TechnicianOffer,
    foreignKey: "technician_id",
  });
};
=======
    foreignKey: 'user_id',
    as: 'ClientOrders'
  })

  User.hasMany(models.Order, {
    foreignKey: 'technician_id',
    as: 'TechnicianOrders'
  })

  User.belongsToMany(models.Role, {
    through: models.RoleUser,
    foreignKey: 'user_id',
    as: 'Roles'
  })

  User.belongsToMany(models.Category, {
    through: models.Specialization,
    foreignKey: 'user_id',
    as: 'Specializations'
  })

  User.belongsToMany(models.Order, {
    through: models.TechnicianOffer,
    foreignKey: 'technician_id',
    as: 'OfferedOrders'
  })
}
>>>>>>> 9b4d87a4386b9ec15636af9c51bfff0f6dade0fa
