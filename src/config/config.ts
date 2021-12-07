import dotenv from "dotenv";

dotenv.config();

export const config = {
  server: process.env.SERVER,
  host: process.env.DB_HOST,
  db: process.env.DB,
  db_uname: process.env.DB_USER,
  db_password: process.env.DB_PASSWORD,
  port: process.env.PORT,
};