export interface Student {
	id: string;
	name: string;
	email: string;
	identifier?: string;
	cgpa?: number;
}

export interface Consultant {
	id: string;
	name: string;
	email: string;
	department?: string;
}

export interface Message {
	timestamp: string;
	id: string;
	content: string;
	roomid: string;
}

export interface Chat {
	roomid: string;
	consultant_id?: string;
	student_id?: string;
	created_at: string;
	messages: Message[];
}

export interface Request {
	id: string;
	student_id?: string;
	consultant_id?: string;
	subject?: string;
	details?: string;
	status: string;
	created_at: string;
}

export interface Query {
	id: string;
	query: string;
	title?: string;
	created_at: string;
	name: string;
	identifier: string;
	tags?: string[];
}

export interface Answer {
	id: number;
	query_id?: string;
	name: string;
	answer: string;
	timestamp: string;
	identifier?: string;
}
