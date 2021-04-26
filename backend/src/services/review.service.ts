import { Injectable, BadRequestException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Review, ReviewDocument } from '../models/review.model';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
  ) {}

  async createReview(data): Promise<Review> {
    const { user } = data;
    const reviewRes = await this.reviewModel.findOne({ _id: user });
    if (reviewRes) {
      // todo: can be added also an email check if we want
      throw new BadRequestException('You have submitted already a review');
    }
    const review = new this.reviewModel(data);
    return review.save();
  }

  async getReview(userId): Promise<Review> {
    return this.reviewModel.findOne({ user: userId });
  }
}
