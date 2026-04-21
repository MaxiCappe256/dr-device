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
  timestamps: false,
});

Specialization.associate = (models) => {
  Specialization.belongsTo(models.User, { foreignKey: 'user_id' })
  Specialization.belongsTo(models.Category, { foreignKey: 'category_id' })
}