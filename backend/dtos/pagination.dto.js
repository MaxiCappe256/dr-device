import { query } from "express-validator";
import validate from "../middlewares/validate.middleware.js";

export const paginationDTO = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("page debe ser un entero >= 1"),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("limit debe ser entre 1 y 100"),

  validate,
];
