import { Schema } from 'mongoose';

export const CountrySchema = new Schema({
  name: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
    versionKey: false,
  },
});
