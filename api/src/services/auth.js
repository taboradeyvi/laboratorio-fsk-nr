import bcrypt from "bcryptjs";
import userSchema from "../schemas/user.js";
import { generateToken } from "../helper/jwt.js";

class AuthService {
  async login({ userName, password }) {
    const checkUser = await userSchema.findOne({ userName });
    if (!checkUser) {
      const error = new Error("Incorrect username");
      error.status = 400;
      throw error;
    }

    const isMatch = await bcrypt.compare(password, checkUser.password);
    if (!isMatch) {
      const error = new Error("Incorrect password");
      error.status = 400;
      throw error;
    }

    if (checkUser.role !== "admin") {
      const error = new Error("Admin role required");
      error.status = 401;
      throw error;
    }

    const session = {
      token: generateToken(checkUser.userName, checkUser.email, checkUser.role),
      userName: checkUser.userName,
      email: checkUser.email,
      role: checkUser.role,
    };

    return session;
  }
}

export default new AuthService();
