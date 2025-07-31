import { assets } from "@/assets";
import { Button } from "@/components/ui/button";
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
				className="mb-5"
			/>
			<Link href="/">
				<Button className="w-[300px]">Return To Home</Button>
			</Link>
		</div>
	);
}
