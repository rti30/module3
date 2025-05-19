import { IsString } from 'class-validator';

export class CreateScoreDto {
	@IsString()
	username: string;
}
