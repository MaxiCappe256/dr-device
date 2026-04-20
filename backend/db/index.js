import { Sequelize } from 'sequelize';
import config from '../config/index.js'

// config bd
const sequelize = new Sequelize(config.sequelize);

// connection db
export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log(`[${config.prefix}] Connected to database.`);
  } catch (error) {
    console.error(`[${config.prefix}] Unable to connect to the database:`, error);
  }
};

export default sequelize;
