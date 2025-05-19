import { Module } from '@nestjs/common';
import { ScoreService } from './score.service';
import { ScoreController } from './score.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ScoreSchema } from './model/score.model';
import { SCORE_COLLECTION_NAME } from './score.constants';

@Module({
	controllers: [ScoreController],
	imports: [
		MongooseModule.forFeature([
			{
				name: SCORE_COLLECTION_NAME,
				schema: ScoreSchema,
				collection: SCORE_COLLECTION_NAME,
			},
		]),
	],
	providers: [ScoreService],
})
export class ScoreModule {}
