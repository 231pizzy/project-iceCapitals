import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

export const db = new Sequelize(
  process.env.DB_NAME, //name of database
  process.env.DB_USERNAME, //name of username
  process.env.DB_PASSWORD, //db password

  {
    host: process.env.DB_HOST, //name of host
    port: 5432,
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      encrypt: true,
      // ssl: {
      //   rejectUnauthorized: true,
      // },
    },
  }
);
