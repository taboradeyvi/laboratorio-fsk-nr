import mongoose from "mongoose";
const { Schema } = mongoose;

const symptomSchema = new Schema({
    name: {
        type: String,
        maxLength: 150,
        required: [true, 'Name has been required']
    },
    description: {
        type: String,
        maxLength: 600,
        required: [true, 'Description has been required']
    }
}, { timestamps: true, collection: "symptoms" });

export const Symptom = mongoose.model("Symptom", symptomSchema);