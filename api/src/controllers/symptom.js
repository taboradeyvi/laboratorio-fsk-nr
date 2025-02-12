import symptomService from "../services/symptom.js";

class SymptomController {
  constructor() {}

  async getById(req, res, next) {
    try {
      const symptom = await symptomService.getById(req.params.id);
      res.status(200).json(symptom);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const symptom = await symptomService.getAll();
      res.status(200).json(symptom);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const symptom = await symptomService.create(req.body);
      res.status(201).json(symptom);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const symptom = await symptomService.update(req.params.id, req.body);
      res.status(200).json(symptom);
    } catch (error) {
      next(error);
    }
  }

  async remove(req, res, next) {
    try {
      const symptom = await symptomService.delete(req.params.id, req.body);
      res.status(200).json(symptom);
    } catch (error) {
      next(error);
    }
  }
}

export default new SymptomController();
