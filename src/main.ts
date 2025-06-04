import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
	const configService = new ConfigService();
	const allowedOrigins = configService.get('ALLOWED_ORIGINS').split(',');
	const app = await NestFactory.create(AppModule);
	app.setGlobalPrefix('api/v1');
	app.enableCors({
		origin: (origin, callback) => {
			if (!origin) {
				return callback(null, true);
			}
			if (allowedOrigins.includes(origin)) {
				return callback(null, true);
			}
			return callback(new Error('Ошибка CORS'), false);
		},
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
		credentials: true,
	});
	await app.listen(configService.get('NEST_PORT'));
}
bootstrap();
