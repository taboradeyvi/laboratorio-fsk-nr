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
      let { page = 1, limit = 10 } = req.query;

      page = parseInt(page);
      limit = parseInt(limit);

      const skip = (page - 1) * limit;

      const symptoms = await symptomService.getAll(skip, limit);

      const totalSymptoms = await symptomService.count();

      res.status(200).json({
        data: symptoms,
        totalPages: Math.ceil(totalSymptoms / limit),
        currentPage: page,
        titalItems: totalSymptoms,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAvailableSymptoms(req, res, next) {
    try {
      const patientId = req.params.id;

      const symptoms = await symptomService.getAvailableSymptoms(patientId);
      res.status(200).json(symptoms);
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
      const symptom = await symptomService.delete(req.params.id);
      res.status(200).json(symptom);
    } catch (error) {
      next(error);
    }
  }
}

export default new SymptomController();
