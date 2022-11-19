import { Schema } from 'mongoose';

export const UserSchema = new Schema(
  {
    firsName: String,
    lastName: String,
    userName: { type: String, unique: true },
    email: { type: String, unique: true },
    password: String,
    profilePassword: { type: String, default: null },
  },
  {
    collection: 'users',
  },
);
