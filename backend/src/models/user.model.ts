import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop()
  image: string;
}

const UserSchema = SchemaFactory.createForClass(User);

interface IUser extends Document {
  password?: string;
}

UserSchema.pre('save', async function <IUser>(next) {
  if (this.password) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt, null);
    return next(null, this);
  }
  return next(null, this);
});

export const UserModel = { name: User.name, schema: UserSchema };
