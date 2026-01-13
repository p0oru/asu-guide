import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IClass extends Document {
  // Required fields
  code: string;
  name: string;
  professor: string;
  description: string;
  genEd: string;
  difficulty: 'Light Workload' | 'Standard Pace' | 'Content Heavy';
  // Optional fields
  attendance?: 'Mandatory' | 'Optional' | 'Unknown';
  exams?: 'In-Person' | 'Online' | 'None' | 'Unknown';
  rmpLink?: string;
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
      required: [true, 'Professor is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    genEd: {
      type: String,
      required: [true, 'Gen Ed category is required'],
      enum: ['HUAD', 'SOBE', 'SCIT', 'QTRS', 'MATH', 'AMIT', 'CIVI', 'GCSI', 'SUST'],
    },
    difficulty: {
      type: String,
      required: [true, 'Difficulty is required'],
      enum: ['Light Workload', 'Standard Pace', 'Content Heavy'],
    },
    attendance: {
      type: String,
      enum: ['Mandatory', 'Optional', 'Unknown'],
      default: 'Unknown',
    },
    exams: {
      type: String,
      enum: ['In-Person', 'Online', 'None', 'Unknown'],
      default: 'Unknown',
    },
    rmpLink: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Class: Model<IClass> = mongoose.models.Class || mongoose.model<IClass>('Class', ClassSchema);

export default Class;
