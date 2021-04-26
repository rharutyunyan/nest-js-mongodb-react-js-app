export * from './auth.service';
export * from './user.service';
export * from './review.service';

import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { ReviewService } from './review.service';

export const Services = [AuthService, UserService, ReviewService];
