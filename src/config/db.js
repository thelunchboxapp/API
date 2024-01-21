import {Sequelize, Op} from 'sequelize';
import dotenv from 'dotenv';
import fs from 'fs';


dotenv.config();

const pathToCert = "DigiCertGlobalRootCA.crt.pem";

// Database connection using Sequelize
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres' ,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: true, // This ensures that SSL is actually enforced
      ca: fs.readFileSync(pathToCert).toString()
    }
  } 
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


