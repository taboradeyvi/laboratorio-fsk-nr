import Symptom from "../schemas/symptom.js";

class SymptomService {
  async create(symptom) {
    return await Symptom.create(symptom);
  }

  async update(id, symptom) {
    return await Symptom.findOneAndUpdate(id, symptom, { new: true });
  }

  async delete(id) {
    return await Symptom.findOneAndDelete(id);
  }

  async getAll() {
    return await Symptom.find();
  }

  async getById(id) {
    return await Symptom.findById(id);
  }
}

export default new SymptomService();
