import Image from "next/image";
import React from "react";

export default function NoTask() {
	return (
		<div className="flex items-center flex-col justify-center h-80">
			<Image
				src={"/assets/empty.svg"}
				width={300}
				height={300}
				alt="empty box"
			/>
			<p>No task is available yet. Please add your new Task</p>
		</div>
	);
}
