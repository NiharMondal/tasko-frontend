import React from "react";

import Image from "next/image";
import SignupForm from "./signup-form";

export default function SignupPage() {
	return (
		<section className="grid grid-cols-1 lg:grid-cols-2 h-screen">
			<div className="h-auto p-20 md:p-32 bg-radial-[at_50%_50%] from-[#040612] to-[#5b8d78] to-100%">
				<Image
					src={"/assets/sign-up.png"}
					width={400}
					height={500}
					alt="Signup-Icon"
					className="object-cover object-center md:scale-90"
				/>
			</div>
			<SignupForm />
		</section>
	);
}
