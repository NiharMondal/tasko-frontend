import Navbar from "@/components/Navbar";
import WelcomeInfo from "@/components/WelcomeInfo";
import React, { ReactNode } from "react";

export default function HomeLayout({ children }: { children: ReactNode }) {
	return (
		<section className="relative">
			<div className="custom_bg ">
				<Navbar />
				<WelcomeInfo />
			</div>
			<div className="absolute top-20 w-full px-5 sm:px-10 md:px-20 ">
				<div className="bg-white p-5 sm:p-8 md:p-12 rounded-md shadow-xl">
					{children}
				</div>
			</div>
		</section>
	);
}
