import mongoose, { Model } from 'mongoose';
import { BadRequestException, NotFoundException } from '@nestjs/common';

export class MongoUtils {
	static async validateId(id: string, model: Model<any>): Promise<true> {
		if (!mongoose.Types.ObjectId.isValid(id)) {
			throw new BadRequestException('Неверный ID');
		}
		const exists = await model.exists({ _id: new mongoose.Types.ObjectId(id) });
		if (!exists) {
			throw new NotFoundException('Record не найден');
		}
		return true;
	}
}
