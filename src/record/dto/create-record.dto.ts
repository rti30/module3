import { IsMongoId, IsOptional } from 'class-validator';

export class CreateRecordDto {
	@IsMongoId({ message: 'Неверный ID' })
	@IsOptional()
	id?: string;
}
