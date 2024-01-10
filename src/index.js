import dotenv from 'dotenv';
import { sequelize, testDbConnection } from './config/db.js';
import app from './server.js';
// import {Review, Restaurant} from './models/index.js';
import {User} from './models/index.js';

dotenv.config();

// await Review.sync({alter: true});

const port = process.env.PORT || 8000;

// Database connection test
testDbConnection();

const startServer = async () => {

  // Review.sync({ alter: true })
  
  try {
    await sequelize.sync();
    
    console.log('Database synced successfully.');

    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });

  } catch (error) {
    console.error('Error syncing database:', error);
  }
};

startServer();