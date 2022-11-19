import { Schema, Types } from 'mongoose';
import { UserSchema } from 'src/modules/auth/schema/users.schema';

export const GroupSchema = new Schema(
  {
    name: String,
    // members: [UserSchema],
    members: [{ type: Types.ObjectId, ref: 'UserSchema' }],
  },
  {
    collection: 'groups',
  },
);
