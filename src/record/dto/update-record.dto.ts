import { PartialType } from '@nestjs/mapped-types';
import { CreateRecordDto } from './create-record.dto';
import { IsString } from 'class-validator';

export class UpdateRecordDto extends PartialType(CreateRecordDto) {
	@IsString()
	startTime: Date;
}
