import { IsString } from 'class-validator';

export class CreateRecordDto {
	@IsString()
	username: string;
}
