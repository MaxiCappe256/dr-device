import ApiResponse from '../handlers/response.js';
import {
  checkExistsCategorySrv,
  createCategorySrv,
  deleteCategorySrv,
  getCategoriesSrv,
  getCategorySrv,
  updateCategorySrv,
} from '../services/categories.service.js';

export const getCategoriesCtrl = async (req, res) => {
  const response = new ApiResponse(res);

  try {
    const categories = await getCategoriesSrv();
    response.ok('Categorias encontradas', categories);
  } catch (error) {
    console.error(error.message);
    if (error.statusCode === 404) return response.notFound(error.message);
    return response.error(error.message);
  }
};

export const getCategoryCtrl = async (req, res) => {
  const response = new ApiResponse(res);

  try {
    const category = await getCategorySrv(req.params.id);
    response.ok('Categoria encontrada', category);
  } catch (error) {
    console.error(error.message);
    if (error.statusCode === 404) return response.notFound(error.message);
    return response.error(error.message);
  }
};

export const createCategoryCtrl = async (req, res) => {
  const response = new ApiResponse(res);
  const { name, description } = req.body;

  try {
    const existsCategory = await checkExistsCategorySrv(name);

    if (existsCategory) {
      return response.conflict('La categoria con ese nombre ya se encuentra registrada.');
    }

    const category = await createCategorySrv({ name, description });
    response.created('Categoria creada', category);
  } catch (error) {
    console.error(error.message);
    if (error.statusCode === 400) return response.badRequest(error.message);
    if (error.statusCode === 404) return response.notFound(error.message);
    return response.error(error.message);
  }
};

export const updateCategoryCtrl = async (req, res) => {
  const response = new ApiResponse(res);
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    await getCategorySrv(id);

    if (name !== undefined) {
      const existsCategory = await checkExistsCategorySrv(name, id);

      if (existsCategory) {
        return response.conflict('La categoria con ese nombre ya se encuentra registrada.');
      }
    }

    const category = await updateCategorySrv({
      id,
      name,
      description,
    });

    response.ok('Categoria actualizada', category);
  } catch (error) {
    console.error(error.message);
    if (error.statusCode === 400) return response.badRequest(error.message);
    if (error.statusCode === 404) return response.notFound(error.message);
    return response.error(error.message);
  }
};

export const deleteCategoryCtrl = async (req, res) => {
  const response = new ApiResponse(res);
  const { id } = req.params;

  try {
    await getCategorySrv(id);
    await deleteCategorySrv(id);
    response.noContent();
  } catch (error) {
    console.error(error.message);
    if (error.name === 'SequelizeForeignKeyConstraintError') {
      return response.conflict('No se puede eliminar la categoria porque tiene registros asociados.');
    }
    if (error.statusCode === 400) return response.badRequest(error.message);
    if (error.statusCode === 404) return response.notFound(error.message);
    return response.error(error.message);
  }
};
