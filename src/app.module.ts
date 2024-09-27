import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { FeaturesModule } from './modules/features/features.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { ScreensModule } from './modules/screens/screens.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    ScreensModule,
    FeaturesModule,
  ],
})
export class AppModule {}
