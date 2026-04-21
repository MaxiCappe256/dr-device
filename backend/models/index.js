// importar tablas db y ejecutar relaciones

import { Order } from './Order.js';
import { Role } from './Role.js';
import { RoleUser } from './RoleUser.js';
import { User } from './User.js';
import { Category } from './Category.js';
import { TechnicianOffer } from './TechnicianOffer.js';
import { Specialization } from './Specialization.js';

const models = {
  User,
  Role,
  RoleUser,
  Order,
  Category,
  TechnicianOffer,
  Specialization,
};

Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

export default models;
