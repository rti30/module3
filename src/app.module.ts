import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongoConfig } from './configs/mongo.config';
import { RecordModule } from './record/record.module';
import * as path from 'path';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: [
				path.resolve(process.cwd(), '.env.local'),
				path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`),
				path.resolve(process.cwd(), '.env'),
			].filter(Boolean),
			ignoreEnvFile: false,
		}),
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getMongoConfig,
		}),

		RecordModule,
	],
})
export class AppModule {}
