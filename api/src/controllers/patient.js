import PatientService from "../services/patient.js";
class PatientController {
  constructor() {}

  async getById(req, res, next) {
    try {
      const patient = await PatientService.getById(req.params.id);
      res.status(200).json(patient);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const patient = await PatientService.getAll();
      res.status(200).json(patient);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const patient = await PatientService.create(req.body);
      res.status(201).json(patient);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const patient = await PatientService.update(req.params.id, req.body);
      res.status(200).json(patient);
    } catch (error) {
      next(error);
    }
  }

  async remove(req, res, next) {
    try {
      const patient = await PatientService.delete(req.params.id, req.body);
      res.status(200).json(patient);
    } catch (error) {
      next(error);
    }
  }
}

export default new PatientController();
