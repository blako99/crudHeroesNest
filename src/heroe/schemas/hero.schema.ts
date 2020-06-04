import { Schema } from 'mongoose';

export const HeroSchema = new Schema({
  name: { type: String, required: true },
  type: {
    type: String,
    enum: ['aire', 'fuego', 'agua', 'tierra'],
    rol: String,
    country: { type: Schema.ObjectId, ref: 'Country' },
  },
  createdAt: {
    type: Date,
    default: Date.now,
    versionKey: false,
  },
});
