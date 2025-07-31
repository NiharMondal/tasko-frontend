"use server";

import { cookies } from "next/headers";

export const setCookie = async (token: string) => {
	try {
		const cookieStore = await cookies();
		cookieStore.set("softvence", token, {
			httpOnly: false, // readable by JS and middleware
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			path: "/",
			maxAge: 5 * 24 * 60 * 60 * 1000, // 5 days
		});
	} catch (error) {
		console.log(error);
	}
};
export const removeCookie = async () => {
	try {
		const cookieStore = await cookies();
		cookieStore.delete("softvence");
	} catch (error) {
		console.log(error);
	}
};
