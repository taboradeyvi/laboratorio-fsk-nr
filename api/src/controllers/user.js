import UserService from "../services/user.js";

class UserController {
  constructor() {}

  async getById(req, res, next) {
    try {
      const user = await UserService.getById(req.params.id);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const user = await UserService.getAll();
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const user = await UserService.create(req.body);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const user = await UserService.update(req.params.id, req.body);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async remove(req, res, next) {
    try {
      const user = await UserService.delete(req.params.id, req.body);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
