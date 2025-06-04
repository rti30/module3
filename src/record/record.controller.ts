import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { RecordService } from './record.service';
import { CreateRecordDto } from './dto/create-record.dto';

@Controller('record')
export class RecordController {
	constructor(private readonly recordService: RecordService) {}

	@UsePipes(new ValidationPipe())
	@Post()
	create(@Body() createRecordDto: CreateRecordDto) {
		return this.recordService.create(createRecordDto);
	}

	@Get()
	findAll() {
		return this.recordService.findAll();
	}

	@UsePipes(new ValidationPipe())
	@Patch(':id')
	update(@Param('id') id: string) {
		return this.recordService.update(id);
	}
}
