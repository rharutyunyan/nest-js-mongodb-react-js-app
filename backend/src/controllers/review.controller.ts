import { Controller, Get, UseGuards, Post, Req, Body } from '@nestjs/common';
import { ApiResponse, ApiOperation, ApiBody } from '@nestjs/swagger';
import { ReviewService } from '../services';
import { AccessControlGuard } from '../common/auth';
import { CreateReviewRequest } from '../request-models';
import { Review } from '../models/review.model';

@UseGuards(AccessControlGuard)
@Controller('/api/reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Review is retrieved' })
  @ApiOperation({ summary: 'Retrieve user review' })
  async getUsersReview(@Req() req): Promise<Review> {
    // it assumes the user review is only one that is why id is not passed
    const user = req.user.userId;
    return await this.reviewService.getReview(user);
  }

  @Get('/list')
  @ApiResponse({ status: 200, description: 'Reviews are retrieved' })
  @ApiOperation({ summary: 'Retrieve all reviews' })
  async getReviews(): Promise<Review[]> {
    return await this.reviewService.getReviews();
  }

  @Post()
  @ApiResponse({ status: 200, description: 'Rating and Review is created !' })
  @ApiOperation({ summary: 'Create rating and review' })
  @ApiBody({
    description: 'CreateRatingReviewRequest',
    type: CreateReviewRequest,
    required: true,
  })
  async createReview(
    @Req() req,
    @Body() data: CreateReviewRequest,
  ): Promise<Review> {
    const user = req.user.userId;
    return this.reviewService.createReview({ ...data, user });
  }
}
