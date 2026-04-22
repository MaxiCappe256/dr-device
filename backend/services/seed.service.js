import * as bcrypt from "bcryptjs";
import sequelize from "../db/index.js";
import models from "../models/index.js";
import seedData from "../utils/seed.data.json" with { type: "json" };

const { User, Role, RoleUser, Category, Order, TechnicianOffer, Specialization } =
  models;

function parseSeedDate(value) {
  if (value == null || value === "") return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

export const clearDBSrv = async () => {
  const t = await sequelize.transaction();
  try {
    // Orden de borrado (primero tablas intermedia / con FK):
    // 1) technician_offers (FK a orders y users)
    // 2) specializations (FK a users y categories)
    // 3) roles_users (FK a users y roles)
    // 4) orders (FK a users y categories)
    // 5) users / roles / categories
    const deleted = {
      technician_offers: await TechnicianOffer.destroy({
        where: {},
        transaction: t,
      }),
      specializations: await Specialization.destroy({
        where: {},
        transaction: t,
      }),
      roles_users: await RoleUser.destroy({ where: {}, transaction: t }),
      orders: await Order.destroy({ where: {}, transaction: t }),
      users: await User.destroy({ where: {}, transaction: t }),
      roles: await Role.destroy({ where: {}, transaction: t }),
      categories: await Category.destroy({ where: {}, transaction: t }),
    };

    await t.commit();
    return { ok: true, deleted };
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

export const executeSrv = async () => {
  const t = await sequelize.transaction();
  try {
    const seedPassword = seedData?.meta?.seed_password_plain || "123456";
    const hashedPassword = await bcrypt.hash(seedPassword, 12);

    // 1) Roles
    for (const role of seedData.roles) {
      await Role.upsert(role, { transaction: t });
    }

    // 2) Categorías
    for (const category of seedData.categories) {
      await Category.upsert(category, { transaction: t });
    }

    // 3) Usuarios (password del seed hasheada)
    for (const user of seedData.users) {
      await User.upsert(
        {
          ...user,
          password: hashedPassword,
        },
        { transaction: t },
      );
    }

    // 4) RolesUsers (tabla intermedia con id)
    for (const ru of seedData.roles_users) {
      await RoleUser.upsert(ru, { transaction: t });
    }

    // 5) Specializations (PK compuesta: user_id + category_id)
    for (const spec of seedData.specializations) {
      await Specialization.findOrCreate({
        where: { user_id: spec.user_id, category_id: spec.category_id },
        defaults: spec,
        transaction: t,
      });
    }

    // 6) Órdenes (finished_at / canceled_at en ISO como Sequelize timestamps)
    for (const o of seedData.orders) {
      await Order.upsert(
        {
          id: o.id,
          status: o.status,
          description: o.description,
          user_id: o.user_id,
          technician_id: o.technician_id,
          category_id: o.category_id,
          finished_at: parseSeedDate(o.finished_at),
          canceled_at: parseSeedDate(o.canceled_at),
        },
        { transaction: t },
      );
    }

    // 7) Ofertas (PK compuesta: technician_id + order_id; created_at en ISO)
    for (const offer of seedData.technician_offers) {
      await TechnicianOffer.findOrCreate({
        where: {
          technician_id: offer.technician_id,
          order_id: offer.order_id,
        },
        defaults: {
          technician_id: offer.technician_id,
          order_id: offer.order_id,
          status: offer.status,
          price: offer.price,
          description: offer.description,
        },
        transaction: t,
      });
    }

    await t.commit();
    return {
      ok: true,
      seed_password_plain: seedPassword,
      counts: {
        roles: seedData.roles.length,
        categories: seedData.categories.length,
        users: seedData.users.length,
        roles_users: seedData.roles_users.length,
        specializations: seedData.specializations.length,
        orders: seedData.orders.length,
        technician_offers: seedData.technician_offers.length,
      },
    };
  } catch (error) {
    await t.rollback();
    throw error;
  }
};