import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { JWT_EXPIRATION_TIME, JWT_SECRET, SALT_ROUNS } from "../../utils/constants.js";

export const AuthService = {
  async hashPassword(password) {
    return await bcrypt.hash(password, SALT_ROUNS)
  },

  async matchPassword(password, checkPassword) {
    return await bcrypt.compare(password, checkPassword)
  },

  jwtSignUser(user) {
    return jwt.sign(
      {
        ...user,
      },
      JWT_SECRET,
      {
        expiresIn: JWT_EXPIRATION_TIME
      }
    )
  },

  jwtVerifyUser(token) {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch {
      return null
    }
  }
}
