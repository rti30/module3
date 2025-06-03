import { Module } from '@nestjs/common';
import { RecordService } from './record.service';
import { RecordController } from './record.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RecordSchema } from './model/record.model';
import { RECORD_COLLECTION_NAME } from './record.constants';

@Module({
	controllers: [RecordController],
	imports: [
		MongooseModule.forFeature([
			{
				name: RECORD_COLLECTION_NAME,
				schema: RecordSchema,
				collection: RECORD_COLLECTION_NAME,
			},
		]),
	],
	providers: [RecordService],
})
export class RecordModule {}
