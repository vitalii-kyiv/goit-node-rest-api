import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

const { JWT_SECRET } = process.env;

export const createToken = (payload) =>
  jwt.sign(payload, JWT_SECRET, { expiresIn: "72h" });

export const verifyToken = (token) => jwt.verify(token, JWT_SECRET);
