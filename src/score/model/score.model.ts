import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ScoreDocument = HydratedDocument<ScoreModel>;

@Schema({ timestamps: true })
export class ScoreModel {
	@Prop()
	username: string;

	@Prop()
	startTime: Date;

	@Prop()
	endTime: Date | null;

	@Prop()
	duration: number | null;
}
export const ScoreSchema = SchemaFactory.createForClass(ScoreModel);

ScoreSchema.pre<ScoreDocument>('save', function (next) {
	if (!this.username) {
		this.username = `User_${this._id.toString().substring(10)}`;
	}
	next();
});
