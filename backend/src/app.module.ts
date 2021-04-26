import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { MongooseModule } from '@nestjs/mongoose';
import { Models } from './models';
import { Controllers } from './controllers';
import { Services, AuthService } from './services';
import { JwtStrategy } from './common/auth';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwt } from './constants';
const { secret, expiresIn } = jwt;
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb://localhost:${process.env.MONGODB_PORT}/rating-review`,
      { useCreateIndex: true },
    ),
    MongooseModule.forFeature(Models),
    PassportModule,
    JwtModule.register({
      secret,
      signOptions: { expiresIn },
    }),
    MulterModule.register({
      dest: './images',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'images'),
    }),
  ],
  controllers: [...Controllers],
  providers: [...Services, JwtStrategy],
  exports: [AuthService],
})
export class AppModule {}
