import * as bcrypt from "bcryptjs";
import sequelize from "../db/index.js";
import models from "../models/index.js";
import seedData from "../utils/seed.data.json" with { type: "json" };

const {
  User,
  Role,
  RoleUser,
  Category,
  Order,
  Offer,
  Specialization,
  Permission,
  RolePermission,
} = models;

function parseSeedDate(value) {
  if (value == null || value === "") return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

async function safeRollback(transaction) {
  if (!transaction.finished) {
    await transaction.rollback();
  }
}

export const clearDBSrv = async () => {
  const t = await sequelize.transaction();
  try {
    const deleted = {
      offers: await Offer.destroy({ where: {}, transaction: t }),
      specializations: await Specialization.destroy({
        where: {},
        transaction: t,
      }),
      roles_users: await RoleUser.destroy({ where: {}, transaction: t }),
      role_permission: await RolePermission.destroy({
        where: {},
        transaction: t,
      }),
      orders: await Order.destroy({ where: {}, transaction: t }),
      users: await User.destroy({ where: {}, transaction: t }),
      roles: await Role.destroy({ where: {}, transaction: t }),
      permissions: await Permission.destroy({ where: {}, transaction: t }),
      categories: await Category.destroy({ where: {}, transaction: t }),
    };

    await t.commit();
    return { ok: true, deleted };
  } catch (error) {
    await safeRollback(t);
    throw error;
  }
};

export const executeSrv = async () => {
  const t = await sequelize.transaction();
  try {
    const seedPassword = seedData?.meta?.seed_password_plain || "123456";
    const hashedPassword = await bcrypt.hash(seedPassword, 12);

    for (const role of seedData.roles) {
      await Role.upsert(role, { transaction: t });
    }

    for (const permission of seedData.permissions) {
      await Permission.upsert(permission, { transaction: t });
    }

    for (const rp of seedData.role_permissions) {
      await RolePermission.upsert(rp, { transaction: t });
    }

    for (const category of seedData.categories) {
      await Category.upsert(category, { transaction: t });
    }

    for (const user of seedData.users) {
      await User.upsert(
        {
          ...user,
          password: hashedPassword,
        },
        { transaction: t },
      );
    }

    for (const ru of seedData.roles_users) {
      await RoleUser.upsert(ru, { transaction: t });
    }

    for (const spec of seedData.specializations) {
      await Specialization.upsert(spec, { transaction: t });
    }

    for (const o of seedData.orders) {
      await Order.upsert(
        {
          id: o.id,
          status: o.status,
          title: o.title,
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

    for (const offer of seedData.offers) {
      await Offer.upsert(offer, { transaction: t });
    }

    const counts = {
      roles: seedData.roles.length,
      permissions: seedData.permissions.length,
      role_permissions: seedData.role_permissions.length,
      categories: seedData.categories.length,
      users: seedData.users.length,
      roles_users: seedData.roles_users.length,
      specializations: seedData.specializations.length,
      orders: seedData.orders.length,
      offers: seedData.offers.length,
    };

    await t.commit();
    return {
      ok: true,
      seed_password_plain: seedPassword,
      counts,
    };
  } catch (error) {
    await safeRollback(t);
    throw error;
  }
};
