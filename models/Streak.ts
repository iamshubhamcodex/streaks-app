import { Schema, Model, models, model, Document } from "mongoose";

interface StreakType extends Document {
  title: string;
  count: number;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const StreakSchema = new Schema<StreakType>(
  {
    title: { type: String, required: true },
    count: { type: Number, default: 0 },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const StreakModel: Model<StreakType> =
  models.Streak || model<StreakType>("Streak", StreakSchema);

export default StreakModel;
