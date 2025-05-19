import { PartialType } from '@nestjs/mapped-types';
import { CreateScoreDto } from './create-score.dto';
import { IsString } from 'class-validator';

export class UpdateScoreDto extends PartialType(CreateScoreDto) {
	@IsString()
	startTime: Date;
}
