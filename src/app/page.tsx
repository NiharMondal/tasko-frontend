import Navbar from "@/components/Navbar";
import HomeLayout from "./(root)/layout";
import WelcomeInfo from "@/components/WelcomeInfo";
import TaskList from "@/components/home/tasklist";

export default function Home() {
	return (
		<HomeLayout>
			<div className="custom_bg ">
				<Navbar />
				<WelcomeInfo />
			</div>
			<TaskList />
		</HomeLayout>
	);
}
