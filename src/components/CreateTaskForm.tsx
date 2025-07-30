"use client";
import { useForm } from "react-hook-form";
import { Form } from "./ui/form";
import TOSelect from "./form/TOSelect";
import { createTodo } from "@/form-schema";
import z from "zod";
import { categoryArray, statusArrayForCreating } from "@/helper";
import TOTextarea from "./form/TOTextArea";
import { Button } from "./ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import TOInput from "./form/TOInput";

type TodoSchema = z.infer<typeof createTodo>;

export default function CreateTaskForm() {
	const form = useForm<TodoSchema>({
		resolver: zodResolver(createTodo),
		defaultValues: {
			description: "",
			status: "pending",
			category: "",
			endDate: "",
		},
	});

	const handleCreateTask = async (values: TodoSchema) => {
		console.log(values);
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
					options={statusArrayForCreating}
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
