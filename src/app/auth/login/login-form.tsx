"use client";

import TOCheckbox from "@/components/form/TOCheckbox";
import TOInput from "@/components/form/TOInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { loginSchema } from "@/form-schema";
import { useAppDispatch } from "@/hooks/redux.hook";
import { decodeToken } from "@/lib/jwt";
import { useLoginMutation } from "@/redux/api/authApi";
import { setCredentials } from "@/redux/slice/authSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

type TLoginValue = z.infer<typeof loginSchema>;

export default function LoginForm() {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const [login, { isLoading }] = useLoginMutation();
	const [showPassword, setShowPassword] = useState(false);
	const handleClickShowPassword = () => setShowPassword((show) => !show);
	const form = useForm<TLoginValue>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
			rememberMe: true,
		},
	});

	const handleLogin = async (values: TLoginValue) => {
		try {
			const data = await login(values).unwrap();

			if (data?.success) {
				toast.success("Logged in successfully");
				const user = decodeToken(data?.result?.accessToken);
				dispatch(
					setCredentials({
						user,
						token: data?.result?.accessToken,
					})
				);

				if (user?.role === "admin") {
					router.push("/admin");
				} else {
					router.push("/");
				}
			}
		} catch (error: any) {
			toast.error(error?.data?.message);
			console.log(error);
		}
	};
	return (
		<div className="flex h-screen items-center px-8 sm:px-12 md:px-20">
			<div className="space-y-5">
				<div className="text-center">
					<h1 className="text-primary-foreground font-semibold text-4xl">
						Login
					</h1>
					<p className="text-gray-500 font-medium text-sm">
						Welcome Back, Please Enter your Details to Log In.
					</p>
				</div>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleLogin)}
						className="space-y-5"
					>
						<TOInput
							form={form}
							name="email"
							label="Email"
							type="email"
						/>

						<TOInput
							form={form}
							name="password"
							label="Password"
							type={showPassword ? "text" : "password"}
							adornment={
								<div onClick={handleClickShowPassword}>
									{showPassword ? <EyeOff /> : <Eye />}
								</div>
							}
						/>

						<div className="flex justify-between items-center">
							<TOCheckbox
								form={form}
								label="Remember Me"
								name="rememberMe"
							/>

							<Link
								href={"/auth/forgot-password"}
								className="hover:underline text-primary-foreground/70 font-medium text-sm"
							>
								Forgot password?
							</Link>
						</div>

						<Button
							className="w-full bg-primary text-primary-foreground cursor-pointer"
							size={"lg"}
							disabled={isLoading}
						>
							Login
						</Button>
					</form>
				</Form>

				<div className="space-y-4">
					<div className="flex items-center gap-4 text-gray-400 px-10">
						<hr className="flex-grow border-gray-300" />
						<span className="text-sm">Or</span>
						<hr className="flex-grow border-gray-300" />
					</div>

					<p className="text-center text-primary-foreground/50 font-medium">
						Don&apos;t have an account?{" "}
						<Link
							href={"/auth/sign-up"}
							className="text-primary-foreground font-semibold"
						>
							Sign Up
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
