import User from "../schemas/user";

class UserSerive {
  async create(user) {
    return await User.create(user);
  }

  async update(id, user) {
    return await User.findOneAndUpdate(id, user, { new: true });
  }

  async delete(id) {
    return await User.findOneAndDelete(id);
  }

  async getAll() {
    return await User.find();
  }

  async getById(id) {
    return await User.findById(id);
  }
}

export default new UserSerive();
