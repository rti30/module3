import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
import {
	RECORD_COLLECTION_NAME,
	RECORD_DEFAULT_USER_NAME,
	BAD_START_TIME_VALUE,
} from './record.constants';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RecordDocument, RecordModel } from './model/record.model';

@Injectable()
export class RecordService {
	constructor(
		@InjectModel(RECORD_COLLECTION_NAME) private readonly recordModel: Model<RecordDocument>,
	) {}

	async create(createRecordDto: CreateRecordDto) {
		let { username } = createRecordDto;
		if (username === RECORD_DEFAULT_USER_NAME) {
			username = null;
		}

		const newUserDto: RecordModel = {
			username,
			startTime: new Date(),
			endTime: null,
			duration: null,
		};
		return await this.recordModel.create(newUserDto);
	}

	findAll() {
		return this.recordModel.find({ duration: { $exists: true, $ne: null } }).exec();
		//return this.recordModel.find().exec();
	}

	findOne(id: string) {
		return this.recordModel.findById(id);
	}

	async update(_id: string, updateRecordDto: UpdateRecordDto) {
		const { startTime } = updateRecordDto;
		const record = await this.findOne(_id).exec();
		const time = new Date(startTime).getTime();
		if (record.startTime.getTime() !== time) {
			throw new BadRequestException(BAD_START_TIME_VALUE);
		}
		const endTime = new Date();
		const duration = endTime.getTime() - time;
		return await this.recordModel.updateOne({ _id }, { endTime, duration });
	}
}
