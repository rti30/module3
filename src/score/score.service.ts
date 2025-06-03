import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateScoreDto } from './dto/create-score.dto';
import { UpdateScoreDto } from './dto/update-score.dto';
import {
	SCORE_COLLECTION_NAME,
	SCORE_DEFAULT_USER_NAME,
	BAD_START_TIME_VALUE,
} from './score.constants';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ScoreDocument, ScoreModel } from './model/score.model';

@Injectable()
export class ScoreService {
	constructor(
		@InjectModel(SCORE_COLLECTION_NAME) private readonly scoreModel: Model<ScoreDocument>,
	) {}

	async create(createScoreDto: CreateScoreDto) {
		let { username } = createScoreDto;
		if (username === SCORE_DEFAULT_USER_NAME) {
			username = null;
		}

		const newUserDto: ScoreModel = {
			username,
			startTime: new Date(),
			endTime: null,
			duration: null,
		};
		return await this.scoreModel.create(newUserDto);
	}

	findAll() {
		//	return this.scoreModel.find({ duration: { $exists: true, $ne: null } }).exec();
		return this.scoreModel.find().exec();
	}

	findOne(id: string) {
		return this.scoreModel.findById(id);
	}

	async update(_id: string, updateScoreDto: UpdateScoreDto) {
		const { startTime } = updateScoreDto;
		const score = await this.findOne(_id).exec();
		const time = new Date(startTime).getTime();
		if (score.startTime.getTime() !== time) {
			throw new BadRequestException(BAD_START_TIME_VALUE);
		}
		const endTime = new Date();
		const duration = endTime.getTime() - time;
		return await this.scoreModel.updateOne({ _id }, { endTime, duration });
	}

	remove(id: number) {
		return this.scoreModel.findByIdAndDelete(id).exec();
	}
}
