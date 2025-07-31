import { NextResponse, NextRequest } from "next/server";
import { decodeToken } from "./lib/jwt";

const protectedRoutes = ["/admin", "/dashboard"];

export function middleware(req: NextRequest) {
	const pathName = req.nextUrl.pathname;
	const token = req.cookies.get("softvence")?.value;

	// If route is protected and no token
	if (protectedRoutes.some((route) => pathName.startsWith(route)) && !token) {
		return NextResponse.redirect(new URL("/auth/login", req.url));
	}

	// If token exists, validate it
	if (token) {
		const decoded = decodeToken(token);
		if (!decoded) {
			return NextResponse.redirect(new URL("/auth/login", req.url));
		}

		const { role } = decoded;

		if (pathName.startsWith("/dashboard") && role !== "user") {
			return NextResponse.redirect(new URL("/auth/login", req.url));
		}
		if (pathName.startsWith("/admin") && role !== "admin") {
			return NextResponse.redirect(new URL("/auth/login", req.url));
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/dashboard/:path*", "/admin/:path*"],
};
