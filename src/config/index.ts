import dotenv from "dotenv";

dotenv.config();

export const config = {
  databse_url: process.env.DATABASE_URL,
  jwt_sign: process.env.JWT_SIGN,
};
