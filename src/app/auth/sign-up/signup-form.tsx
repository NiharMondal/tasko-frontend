"use client";

import TOCheckbox from "@/components/form/TOCheckbox";
import TOInput from "@/components/form/TOInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { signUpSchema } from "@/form-schema";
import { useSignUpMutation } from "@/redux/api/authApi";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

type TRegisterValue = z.infer<typeof signUpSchema>;

export default function SignupForm() {
	const router = useRouter();
	const [signUp, { isLoading }] = useSignUpMutation();
	const [showPassword, setShowPassword] = useState(false);
	const handleClickShowPassword = () => setShowPassword((show) => !show);
	const form = useForm<TRegisterValue>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			fullName: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	const handleLogin = async (values: TRegisterValue) => {
		const data = {
			fullName: values.fullName,
			email: values?.email,
			password: values.password,
		};
		try {
			const res = await signUp(data).unwrap();
			if (res.success) {
				toast.success("Signed up successfully");
				router.push("/auth/login");
			}
		} catch (error: any) {
			toast.error(error?.data?.message);
		}
	};
	return (
		<div className="flex h-screen items-center px-8 sm:px-12 md:px-20">
			<div className="space-y-5">
				<div className="text-center">
					<h1 className="text-primary-foreground font-semibold text-4xl">
						Sign Up
					</h1>
					<p className="text-gray-500 font-medium text-sm">
						To Create Account, Please Fill in the From Below.
					</p>
				</div>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleLogin)}
						className="space-y-5"
					>
						<TOInput
							form={form}
							name="fullName"
							label="Full Name"
							type="text"
						/>
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
						<TOInput
							form={form}
							name="confirmPassword"
							label="Password"
							type={showPassword ? "text" : "password"}
							adornment={
								<div onClick={handleClickShowPassword}>
									{showPassword ? <EyeOff /> : <Eye />}
								</div>
							}
						/>

						<Button
							className="w-full bg-primary text-primary-foreground"
							size={"lg"}
						>
							Sign Up
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
						Already have an account?{" "}
						<Link
							href={"/auth/login"}
							className="text-primary-foreground font-semibold"
						>
							Login
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
