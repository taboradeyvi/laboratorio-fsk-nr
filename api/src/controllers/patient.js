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
      let { page = 1, limit = 10 } = req.query;

      page = parseInt(page);
      limit = parseInt(limit);

      const skip = (page - 1) * limit;

      const patients = await patientService.getAll(skip, limit);

      const totalPatients = await patientService.count();

      res.status(200).json({
        data: patients,
        totalPages: Math.ceil(totalPatients / limit),
        currentPage: page,
        totalItems: totalPatients,
      });
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
      if (!req.body.symptoms || !Array.isArray(req.body.symptoms)) {
        return res
          .status(400)
          .json({ message: "Symptoms must be provided as an array." });
      }

      const patient = await patientService.addSymptoms(
        req.params.id,
        req.body.symptoms
      );

      res.status(200).json({
        message: "Symptoms added successfully",
        patient,
      });
    } catch (error) {
      next(error);
    }
  }

  async remove(req, res, next) {
    try {
      const patient = await patientService.delete(req.params.id);
      res.status(200).json(patient);
    } catch (error) {
      next(error);
    }
  }
}

export default new PatientController();
