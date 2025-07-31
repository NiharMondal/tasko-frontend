"use client";
import EditTaskForm from "@/components/EditTaskForm";
import TODialog from "@/components/shared/TODialog";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useDeleteTodoMutation } from "@/redux/api/todoApi";
import { TTodo } from "@/types";
import { Calendar, LineSquiggle, PenLine } from "lucide-react";
import moment from "moment";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import Swal from "sweetalert2";
export default function Description({ task }: { task: TTodo }) {
	const router = useRouter();
	const [deleteTodo, { isLoading: deleteLoading }] = useDeleteTodoMutation();

	const handleDeleteTodo = async (id: string) => {
		Swal.fire({
			imageUrl: "/assets/delete.png",
			title: "Are you sure?",
			showCancelButton: true,
			confirmButtonColor: "#60E5AE",
			cancelButtonColor: "#FF4C2426",
			confirmButtonText: "Yes",
		}).then(async (result) => {
			if (result.isConfirmed) {
				try {
					const res = await deleteTodo(id).unwrap();
					if (res.success) {
						router.back();
						toast.success("Task Deleted successfully");
					}
				} catch (error) {
					console.log(error);
				}
			}
		});
	};
	return (
		<div>
			<div className="flex items-center justify-between border-b pb-5">
				<h2 className="text-2xl font-semibold">Task Details</h2>
				<div className="flex items-center gap-x-2">
					<TODialog
						title="Edit task"
						dialogTrigger={
							<Button
								className="bg-[#FFAB001A] text-[#FFAB00]"
								variant={"ghost"}
							>
								<PenLine />
								Edit Task
							</Button>
						}
					>
						<EditTaskForm slug={task?._id} />
					</TODialog>

					<Button onClick={() => router.back()}>Back</Button>
				</div>
			</div>

			<div className="flex gap-x-5 py-5">
				<div>
					<div className="size-20 bg-amber-200 flex items-center justify-center rounded-full">
						<LineSquiggle className="size-12" />
					</div>
				</div>

				<div className="w-full">
					<h3 className="text-3xl font-semibold">{task?.category}</h3>
					<p className="text-primary-foreground/70">
						{task?.description}
					</p>

					<div className="mt-5 flex items-center gap-x-5 divide-x space-y-5">
						<div className="pr-5">
							<p className="text-lg font-semibold pb-1">
								End Date
							</p>
							<div className="flex items-center text-primary-foreground/70">
								<Calendar className="mr-2" />
								<p>
									{moment(task?.endDate).format(
										"dddd, MMMM D - YYYY"
									)}
								</p>
							</div>
						</div>

						<div className="flex items-center gap-x-2">
							<div
								className={cn(
									"size-2 rounded-full",
									task.status === "pending"
										? "bg-yellow-400"
										: task.status === "ongoing"
										? "bg-sky-400"
										: task.status === "collaborative"
										? "bg-blue-400"
										: "bg-green-400"
								)}
							></div>
							<p>{task.status}</p>
						</div>
					</div>
					<div>
						<Select>
							<SelectTrigger className="w-[180px]" disabled>
								<SelectValue placeholder={task.status} />
							</SelectTrigger>
						</Select>
					</div>
					<div className="flex items-center justify-end mt-20 ">
						<Button
							disabled={deleteLoading}
							onClick={() => handleDeleteTodo(task?._id)}
							className="bg-[#FF4C2426] text-[#FF4C24]"
							variant={"ghost"}
						>
							{deleteLoading ? "Deleting" : "Delete Task"}
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
