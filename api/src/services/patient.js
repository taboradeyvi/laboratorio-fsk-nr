import Patient from "../schemas/patient.js";

class PatientService {
  async create(patient) {
    return await Patient.create(patient);
  }

  async update(id, patient) {
    return await Patient.findOneAndUpdate(id, patient, { new: true });
  }

  async delete(id) {
    return await Patient.findOneAndDelete(id);
  }

  async getAll() {
    return await Patient.find();
  }

  async getById(id) {
    return await Patient.findById(id);
  }
}

export default new PatientService();
