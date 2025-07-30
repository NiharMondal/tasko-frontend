import { TJwtData } from "@/types";
import { jwtDecode } from "jwt-decode";

export const decodeToken = (token: string): TJwtData => {
	const decoded = jwtDecode(token) as TJwtData;

	return decoded;
};
