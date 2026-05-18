import { Specialization } from '../models/Specialization.js';
import { User } from '../models/User.js';
import AppError from '../utils/appError.js';

export const createSpecializationSrv = async ({ user_id, categoriesList }) => {
  const specializations = await Specialization.bulkCreate(
    categoriesList.map((c) => ({
      user_id,
      category_id: c.id,
    })),
    { ignoreDuplicates: true }
  );

  return specializations;
};

export const updateSpecializationSrv = async ({ user_id, categoriesList }) => {
  const user = await User.findByPk(user_id);
  if (!user) throw new AppError('Usuario no encontrado', 404);

  await user.setCategories(categoriesList);
  return user.getCategories();
};