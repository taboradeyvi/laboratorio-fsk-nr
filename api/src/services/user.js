import userSchema from "../schemas/user.js";
import userUtil from "./utils/user.js";

class UserSerive {
  async create(user) {
    await userUtil.checkIfExists("userName", user.userName);
    await userUtil.checkIfExists("email", user.email);
    await userUtil.checkIfExists("phoneNumber", user.phoneNumber);

    return await userSchema.create(user);
  }

  async update(id, user) {
    await userUtil.checkIfExists("userName", user.userName, id);
    await userUtil.checkIfExists("email", user.email, id);
    await userUtil.checkIfExists("phoneNumber", user.phoneNumber, id);
    return await userSchema.updateOne({ _id: id }, user, { new: true });
  }

  async delete(id) {
    const exists = await userSchema.findById(id);
    if (exists === null) {
      const error = new Error("User not found");
      error.status = 404;
      throw error;
    }
    return await userSchema.deleteOne({ _id: id });
  }

  async getAll(skip, limit) {
    return await userSchema.find().skip(skip).limit(limit);
  }

  async count() {
    return await userSchema.countDocuments();
  }

  async getById(id) {
    const exists = await userSchema.findById(id);
    if (exists === null) {
      const error = new Error("User not found");
      error.status = 404;
      throw error;
    }

    return exists;
  }
}

export default new UserSerive();
