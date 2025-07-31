"use client";
import TaskDropdown from "@/components/TaskDropdown";
import { Button } from "@/components/ui/button";
import Wheel from "@/components/Wheel";
import { labels } from "@/helper";
import React, { useState } from "react";

export default function SpinPage() {
	const [spinning, setSpinning] = useState(false);
	const [selectedTask, setSelectedTask] = useState<string | null>(null);

	const handleSpin = () => {
		if (spinning) return; // prevent double click
		setSelectedTask(null);
		setSpinning(true);
	};

	const handleFinish = (result: string) => {
		setSpinning(false);
		setSelectedTask(result);
	};
	return (
		<div className="w-full">
			<div className="flex items-center justify-between ">
				<h2 className="text-2xl font-semibold">Spin Wheel</h2>
				<div className="space-y-1">
					<p className="font-medium">Select Task Category</p>
					<TaskDropdown
						value={selectedTask}
						setValue={setSelectedTask}
						options={labels}
					/>
				</div>
			</div>

			<div className="flex-1 flex flex-col items-center space-y-5">
				<Wheel onFinish={handleFinish} spinning={spinning} />
				<p className="font-medium">Spin Wheel to pick your task</p>
				<Button onClick={handleSpin}>Spin</Button>
			</div>
		</div>
	);
}
