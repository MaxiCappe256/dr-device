import { Op } from 'sequelize';
import { Category } from '../models/Category.js';
import AppError from '../utils/appError.js';

export const getCategoriesSrv = async () => {
  const categories = await Category.findAll();

  if (!categories || !categories.length) {
    throw new AppError('No se han encontrado categorias', 404);
  }

  return categories;
};

export const getCategorySrv = async (id) => {
  const category = await Category.findByPk(id);

  if (!category) {
    throw new AppError('No se ha encontrado la categoria', 404);
  }

  return category;
};

export const createCategorySrv = async ({ name, description }) => {
  const category = await Category.create({ name, description });

  if (!category) {
    throw new AppError('No se ha podido crear la categoria', 400);
  }

  return category;
};

export const updateCategorySrv = async ({ id, name, description }) => {
  const payload = {};

  if (name !== undefined) payload.name = name;
  if (description !== undefined) payload.description = description;

  const [updatedRows] = await Category.update(payload, { where: { id } });

  if (!updatedRows) {
    throw new AppError('No se ha podido actualizar la categoria', 400);
  }

  return getCategorySrv(id);
};

export const deleteCategorySrv = async (id) => {
  const deletedRows = await Category.destroy({ where: { id } });

  if (!deletedRows) {
    throw new AppError('No se ha podido eliminar la categoria', 400);
  }

  return deletedRows;
};

export const checkExistsCategorySrv = async (name, excludeId) => {
  const where = { name };

  if (excludeId) {
    where.id = { [Op.ne]: excludeId };
  }

  const category = await Category.findOne({ where });

  // El doble !! nos sirve para evitar hacer un if(object) true y conseguir hacer un booleano.
  return !!category;
};
