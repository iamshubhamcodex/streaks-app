import { Schema, Model, models, model, Document } from "mongoose";

interface ExerciseType extends Document {
  title: string;
  description: string;
  count: number;
  reps: number;
  autoIncrease: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const ExerciseSchema = new Schema<ExerciseType>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    count: { type: Number, default: 0 },
    reps: { type: Number, default: 0 },
    autoIncrease: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const ExerciseModel: Model<ExerciseType> =
  models.Exercise || model<ExerciseType>("Exercise", ExerciseSchema);

export default ExerciseModel;
