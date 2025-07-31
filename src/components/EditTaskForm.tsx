"use client";
import { useForm } from "react-hook-form";
import { Form } from "./ui/form";
import TOSelect from "./form/TOSelect";
import { editTodo } from "@/form-schema";
import z from "zod";
import { categoryArray, statusArray } from "@/helper";
import TOTextarea from "./form/TOTextArea";
import { Button } from "./ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import TOInput from "./form/TOInput";
import { useSingleTodoQuery, useUpdateTodoMutation } from "@/redux/api/todoApi";
import { useEffect } from "react";
import { toast } from "sonner";
import Swal from "sweetalert2";

type TodoSchema = z.infer<typeof editTodo>;

export default function EditTaskForm({ slug }: { slug: string }) {
	const { data: todoDetails } = useSingleTodoQuery(slug);

	const [updateTodo, { isLoading }] = useUpdateTodoMutation();

	const form = useForm<TodoSchema>({
		resolver: zodResolver(editTodo),
		defaultValues: {
			description: todoDetails?.result?.description || "",
			status: todoDetails?.result?.status || "",
			category: todoDetails?.result?.category || "",
			endDate: todoDetails?.result?.endDate || "",
		},
	});

	useEffect(() => {
		form.reset({
			description: todoDetails?.result?.description,
			status: todoDetails?.result?.status,
			category: todoDetails?.result?.category,
			endDate: todoDetails?.result?.endDate,
		});
	}, [todoDetails?.result, form]);
	const handleUpdateTodo = async (values: TodoSchema) => {
		try {
			const res = await updateTodo({
				id: slug,
				payload: values,
			}).unwrap();
			if (res.success) {
				toast.success("Updated successfully");
				if (res.result?.status === "done") {
					Swal.fire({ imageUrl: "/assets/successfull.png" });
				}
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<Form {...form}>
			<form
				className="w-full space-y-5 "
				onSubmit={form.handleSubmit(handleUpdateTodo)}
			>
				<TOSelect
					form={form}
					name="category"
					label="Select Category"
					options={categoryArray}
				/>
				<TOSelect
					form={form}
					name="status"
					label="Select Status"
					options={statusArray}
				/>
				<TOInput
					form={form}
					label="End Date"
					name="endDate"
					type="date"
				/>
				<TOTextarea
					form={form}
					name="description"
					label="Description"
					rows={5}
				/>

				<Button type="submit" disabled={isLoading}>
					{isLoading ? "Updating" : "Edit Task"}
				</Button>
			</form>
		</Form>
	);
}
