export interface IRecordRequestStart {
	username: string;
	time: null | number;
	_id: string;
	createdAt: string;
	updatedAt: string;
}
type OmittedResponseEnd = Omit<IRecordRequestStart, 'time'>;

export interface IResponseScore extends OmittedResponseEnd {
	time: number;
	isRecord: boolean;
}
