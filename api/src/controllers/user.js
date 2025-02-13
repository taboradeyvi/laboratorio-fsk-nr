import userService from "../services/user.js";
import authService from "../services/auth.js";
class UserController {
  constructor() {}

  async getById(req, res, next) {
    try {
      const user = await userService.getById(req.params.id);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      let { page = 1, limit = 10 } = req.query;

      page = parseInt(page);
      limit = parseInt(limit);

      const skip = (page - 1) * limit;

      const users = await userService.getAll(skip, limit);

      const totalUsers = await userService.count();

      res.status(200).json({
        users,
        totalPages: Math.ceil(totalUsers / limit),
        currentPage: page,
        totalUsers,
      });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const user = await userService.create(req.body);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const user = await authService.login(req.body);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const user = await userService.update(req.params.id, req.body);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async remove(req, res, next) {
    try {
      const user = await userService.delete(req.params.id);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
