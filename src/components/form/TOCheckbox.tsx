import React from "react";
import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
	FormDescription,
} from "../ui/form";
import { Checkbox } from "../ui/checkbox";
import { UseFormReturn, FieldValues, Path } from "react-hook-form";

type TOCheckboxProps<T extends FieldValues> = {
	form: UseFormReturn<T>;
	name: Path<T>;
	label: string;
	description?: string;
	disabled?: boolean;
};

export default function TOCheckbox<T extends FieldValues>({
	form,
	name,
	label,
	description,
	disabled,
}: TOCheckboxProps<T>) {
	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => (
				<FormItem className="flex flex-row items-start space-x-3 space-y-0">
					<FormControl>
						<Checkbox
							checked={field.value}
							onCheckedChange={(checked) =>
								field.onChange(checked)
							}
							disabled={disabled}
						/>
					</FormControl>
					<div className="space-y-1 leading-none">
						<FormLabel className="text-primary-foreground font-medium">
							{label}
						</FormLabel>
						{description ? (
							<FormDescription className="text-gray-shade-35">
								{description}
							</FormDescription>
						) : null}
						<FormMessage className="text-red-500" />
					</div>
				</FormItem>
			)}
		/>
	);
}
