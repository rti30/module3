import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';

export const getMongoConfig = async (
	configService: ConfigService,
): Promise<MongooseModuleOptions> => {
	return {
		uri: getMongoString(configService),
		...getMongoOptions(),
	};
};

const getMongoString = (configService: ConfigService) =>
	`mongodb://${encodeURIComponent(configService.get('MONGO_LOGIN'))}:${encodeURIComponent(configService.get('MONGO_PASSWORD'))}@${configService.get('MONGO_HOST')}:${configService.get('MONGO_PORT')}/${configService.get('MONGO_AUTHDATABASE')}?authSource=admin&directConnection=true`;

const getMongoOptions = () => ({});
