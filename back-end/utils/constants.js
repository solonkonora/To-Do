import { config } from "dotenv";
config();

const PORT = process.env.PORT;
const MONGO_CONNECT_URL = process.env.MONGO_CONNECT_URL

const SALT_ROUNS = Number(process.env.SALT_ROUNS); // _ should singnale private methods
const JWT_SECRET = process.env.JWT_SECRET;

const JWT_EXPIRATION_TIME = process.env.JWT_EXPIRATION_TIME;

export {
    PORT,
    MONGO_CONNECT_URL,

    SALT_ROUNS,
    JWT_SECRET,
    JWT_EXPIRATION_TIME
};
