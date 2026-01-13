import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPlace extends Document {
  name: string;
  category?: 'Food' | 'Study' | 'Cafe';
  location?: string;
  flags?: {
    acceptsMnG?: boolean;
    isLateNight?: boolean;
    isBudget?: boolean;
  };
  deals?: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

const PlaceSchema = new Schema<IPlace>(
  {
    name: {
      type: String,
      required: [true, 'Place name is required'],
      trim: true,
    },
    category: {
      type: String,
      enum: ['Food', 'Study', 'Cafe'],
    },
    location: {
      type: String,
      trim: true,
    },
    flags: {
      acceptsMnG: {
        type: Boolean,
        default: false,
      },
      isLateNight: {
        type: Boolean,
        default: false,
      },
      isBudget: {
        type: Boolean,
        default: false,
      },
    },
    deals: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Place: Model<IPlace> = mongoose.models.Place || mongoose.model<IPlace>('Place', PlaceSchema);

export default Place;
