import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateRecordDto } from './dto/create-record.dto';
import { RECORD_COLLECTION_NAME, BAD_REQUEST } from './record.constants';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import { RecordDocument, RecordModel } from './model/record.model';
import { MongoUtils } from 'src/common/utils/mongo.utils';
import { IRecordRequestStart, IResponseScore } from './record.interface';

@Injectable()
export class RecordService {
	constructor(
		@InjectModel(RECORD_COLLECTION_NAME) private readonly recordModel: Model<RecordDocument>,
	) {}

	async create(createRecordDto: CreateRecordDto): Promise<IRecordRequestStart> {
		const { id } = createRecordDto; // хотя id опциональный, почему-то определяется как string
		const newUserDto: RecordModel = {
			username: null,
			time: null,
		};
		switch (true) {
			case !!id: {
				await MongoUtils.validateId(id, this.recordModel);
				const _id = mongoose.Types.ObjectId.createFromHexString(id);

				const { username, time, createdAt, updatedAt } = await this.updateStartTime(_id);
				return {
					username,
					time,
					_id: id,
					createdAt: createdAt.toDateString(),
					updatedAt: updatedAt.toDateString(),
				};
			}
			default:
				const { _id, username, time, createdAt, updatedAt } =
					await this.recordModel.create(newUserDto);
				return {
					username,
					time,
					_id: _id.toHexString(),
					createdAt: createdAt.toDateString(),
					updatedAt: updatedAt.toDateString(),
				};
		}
	}

	async findAll(): Promise<RecordModel[]> {
		return await this.recordModel.find({ time: { $exists: true, $ne: null } }).exec();
		//	return this.recordModel.find().exec();
	}

	async findOne(id: Types.ObjectId): Promise<RecordModel | null> {
		return await this.recordModel.findById(id);
	}

	async update(_id: string): Promise<IResponseScore> {
		const endTime = new Date().getTime();
		await MongoUtils.validateId(_id, this.recordModel);
		const id = mongoose.Types.ObjectId.createFromHexString(_id);
		const record = await this.findOne(id);

		if (!record) {
			throw new BadRequestException(BAD_REQUEST);
		}
		const oldRecord = record.time;

		const startTime = record.updatedAt.getTime();
		const time = endTime - startTime;
		const isNewRecord = oldRecord === null || time < oldRecord;
		let res = record;
		if (isNewRecord) {
			res = await this.recordModel.findOneAndUpdate({ _id: id }, { time: time }, { new: true });
		}
		const { username, time: newTime, createdAt, updatedAt } = res;
		return {
			username,
			time: isNewRecord ? newTime : time,
			_id,
			createdAt: createdAt.toDateString(),
			updatedAt: updatedAt.toDateString(),
			isRecord: isNewRecord,
		};
	}
	async updateStartTime(_id: Types.ObjectId): Promise<RecordModel> {
		return await this.recordModel.findOneAndUpdate(
			{ _id },
			{ startTime: new Date() },
			{ new: true },
		);
	}
}
