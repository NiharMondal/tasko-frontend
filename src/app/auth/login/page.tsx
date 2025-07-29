import React from "react";
import LoginForm from "./login-form";

export default function LoginPage() {
	return (
		<section className="grid grid-cols-1 lg:grid-cols-2 h-screen">
			<div></div>
			<LoginForm />
		</section>
	);
}
