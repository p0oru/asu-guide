import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IStats extends Document {
  visits: number;
  lastUpdated: Date;
}

const StatsSchema = new Schema<IStats>({
  visits: {
    type: Number,
    default: 0,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

const Stats: Model<IStats> = mongoose.models.Stats || mongoose.model<IStats>('Stats', StatsSchema);

export default Stats;
