import React from "react";
import LoginForm from "./login-form";
import Image from "next/image";

export default function LoginPage() {
	return (
		<section className="grid grid-cols-1 lg:grid-cols-2 h-screen">
			<div className="h-auto">
				<Image
					src={"/assets/login.jpg"}
					width={400}
					height={500}
					alt="Login-Icon"
					className="w-full h-full object-cover object-center"
				/>
			</div>
			<LoginForm />
		</section>
	);
}
