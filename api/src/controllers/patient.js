import patientService from "../services/patient.js";

class PatientController {
  constructor() {}

  async getById(req, res, next) {
    try {
      const patient = await patientService.getById(req.params.id);
      res.status(200).json(patient);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const patient = await patientService.getAll();
      res.status(200).json(patient);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const patient = await patientService.create(req.body);
      res.status(201).json(patient);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const patient = await patientService.update(req.params.id, req.body);
      res.status(200).json(patient);
    } catch (error) {
      next(error);
    }
  }

  async addSymptoms(req, res, next) {
    try {
      const patient = await patientService.addSymptoms(req.params.id, req.body);
      res.status(200).json(patient);
    } catch (error) {
      next(error);
    }
  }

  async remove(req, res, next) {
    try {
      const patient = await patientService.delete(req.params.id, req.body);
      res.status(200).json(patient);
    } catch (error) {
      next(error);
    }
  }
}

export default new PatientController();
