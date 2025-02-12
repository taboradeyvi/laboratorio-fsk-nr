import userSchema from "../../schemas/user.js";

class UserUtil {
  async checkIfExists(field, value, id = null) {
    const query = { [field]: value };

    if (id) {
      query._id = { $ne: id };
    }

    const exists = await userSchema.exists(query);
    if (exists) {
      const error = new Error(`${value} already exists`);
      error.status = 400;
      throw error;
    }
  }
}

export default new UserUtil();
