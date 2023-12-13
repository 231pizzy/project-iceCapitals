import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

export const db = new Sequelize(
  process.env.DB_URL, //name of database

  {
    port: 5432,
    host: "localhost",
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      ssl: {
        require: true, // This will force SSL/TLS
        rejectUnauthorized: false, // Avoids self-signed certificates error
      },
    },
  }
);
