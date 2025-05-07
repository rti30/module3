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
import { ScoreService } from './score.service';
import { CreateScoreDto } from './dto/create-score.dto';
import { UpdateScoreDto } from './dto/update-score.dto';

@Controller('score')
export class ScoreController {
	constructor(private readonly scoreService: ScoreService) {}

	@UsePipes(new ValidationPipe())
	@Post()
	create(@Body() createScoreDto: CreateScoreDto) {
		return this.scoreService.create(createScoreDto);
	}

	@Get()
	findAll() {
		return this.scoreService.findAll();
	}

	@UsePipes(new ValidationPipe())
	@Patch(':id')
	update(@Param('id') id: string, @Body() updateScoreDto: UpdateScoreDto) {
		return this.scoreService.update(id, updateScoreDto);
	}
}
