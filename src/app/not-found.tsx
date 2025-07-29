import { assets } from "@/assets";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
	return (
		<div className="flex items-center h-screen justify-center flex-col">
			<Image
				src="/assets/not-found.svg"
				width={500}
				height={500}
				alt="NotFound Icon"
			/>
			<Link href="/">Return Home</Link>
		</div>
	);
}
