const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

// send the incoming env to online JAWSDB, where first 100 MB is free; requiring a password indicates use of .env
if (process.env.JAWSDB_URL) {
  // let app handle database
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  // let my computer handle this, if the app is not online
    sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306 // only mysql is connected to this port
    }
  );
}

module.exports = sequelize;