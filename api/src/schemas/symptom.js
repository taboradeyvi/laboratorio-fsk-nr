import mongoose from "mongoose";
const { Schema } = mongoose;

const symptomSchema = new Schema(
  {
    name: {
      type: String,
      maxLength: 150,
      required: [true, "Name is required"],
    },
    description: {
      type: String,
      maxLength: 600,
      required: [true, "Description is required"],
    },
  },
  { timestamps: true, collection: "symptoms" }
);

export const Symptom = mongoose.model("symptoms", symptomSchema);
