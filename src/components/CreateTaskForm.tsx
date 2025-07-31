"use client";
import { useForm } from "react-hook-form";
import { Form } from "./ui/form";
import TOSelect from "./form/TOSelect";
import { createTodoSchema } from "@/form-schema";
import z from "zod";
import { categoryArray, statusArray } from "@/helper";
import TOTextarea from "./form/TOTextArea";
import { Button } from "./ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import TOInput from "./form/TOInput";
import { useCreateTodoMutation } from "@/redux/api/todoApi";
import { toast } from "sonner";

type TodoSchema = z.infer<typeof createTodoSchema>;

export default function CreateTaskForm() {
	const [createTodo] = useCreateTodoMutation();
	const form = useForm<TodoSchema>({
		resolver: zodResolver(createTodoSchema),
		defaultValues: {
			description: "",
			status: "pending",
			category: "",
			endDate: "",
		},
	});

	const handleCreateTask = async (values: TodoSchema) => {
		try {
			const res = await createTodo(values).unwrap();
			if (res?.success) {
				toast.success("Task created successfully");
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<Form {...form}>
			<form
				className="w-full space-y-5 "
				onSubmit={form.handleSubmit(handleCreateTask)}
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

				<Button type="submit">Create Task</Button>
			</form>
		</Form>
	);
}
