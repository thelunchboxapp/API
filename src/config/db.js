import {Sequelize, Op} from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Database connection using Sequelize
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres'  //,
  // logging: false
});

const testDbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export { sequelize, testDbConnection, Op };


