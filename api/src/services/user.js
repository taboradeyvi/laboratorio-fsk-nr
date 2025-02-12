import User from "../schemas/user.js";

class UserSerive {
  async checkIfExists(field, value, id = null) {
    const query = { [field]: value };

    if (id) {
      query._id = { $ne: id };
    }

    const exists = await User.exists(query);
    if (exists) {
      const error = new Error(`${value} already exists`);
      error.status = 400;
      throw error;
    }
  }

  async create(user) {
    await this.checkIfExists("userName", user.userName);
    await this.checkIfExists("email", user.email);
    await this.checkIfExists("phoneNumber", user.phoneNumber);

    return await User.create(user);
  }

  async update(id, user) {
    await this.checkIfExists("userName", user.userName, id);
    await this.checkIfExists("email", user.email, id);
    await this.checkIfExists("phoneNumber", user.phoneNumber, id);
    return await User.updateOne({ _id: id }, patient, { new: true });
  }

  async delete(id) {
    const exists = await User.findById(id);
    if (exists === null) {
      const error = new Error("User not found");
      error.status = 404;
      throw error;
    }
    return await User.deleteOne({ _id: id });
  }

  async getAll() {
    return await User.find();
  }

  async getById(id) {
    const exists = await User.findById(id);
    if (exists === null) {
      const error = new Error("User not found");
      error.status = 404;
      throw error;
    }

    return exists;
  }
}

export default new UserSerive();
