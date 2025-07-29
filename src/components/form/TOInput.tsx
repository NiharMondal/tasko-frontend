import React from "react";
import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
	FormDescription,
} from "../ui/form";
import { Input } from "../ui/input";
import { UseFormReturn, FieldValues, Path } from "react-hook-form";

type TOInputProps<T extends FieldValues> = {
	form: UseFormReturn<T>;
	name: Path<T>;
	label: string;
	placeholder?: string;
	type?: string;
	description?: string;
	disabled?: boolean;
	adornment?: React.ReactNode;
};

export default function TOInput<T extends FieldValues>({
	form,
	name,
	label,
	placeholder,
	description,
	type = "text",
	disabled,
	adornment,
}: TOInputProps<T>) {
	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<FormControl>
						<div className="relative">
							<Input
								size={1000}
								type={type}
								placeholder={placeholder}
								disabled={disabled}
								className="w-full"
								{...field}
							/>
							{adornment ? (
								<div className=" absolute top-1/2 right-3.5 -translate-y-1/2">
									{adornment}
								</div>
							) : null}
						</div>
					</FormControl>
					{description ? (
						<FormDescription className="text-gray-shade-35">
							{description}
						</FormDescription>
					) : null}
					<FormMessage className="text-red-500" />
				</FormItem>
			)}
		/>
	);
}
