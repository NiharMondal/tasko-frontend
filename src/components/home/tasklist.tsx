"use client";
import { useState } from "react";
import MultipleCheckbox from "../shared/MultipleCheckbox";
import { categoryArray, statusArray } from "@/helper";
import { Button } from "../ui/button";
import { Calendar, Delete, FilePlus, LineSquiggle, Trash2 } from "lucide-react";
import Image from "next/image";
import TODialog from "../shared/TODialog";
import CreateTaskForm from "../CreateTaskForm";

export default function TaskList() {
	const [status, setStatus] = useState<string[]>([]);
	const [category, setCategory] = useState<string[]>([]);

	return (
		<div className="px-5 sm:px-10 md:px-20 ">
			<div className="bg-white p-5 sm:p-8 md:p-12 rounded-md shadow-xl">
				<div className="flex items-center justify-between flex-wrap">
					<h2 className="text-2xl font-semibold">All Task List</h2>
					<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
						<MultipleCheckbox
							placeholder="Select Task Category"
							selected={category}
							setSelected={setCategory}
							items={categoryArray}
						/>
						<MultipleCheckbox
							placeholder="Select Status"
							selected={status}
							setSelected={setStatus}
							items={statusArray}
						/>

						<TODialog
							title="Create new task"
							dialogTrigger={
								<Button>
									<FilePlus />
									Create Task
								</Button>
							}
						>
							<CreateTaskForm />
						</TODialog>
					</div>

					{/** task show card */}

					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-10">
						<div className="bg-card shadow-xl p-5 rounded space-y-5 relative">
							<div className="flex gap-x-5">
								<div>
									<div className="size-12 bg-amber-200 flex items-center justify-center rounded-full">
										<LineSquiggle />
									</div>
								</div>
								<div>
									<div className="flex items-center justify-between">
										<p className="text-2xl font-semibold">
											Art & Craft
										</p>
										<Trash2 className="size-5 text-destructive" />
									</div>
									<p className="text-sm text-primary-foreground/50">
										Lorem ipsum dolor sit amet consectetur
										adipisicing elit.
									</p>
								</div>
							</div>

							<div className="flex items-center justify-between">
								<div className="flex items-center gap-x-2">
									<Calendar />
									<p>Friday, April 19 - 2025</p>
								</div>
								<span>In Progress</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
