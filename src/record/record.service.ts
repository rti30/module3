import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateRecordDto } from './dto/create-record.dto';
import { RECORD_COLLECTION_NAME, BAD_REQUEST } from './record.constants';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import { RecordDocument, RecordModel } from './model/record.model';
import { MongoUtils } from 'src/common/utils/mongo.utils';

@Injectable()
export class RecordService {
	constructor(
		@InjectModel(RECORD_COLLECTION_NAME) private readonly recordModel: Model<RecordDocument>,
	) {}

	async create(createRecordDto: CreateRecordDto): Promise<RecordModel> {
		const { id } = createRecordDto; // хотя id опциональный, почему-то определяется как string
		const newUserDto: RecordModel = {
			username: null,
			endTime: null,
			duration: null,
		};
		switch (true) {
			case !!id: {
				await MongoUtils.validateId(id, this.recordModel);
				const _id = mongoose.Types.ObjectId.createFromHexString(id);
				return await this.updateStartTime(_id);
			}
			default:
				return await this.recordModel.create(newUserDto);
		}
	}

	async findAll(): Promise<RecordModel[]> {
		return await this.recordModel.find({ duration: { $exists: true, $ne: null } }).exec();
		//return this.recordModel.find().exec();
	}

	async findOne(id: Types.ObjectId): Promise<RecordModel | null> {
		return await this.recordModel.findById(id);
	}

	async update(_id: string): Promise<RecordModel> {
		const endTime = new Date().getTime();
		await MongoUtils.validateId(_id, this.recordModel);
		const id = mongoose.Types.ObjectId.createFromHexString(_id);
		const record = await this.findOne(id);

		if (!record) {
			throw new BadRequestException(BAD_REQUEST);
		}
		const startTime = record.updatedAt.getTime();
		const duration = endTime - startTime;
		return await this.recordModel.findOneAndUpdate(
			{ _id: id },
			{ endTime, duration },
			{ new: true },
		);
	}
	async updateStartTime(_id: Types.ObjectId): Promise<RecordModel> {
		return await this.recordModel.findOneAndUpdate(
			{ _id },
			{ startTime: new Date() },
			{ new: true },
		);
	}
}
