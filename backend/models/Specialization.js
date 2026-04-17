import db from '../config/sequelize.config.js';
import { DataTypes } from "sequelize";

export const Specialization = db.define("Specialization", {

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