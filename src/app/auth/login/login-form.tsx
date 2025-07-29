"use client";

import TOInput from "@/components/form/TOInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { loginSchema } from "@/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

type TLoginValue = z.infer<typeof loginSchema>;

export default function LoginForm() {
	const [showPassword, setShowPassword] = useState(false);
	const handleClickShowPassword = () => setShowPassword((show) => !show);
	const form = useForm<TLoginValue>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const handleLogin = async (values: TLoginValue) => {
		console.log(values);
	};
	return (
		<div className="flex h-screen items-center p-5">
			<div className="space-y-5">
				<div className="text-center">
					<h1 className="text-primary-foreground font-semibold text-4xl">
						Login
					</h1>
					<p className="text-gray-500 font-medium text-sm">
						WelcomeBack,Please Enter your Details to Log In.
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
						<Button className="w-full bg-primary text-primary-foreground">
							Login
						</Button>
					</form>
				</Form>
			</div>
		</div>
	);
}
