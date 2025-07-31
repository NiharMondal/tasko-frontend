import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
	return (
		<div className="min-h-screen w-full relative">
			<div
				className="absolute inset-0 -z-20"
				style={{
					background:
						"radial-gradient(125% 125% at 50% 90%, #fff 40%, #60e5aed4 100%)",
				}}
			/>
			<div className="h-screen flex flex-col items-center justify-center">
				<h1 className="text-black text-8xl font-semibold">
					Ta<span className="text-primary font-bold text-9xl">S</span>
					ko
				</h1>
				<p className="max-w-xs mx-auto text-center">
					This is an assignment given by{" "}
					<span className="text-xl font-bold tracking-wider text-primary">
						Softvence
					</span>
					.{" "}
				</p>

				<div className="border rounded-2xl bg-card text-primary-foreground/70 p-10 mt-3">
					<p>Usage:</p>
					<ul className="mt-2 list-disc">
						<li>
							You can not create task if you are not logged in
						</li>
						<li>
							You can not visit admin page if you are not an admin
						</li>
						<li>
							When you logged in you will go to dashboard page and
							only see your created task list.
						</li>
						<li>Admin can see every task and modify them</li>
					</ul>
				</div>
				<div className="flex gap-x-5 items-center justify-center mt-5">
					<Link href={"/dashboard"}>
						<Button>Dashboard</Button>
					</Link>
					<Link href={"/auth/login"}>
						<Button>Login</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}
