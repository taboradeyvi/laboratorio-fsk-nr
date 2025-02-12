import SymptomService from "../services/symptom.js";
class SymptomController {
  constructor() {}

  async getById(req, res, next) {
    try {
      const symptom = await SymptomService.getById(req.params.id);
      res.status(200).json(symptom);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const symptom = await SymptomService.getAll();
      res.status(200).json(symptom);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const symptom = await SymptomService.create(req.body);
      res.status(201).json(symptom);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const symptom = await SymptomService.update(req.params.id, req.body);
      res.status(200).json(symptom);
    } catch (error) {
      next(error);
    }
  }

  async remove(req, res, next) {
    try {
      const symptom = await SymptomService.delete(req.params.id, req.body);
      res.status(200).json(symptom);
    } catch (error) {
      next(error);
    }
  }
}

export default new SymptomController();
