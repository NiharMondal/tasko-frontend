import React from "react";
import { Checkbox } from "../ui/checkbox";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";

import { Button } from "../ui/button";
import { ChevronsUpDown } from "lucide-react";
type TItems = {
	label: string;
	value: string;
};

type MultipleCheckboxProps = {
	placeholder: string;
	selected: string[];
	items: TItems[];
	setSelected: React.Dispatch<React.SetStateAction<string[]>>;
};
export default function MultipleCheckbox({
	placeholder,
	selected,
	setSelected,
	items,
}: MultipleCheckboxProps) {
	const [open, setOpen] = React.useState(false);
	const toggleSelection = (value: string) => {
		setSelected((prev) =>
			prev.includes(value)
				? prev.filter((v) => v !== value)
				: [...prev, value]
		);
	};
	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button aria-expanded={open}>
					{placeholder}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-52">
				<div className="space-y-2">
					{items.map((item) => (
						<div
							key={item.value}
							className="flex items-center space-x-2"
						>
							<Checkbox
								id={item.value}
								checked={selected.includes(item.value)}
								onCheckedChange={() =>
									toggleSelection(item.value)
								}
							/>
							<label
								htmlFor={item.value}
								className="text-lg text-primary-foreground/70"
							>
								{item.label}
							</label>
						</div>
					))}
				</div>
			</PopoverContent>
		</Popover>
	);
}
