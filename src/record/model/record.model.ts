import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RecordDocument = HydratedDocument<RecordModel>;

@Schema({ timestamps: true })
export class RecordModel {
	@Prop()
	username: string;

	@Prop()
	startTime: Date;

	@Prop()
	endTime: Date | null;

	@Prop()
	duration: number | null;
}
export const RecordSchema = SchemaFactory.createForClass(RecordModel);

RecordSchema.pre<RecordDocument>('save', function (next) {
	if (!this.username) {
		this.username = `User_${this._id.toString().substring(10)}`;
	}
	next();
});
