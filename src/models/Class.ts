import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IClass extends Document {
  code: string;
  name: string;
  professor?: string;
  credits?: number;
  difficulty?: 'Easy A' | 'Moderate' | 'Hard';
  genEd?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const ClassSchema = new Schema<IClass>(
  {
    code: {
      type: String,
      required: [true, 'Class code is required'],
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: [true, 'Class name is required'],
      trim: true,
    },
    professor: {
      type: String,
      trim: true,
    },
    credits: {
      type: Number,
    },
    difficulty: {
      type: String,
      enum: ['Easy A', 'Moderate', 'Hard'],
    },
    genEd: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Class: Model<IClass> = mongoose.models.Class || mongoose.model<IClass>('Class', ClassSchema);

export default Class;
