"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hook";
import { cn } from "@/lib/utils";
import { logout, selectedUser } from "@/redux/slice/authSlice";
import { FileSpreadsheet, Loader, Timer } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { removeCookie } from "@/actions/auth";
export default function Navbar() {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const path = usePathname();
	const user = useAppSelector(selectedUser);

	const handleLogout = async () => {
		dispatch(logout());
		await removeCookie();
		router.push("/");
	};
	return (
		<header className="h-20">
			<nav className="px-5 sm:px-10 md:px-20 flex items-center justify-between h-full text-white">
				<Link href={"/"} className="flex items-center gap-x-2">
					<Timer />
					<span>Tasko</span>
				</Link>

				<ul className="flex items-center gap-x-5">
					<li>
						{user?.role === "admin" ? (
							<Link
								href={"/admin"}
								className={cn(
									"flex items-center gap-x-1",
									path === "/admin" ? "text-primary" : ""
								)}
							>
								<FileSpreadsheet className="size-4" />
								Task
							</Link>
						) : (
							<Link
								href={"/dashboard"}
								className={cn(
									"flex items-center gap-x-1",
									path === "/dashboard" ? "text-primary" : ""
								)}
							>
								<FileSpreadsheet className="size-4" />
								Task
							</Link>
						)}
					</li>
					<li>
						<Link
							href={"/spin"}
							className={cn(
								"flex items-center gap-x-1",
								path === "/spin" ? "text-primary" : ""
							)}
						>
							<Loader className="size-4" />
							Spin
						</Link>
					</li>
				</ul>
				<div>
					{user?.id ? (
						<Popover>
							<PopoverTrigger className="cursor-pointer flex items-center gap-x-1.5">
								<Avatar>
									<AvatarImage
										src={"https://github.com/shadcn.png"}
									/>
									<AvatarFallback>
										{user?.name.substring(0, 6)}
									</AvatarFallback>
								</Avatar>
								{user?.name.substring(0, 6)}
							</PopoverTrigger>
							<PopoverContent>
								<ul className="space-y-3 *:hover:underline">
									<li>
										<Link href={"/"}> Home</Link>
									</li>
									<li>
										<Link href={"/dashboard"}>
											Dashboard
										</Link>
									</li>
									<li>
										<Button
											variant={"destructive"}
											onClick={handleLogout}
										>
											Logout
										</Button>
									</li>
								</ul>
							</PopoverContent>
						</Popover>
					) : (
						<Link href={"/auth/login"}>
							<Button>Login</Button>
						</Link>
					)}
				</div>
			</nav>
		</header>
	);
}
