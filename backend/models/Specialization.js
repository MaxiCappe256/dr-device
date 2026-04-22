import sequelize from '../db/index.js';
import { DataTypes } from "sequelize";

export const Specialization = sequelize.define("Specialization", {

  user_id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },

  category_id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },

}, {
  tableName: "specializations",
<<<<<<< HEAD
  timestamps: true,
});
=======
  timestamps: false,
});

Specialization.associate = (models) => {
  Specialization.belongsTo(models.User, { foreignKey: 'user_id' })
  Specialization.belongsTo(models.Category, { foreignKey: 'category_id' })
}
>>>>>>> 9b4d87a4386b9ec15636af9c51bfff0f6dade0fa
