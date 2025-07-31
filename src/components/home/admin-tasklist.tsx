"use client";
import { useState } from "react";
import MultipleCheckbox from "../shared/MultipleCheckbox";
import { categoryArray, statusArray } from "@/helper";
import { Button } from "../ui/button";
import { Calendar, FilePlus, LineSquiggle, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import TODialog from "../shared/TODialog";
import CreateTaskForm from "../CreateTaskForm";
import { useAllTodosQuery, useDeleteTodoMutation } from "@/redux/api/todoApi";

import { toast } from "sonner";
import Link from "next/link";
import moment from "moment";
import NoTask from "./no-task";

export default function AdminTaskList() {
	const [deleteTodo] = useDeleteTodoMutation();

	const [status, setStatus] = useState<string[]>([]);
	const [category, setCategory] = useState<string[]>([]);
	const { data: todos, isLoading } = useAllTodosQuery({
		category: category.toString(),
		status: status.toString(),
	});
	console.log(todos);

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
						toast.success("Todo Deleted successfully");
					}
				} catch (error) {
					console.log(error);
				}
			}
		});
	};
	return (
		<div className="flex items-center justify-between flex-wrap gap-5">
			<h2 className="text-2xl font-semibold">All Task List</h2>
			<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
				<MultipleCheckbox
					placeholder="Select Category"
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

			{/** todo show card */}

			<div className="mt-10 w-full">
				{todos?.result?.length === 0 && <NoTask />}
				{isLoading && <p>Loading...</p>}
				<div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-5 ">
					{todos?.result.map((todo) => (
						<div
							className="bg-card shadow-xl p-5 rounded-2xl space-y-5 ring-1 ring-primary/15"
							key={todo._id}
						>
							<div className="flex gap-x-5">
								<div>
									<div className="size-12 bg-amber-200 flex items-center justify-center rounded-full">
										<LineSquiggle />
									</div>
								</div>
								<div className="w-full">
									<div className="flex items-center justify-between ">
										<p className="text-2xl font-semibold">
											<Link
												href={`/task/${todo._id}`}
												className="hover:underline"
											>
												{todo.category}
											</Link>
										</p>
										<Trash2
											className="size-5 text-destructive cursor-pointer"
											onClick={() =>
												handleDeleteTodo(todo?._id)
											}
										/>
									</div>
									<p className="text-sm text-primary-foreground/50">
										{todo.description}
									</p>
								</div>
							</div>

							<div className="flex items-center justify-between">
								<div className="flex items-center gap-x-2">
									<Calendar />
									<p>
										{moment(todo.endDate).format(
											"dddd, MMMM D - YYYY"
										)}
									</p>
								</div>
								<span>{todo.status}</span>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
