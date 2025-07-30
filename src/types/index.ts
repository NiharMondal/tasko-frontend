type TMeta = {
	currentPage: number;
	totalPages: number;
	totalDocs: number;
};
export type TResponse<T> = {
	success: true;
	message: string;
	meta?: TMeta;
	result: T;
};

export type TUserResponse = {
	_id: string;
	fullname: string;
	email: string;
	role: string;
	isDeleted: boolean;
};
export type TTodo = {
	_id: string;
	category: string;
	description: string;
	status: string;
	user: string;
	createdAt: string;
	updatedAt: string;
};

export type TJwtData = {
	id: string;
	email: string;
	name: string;
	role: string;
	iat: number;
	exp: number;
};

export type TRegisterRequest = {
	fullName: string;
	email: string;
	password: string;
};
export type TLoginRequest = {
	email: string;
	password: string;
	rememberMe?: boolean;
};
