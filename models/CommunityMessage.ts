import mongoose, { Document, Model, Schema } from 'mongoose';

export interface ICommunityMessage extends Document {
  nickname: string;
  avatarStyle: string;
  content: string;
  createdAt: Date;
}

const CommunityMessageSchema: Schema = new Schema<ICommunityMessage>(
  {
    nickname: { type: String, required: true, trim: true, maxlength: 24 },
    avatarStyle: { type: String, required: true, default: 'notionists', maxlength: 24 },
    content: { type: String, required: true, trim: true, maxlength: 280 },
  },
  { timestamps: true }
);

const CommunityMessage: Model<ICommunityMessage> =
  mongoose.models.CommunityMessage ||
  mongoose.model<ICommunityMessage>('CommunityMessage', CommunityMessageSchema);

export default CommunityMessage;
