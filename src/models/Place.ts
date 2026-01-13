import mongoose, { Schema, Document, Model } from 'mongoose';

export type PlaceCategory = 
  | 'On-Campus Deals'
  | 'Around ASU (3-mile radius)'
  | 'Cheap & Heavenly'
  | 'Late Night Cravings'
  | 'Date Night / Parents in Town';

export const PLACE_CATEGORIES: PlaceCategory[] = [
  'On-Campus Deals',
  'Around ASU (3-mile radius)',
  'Cheap & Heavenly',
  'Late Night Cravings',
  'Date Night / Parents in Town',
];

export interface IPlace extends Document {
  name: string;
  category?: PlaceCategory;
  location?: string;
  googleMapsLink?: string;
  flags?: {
    acceptsMnG?: boolean;
    isLateNight?: boolean;
    isBudget?: boolean;
  };
  insiderIntel?: string;
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
      enum: PLACE_CATEGORIES,
    },
    location: {
      type: String,
      trim: true,
    },
    googleMapsLink: {
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
    insiderIntel: {
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
