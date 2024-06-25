import UserSchema from "../../db/schemas/user.js"
import SchemaTransformer from "../../utils/schema-transformer.js";

export const UserService = {
  getByUsername(username) {
    return UserSchema.findOne({ username })
      .then(SchemaTransformer);
  },

  getById(id) {
    return UserSchema.findById(id)
      .then(SchemaTransformer);
  },

  createUser(data) {
    return UserSchema.create({ ...data })
      .then(SchemaTransformer);
  },
}
