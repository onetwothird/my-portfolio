import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IVisitor extends Document {
  ipAddress: string;
  country: string;
  region: string;
  city: string;
  browser: string;
  os: string;
  deviceType: 'Desktop' | 'Mobile' | 'Tablet' | 'Unknown';
  referrer: string;
  url: string;
  timestamp: Date;
}

const VisitorSchema: Schema = new Schema<IVisitor>({
  ipAddress: { type: String, required: true, index: true },
  country: { type: String, default: 'Unknown' },
  region: { type: String, default: 'Unknown' },
  city: { type: String, default: 'Unknown' },
  browser: { type: String, default: 'Unknown' },
  os: { type: String, default: 'Unknown' },
  deviceType: { type: String, enum: ['Desktop', 'Mobile', 'Tablet', 'Unknown'], default: 'Unknown' },
  referrer: { type: String, default: 'Direct' },
  url: { type: String, required: true, index: true },
  timestamp: { type: Date, default: Date.now, index: true },
});

VisitorSchema.index({ ipAddress: 1, url: 1, timestamp: -1 });

const Visitor: Model<IVisitor> = mongoose.models.Visitor || mongoose.model<IVisitor>('Visitor', VisitorSchema);
export default Visitor;