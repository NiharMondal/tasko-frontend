import Navbar from "@/components/Navbar";
import React from "react";

export default function Task() {
	return (
		<div className="">
			<div className="custom_bg pb-16 relative">
				<Navbar />
			</div>
			<div className="px-5 sm:px-10 md:px-20  absolute top-20 w-full">
				<div className="bg-white p-5 sm:p-8 md:p-12 rounded-md shadow-xl">
					hello
				</div>
			</div>
		</div>
	);
}
