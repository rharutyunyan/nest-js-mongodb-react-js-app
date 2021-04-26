import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.model';
import { GenderType } from '../common/types';

export type ReviewDocument = Review & Document;

@Schema()
export class Review {
  @Prop({ required: false })
  age: number;

  @Prop({ required: false })
  country: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  rate: number;

  @Prop({ required: true })
  email: string;

  @Prop({ required: false, enum: GenderType })
  gender: string;

  @Prop({ required: true })
  improvements: string;

  @Prop({ required: true })
  origin: string;

  @Prop({ type: Types.ObjectId, ref: User.name })
  user: User;

  @Prop({ default: Date.now })
  date: Date;
}

const ReviewSchema = SchemaFactory.createForClass(Review);

export const ReviewModel = { name: Review.name, schema: ReviewSchema };
