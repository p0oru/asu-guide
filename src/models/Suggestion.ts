import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISuggestion extends Document {
  content: string;
  type?: 'Class' | 'Food' | 'Other';
  username?: string;
  status?: 'Pending' | 'Approved' | 'Rejected';
  createdAt: Date;
  updatedAt: Date;
}

const SuggestionSchema = new Schema<ISuggestion>(
  {
    content: {
      type: String,
      required: [true, 'Suggestion content is required'],
      trim: true,
    },
    type: {
      type: String,
      enum: ['Class', 'Food', 'Other'],
    },
    username: {
      type: String,
      trim: true,
      default: 'Anonymous',
    },
    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected'],
      default: 'Pending',
    },
  },
  {
    timestamps: true,
  }
);

const Suggestion: Model<ISuggestion> =
  mongoose.models.Suggestion || mongoose.model<ISuggestion>('Suggestion', SuggestionSchema);

export default Suggestion;
