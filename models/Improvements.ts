import { Schema, Model, models, model, Document } from "mongoose";

interface ImprovementType extends Document {
  title: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const ImprovementSchema = new Schema<ImprovementType>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const ImprovementModel: Model<ImprovementType> =
  models.Improvement ||
  model<ImprovementType>("Improvement", ImprovementSchema);

export default ImprovementModel;
