import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type RecordDocument = HydratedDocument<RecordModel>;

@Schema({ timestamps: true, _id: true })
export class RecordModel {
	@Prop({
		type: Types.ObjectId,
		default: () => new Types.ObjectId(),
	})
	_id?: Types.ObjectId;
	createdAt?: Date;
	updatedAt?: Date;

	@Prop({ unique: true })
	username: string;

	@Prop()
	endTime: Date | null;

	@Prop()
	duration: number | null;
}
export const RecordSchema = SchemaFactory.createForClass(RecordModel);

RecordSchema.pre<RecordDocument>('save', function (next) {
	if (!this.username) {
		this.username = `User_${this._id?.toString()?.substring(10) || Date.now()}`;
	}
	next();
});
