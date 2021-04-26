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
  async getReview(@Req() req): Promise<Review> {
    const user = req.user.userId;
    return await this.reviewService.getReview(user);
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
