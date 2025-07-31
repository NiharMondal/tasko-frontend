import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import React from "react";
type TaskDropdownProps = {
	value: string | null;
	setValue: React.Dispatch<React.SetStateAction<string | null>>;
	options: string[];
};
export default function TaskDropdown({
	value,
	setValue,
	options,
}: TaskDropdownProps) {
	return (
		<Select value={value as string} onValueChange={setValue}>
			<SelectTrigger className="w-[180px]">
				<SelectValue placeholder="Select Task Category" />
			</SelectTrigger>
			<SelectContent>
				{options.map((option) => (
					<SelectItem value={option} key={option}>
						{option}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
